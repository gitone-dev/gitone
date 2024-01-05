import * as grpc from "@grpc/grpc-js";
import { loadSync, ServiceDefinition } from "@grpc/proto-loader";
import { ModelOperations } from "@vscode/vscode-languagedetection";
import { Highlighter } from "shiki";
import { BlobRequest } from "../generated/highlight/BlobRequest";
import { BlobResponse } from "../generated/highlight/BlobResponse";
import { DiffLine } from "../generated/highlight/DiffLine";
import { DiffRequest } from "../generated/highlight/DiffRequest";
import { DiffResponse } from "../generated/highlight/DiffResponse";
import { Highlight } from "../Highlight";
import { DiffFile } from "../split-diffs/DiffFile";

const loadedProto = loadSync("highlight.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [`${__dirname}/../proto`],
});

export const service = loadedProto["highlight.Highlight"] as ServiceDefinition;

export class HighlightImplementation {
  private highlighter: Highlighter;
  private modulOperations: ModelOperations;

  constructor(highlighter: Highlighter) {
    this.highlighter = highlighter;
    this.modulOperations = new ModelOperations();
  }

  name(): string {
    return "highlight";
  }

  addToServer(server: grpc.Server) {
    server.addService(service, {
      blob: async (
        call: grpc.ServerUnaryCall<BlobRequest, BlobResponse>,
        callback: grpc.sendUnaryData<BlobResponse>,
      ) => {
        const { text, name } = call.request;
        const highlight = new Highlight(
          this.modulOperations,
          this.highlighter,
          name || "",
          text || "",
        );
        const result = await highlight.htmlLines();
        callback(null, { blobLines: result });
      },
      blobs: (call: grpc.ServerDuplexStream<BlobRequest, BlobResponse>) => {
        let index = 1;

        call.on("data", async (data: BlobRequest) => {
          const { name, text } = data;
          const highlight = new Highlight(
            this.modulOperations,
            this.highlighter,
            name || "",
            text || "",
          );
          const result = await highlight.htmlLines();
          call.write({ blobLines: result });
          index -= 1;

          if (index === 0) call.end();
        });

        call.on("end", async () => {
          index -= 1;
          if (index === 0) call.end();
        });
      },
      diff: async (
        call: grpc.ServerUnaryCall<DiffRequest, DiffResponse>,
        callback: grpc.sendUnaryData<DiffResponse>,
      ) => {
        let { oldPath, oldText, newPath, newText, lines } = call.request;

        const diffFile = new DiffFile(
          this.modulOperations,
          this.highlighter,
          oldPath,
          oldText,
          newPath,
          newText,
          { colorWords: true, ignoreCase: false, ignoreWhitespace: false },
          lines || [],
        );

        const diffLines = await diffFile.highlight();
        const result: DiffLine[] = [];
        for (const diffLine of diffLines) {
          result.push(diffLine.to());
        }

        callback(null, { lines: result });
      },
    });
  }
}
