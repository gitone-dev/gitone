package dev.gitone.server.controllers.emails.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.EmailEntity;

public record CreateEmailPayload(EmailEntity email) implements Payload {
}
