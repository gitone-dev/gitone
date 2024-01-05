import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { HighlightClient as _highlight_HighlightClient, HighlightDefinition as _highlight_HighlightDefinition } from './highlight/Highlight';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  highlight: {
    BlobLine: MessageTypeDefinition
    BlobRequest: MessageTypeDefinition
    BlobResponse: MessageTypeDefinition
    DiffLine: MessageTypeDefinition
    DiffRequest: MessageTypeDefinition
    DiffResponse: MessageTypeDefinition
    Highlight: SubtypeConstructor<typeof grpc.Client, _highlight_HighlightClient> & { service: _highlight_HighlightDefinition }
  }
}

