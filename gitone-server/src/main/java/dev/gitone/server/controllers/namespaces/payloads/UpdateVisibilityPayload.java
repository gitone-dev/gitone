package dev.gitone.server.controllers.namespaces.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.NamespaceEntity;

public record UpdateVisibilityPayload(NamespaceEntity namespace) implements Payload {
}
