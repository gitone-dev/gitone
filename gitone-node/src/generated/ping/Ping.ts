// Original file: src/proto/ping.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { PingRequest as _ping_PingRequest, PingRequest__Output as _ping_PingRequest__Output } from '../ping/PingRequest';
import type { PingResponse as _ping_PingResponse, PingResponse__Output as _ping_PingResponse__Output } from '../ping/PingResponse';

export interface PingClient extends grpc.Client {
  Ping(argument: _ping_PingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  Ping(argument: _ping_PingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  Ping(argument: _ping_PingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  Ping(argument: _ping_PingRequest, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _ping_PingRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _ping_PingRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _ping_PingRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _ping_PingRequest, callback: grpc.requestCallback<_ping_PingResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PingHandlers extends grpc.UntypedServiceImplementation {
  Ping: grpc.handleUnaryCall<_ping_PingRequest__Output, _ping_PingResponse>;
  
}

export interface PingDefinition extends grpc.ServiceDefinition {
  Ping: MethodDefinition<_ping_PingRequest, _ping_PingResponse, _ping_PingRequest__Output, _ping_PingResponse__Output>
}
