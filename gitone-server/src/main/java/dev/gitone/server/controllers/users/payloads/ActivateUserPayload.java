package dev.gitone.server.controllers.users.payloads;

import dev.gitone.server.controllers.Payload;

public record ActivateUserPayload(String message) implements Payload {
}
