package dev.gitone.server.controllers.members.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.MemberEntity;

public record DeleteMemberPayload(MemberEntity member) implements Payload {
}
