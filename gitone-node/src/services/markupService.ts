import * as grpc from "@grpc/grpc-js";
import { loadSync, ServiceDefinition } from "@grpc/proto-loader";
import * as commonmark from "commonmark";
import { MarkupRequest } from "../generated/markup/MarkupRequest";
import { MarkupResponse } from "../generated/markup/MarkupResponse";

const loadedProto = loadSync("markup.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [`${__dirname}/../proto`],
});

export const service = loadedProto["markup.Markup"] as ServiceDefinition;

export class MarkupImplementation {
  private reader;
  private writer;

  constructor() {
    this.reader = new commonmark.Parser();
    this.writer = new commonmark.HtmlRenderer();
  }

  name() {
    return "markup";
  }

  addToServer(server: grpc.Server) {
    server.addService(service, {
      markup: (
        call: grpc.ServerUnaryCall<MarkupRequest, MarkupResponse>,
        callback: grpc.sendUnaryData<MarkupResponse>,
      ) => {
        let parsed = this.reader.parse(call.request.text || "");
        let result = this.writer.render(parsed);
        callback(null, { html: result });
      },
    });
  }
}
