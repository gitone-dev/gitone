import * as grpc from "@grpc/grpc-js";
import { loadSync, ServiceDefinition } from "@grpc/proto-loader";
import { PingRequest } from "../generated/ping/PingRequest";
import { PingResponse } from "../generated/ping/PingResponse";

const loadedProto = loadSync("ping.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  includeDirs: [`${__dirname}/../proto`],
});

export const service = loadedProto["ping.Ping"] as ServiceDefinition;

export class PingImplementation {
  name() {
    return "ping";
  }

  addToServer(server: grpc.Server) {
    server.addService(service, {
      Ping: (
        call: grpc.ServerUnaryCall<PingRequest, PingResponse>,
        callback: grpc.sendUnaryData<PingResponse>,
      ) => {
        callback(null, { message: call.request.name });
      },
    });
  }
}
