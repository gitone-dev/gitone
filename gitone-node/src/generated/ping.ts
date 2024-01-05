import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PingClient as _ping_PingClient, PingDefinition as _ping_PingDefinition } from './ping/Ping';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ping: {
    Ping: SubtypeConstructor<typeof grpc.Client, _ping_PingClient> & { service: _ping_PingDefinition }
    PingRequest: MessageTypeDefinition
    PingResponse: MessageTypeDefinition
  }
}

