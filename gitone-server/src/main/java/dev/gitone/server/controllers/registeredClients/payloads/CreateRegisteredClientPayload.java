package dev.gitone.server.controllers.registeredClients.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;

public record CreateRegisteredClientPayload(OAuth2RegisteredClientEntity registeredClient) implements Payload {
}
