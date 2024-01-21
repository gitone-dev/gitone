import * as grpc from "@grpc/grpc-js";
import dotdev from "dotenv";
import { HealthImplementation, ServingStatusMap } from "grpc-health-check";
import { getHighlighter } from "shiki";
import { HighlightImplementation } from "./services/highlightService";
import { MarkupImplementation } from "./services/markupService";
import { PingImplementation } from "./services/pingService";

dotdev.config();
const HOST = process.env["HOST"] || "0.0.0.0";
const PORT = Number(process.env["PORT"]) || 50051;
const address = `${HOST}:${PORT}`;

async function main() {
  const highlighter = await getHighlighter({ theme: "light-plus" });

  const server = new grpc.Server();
  const pingImpl = new PingImplementation();
  const highlightImpl = new HighlightImplementation(highlighter);
  const markupImpl = new MarkupImplementation();

  const statusMap: ServingStatusMap = {
    [highlightImpl.name()]: "SERVING",
    [pingImpl.name()]: "NOT_SERVING",
    [markupImpl.name()]: "NOT_SERVING",
  };
  const healthImpl = new HealthImplementation(statusMap);

  pingImpl.addToServer(server);
  highlightImpl.addToServer(server);
  markupImpl.addToServer(server);
  healthImpl.addToServer(server);
  server.bindAsync(
    address,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      console.log("server is running on", port);
      server.start();
    },
  );
}

main();
