import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MarkupClient as _markup_MarkupClient, MarkupDefinition as _markup_MarkupDefinition } from './markup/Markup';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  markup: {
    Markup: SubtypeConstructor<typeof grpc.Client, _markup_MarkupClient> & { service: _markup_MarkupDefinition }
    MarkupRequest: MessageTypeDefinition
    MarkupResponse: MessageTypeDefinition
  }
}

