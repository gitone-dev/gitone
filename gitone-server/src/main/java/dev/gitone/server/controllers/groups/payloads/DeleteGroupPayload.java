package dev.gitone.server.controllers.groups.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.GroupEntity;

public record DeleteGroupPayload(GroupEntity group) implements Payload {
}
