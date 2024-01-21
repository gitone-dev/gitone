package dev.gitone.server.controllers.session.payloads;

import dev.gitone.server.controllers.Payload;

public record DeleteSessionPayload(String message) implements Payload {
}
