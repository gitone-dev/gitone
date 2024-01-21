package dev.gitone.server.controllers.session.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.SessionEntity;

public record CreateSessionPayload(SessionEntity session) implements Payload {
}
