package dev.gitone.server.controllers.registeredClients.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;

public record UpdateRegisteredClientPayload(OAuth2RegisteredClientEntity registeredClient) implements Payload {
}
