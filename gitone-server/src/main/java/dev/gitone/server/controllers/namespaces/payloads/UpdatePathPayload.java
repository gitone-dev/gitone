package dev.gitone.server.controllers.namespaces.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.NamespaceEntity;

public record UpdatePathPayload(NamespaceEntity namespace) implements Payload {
}
