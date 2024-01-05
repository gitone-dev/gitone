// Original file: src/proto/highlight.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { BlobRequest as _highlight_BlobRequest, BlobRequest__Output as _highlight_BlobRequest__Output } from '../highlight/BlobRequest';
import type { BlobResponse as _highlight_BlobResponse, BlobResponse__Output as _highlight_BlobResponse__Output } from '../highlight/BlobResponse';
import type { DiffRequest as _highlight_DiffRequest, DiffRequest__Output as _highlight_DiffRequest__Output } from '../highlight/DiffRequest';
import type { DiffResponse as _highlight_DiffResponse, DiffResponse__Output as _highlight_DiffResponse__Output } from '../highlight/DiffResponse';

export interface HighlightClient extends grpc.Client {
  Blob(argument: _highlight_BlobRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  Blob(argument: _highlight_BlobRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  Blob(argument: _highlight_BlobRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  Blob(argument: _highlight_BlobRequest, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  blob(argument: _highlight_BlobRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  blob(argument: _highlight_BlobRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  blob(argument: _highlight_BlobRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  blob(argument: _highlight_BlobRequest, callback: grpc.requestCallback<_highlight_BlobResponse__Output>): grpc.ClientUnaryCall;
  
  Blobs(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_highlight_BlobRequest, _highlight_BlobResponse__Output>;
  Blobs(options?: grpc.CallOptions): grpc.ClientDuplexStream<_highlight_BlobRequest, _highlight_BlobResponse__Output>;
  blobs(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_highlight_BlobRequest, _highlight_BlobResponse__Output>;
  blobs(options?: grpc.CallOptions): grpc.ClientDuplexStream<_highlight_BlobRequest, _highlight_BlobResponse__Output>;
  
  Diff(argument: _highlight_DiffRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  Diff(argument: _highlight_DiffRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  Diff(argument: _highlight_DiffRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  Diff(argument: _highlight_DiffRequest, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  diff(argument: _highlight_DiffRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  diff(argument: _highlight_DiffRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  diff(argument: _highlight_DiffRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  diff(argument: _highlight_DiffRequest, callback: grpc.requestCallback<_highlight_DiffResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface HighlightHandlers extends grpc.UntypedServiceImplementation {
  Blob: grpc.handleUnaryCall<_highlight_BlobRequest__Output, _highlight_BlobResponse>;
  
  Blobs: grpc.handleBidiStreamingCall<_highlight_BlobRequest__Output, _highlight_BlobResponse>;
  
  Diff: grpc.handleUnaryCall<_highlight_DiffRequest__Output, _highlight_DiffResponse>;
  
}

export interface HighlightDefinition extends grpc.ServiceDefinition {
  Blob: MethodDefinition<_highlight_BlobRequest, _highlight_BlobResponse, _highlight_BlobRequest__Output, _highlight_BlobResponse__Output>
  Blobs: MethodDefinition<_highlight_BlobRequest, _highlight_BlobResponse, _highlight_BlobRequest__Output, _highlight_BlobResponse__Output>
  Diff: MethodDefinition<_highlight_DiffRequest, _highlight_DiffResponse, _highlight_DiffRequest__Output, _highlight_DiffResponse__Output>
}
