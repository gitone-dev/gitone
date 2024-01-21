package dev.gitone.server.controllers.users.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.UserEntity;

public record CreateUserPayload(UserEntity user) implements Payload {
}
