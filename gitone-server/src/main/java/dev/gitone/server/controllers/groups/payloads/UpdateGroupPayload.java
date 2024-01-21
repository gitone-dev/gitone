package dev.gitone.server.controllers.groups.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.GroupEntity;

public record UpdateGroupPayload(GroupEntity group) implements Payload {
}
