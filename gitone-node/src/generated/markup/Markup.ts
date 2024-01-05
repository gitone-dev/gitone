// Original file: src/proto/markup.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { MarkupRequest as _markup_MarkupRequest, MarkupRequest__Output as _markup_MarkupRequest__Output } from '../markup/MarkupRequest';
import type { MarkupResponse as _markup_MarkupResponse, MarkupResponse__Output as _markup_MarkupResponse__Output } from '../markup/MarkupResponse';

export interface MarkupClient extends grpc.Client {
  Markup(argument: _markup_MarkupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  Markup(argument: _markup_MarkupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  Markup(argument: _markup_MarkupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  Markup(argument: _markup_MarkupRequest, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  markup(argument: _markup_MarkupRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  markup(argument: _markup_MarkupRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  markup(argument: _markup_MarkupRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  markup(argument: _markup_MarkupRequest, callback: grpc.requestCallback<_markup_MarkupResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MarkupHandlers extends grpc.UntypedServiceImplementation {
  Markup: grpc.handleUnaryCall<_markup_MarkupRequest__Output, _markup_MarkupResponse>;
  
}

export interface MarkupDefinition extends grpc.ServiceDefinition {
  Markup: MethodDefinition<_markup_MarkupRequest, _markup_MarkupResponse, _markup_MarkupRequest__Output, _markup_MarkupResponse__Output>
}
