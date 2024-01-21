package dev.gitone.server.controllers.members.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.MemberEntity;

public record CreateMemberPayload(MemberEntity member) implements Payload {
}
