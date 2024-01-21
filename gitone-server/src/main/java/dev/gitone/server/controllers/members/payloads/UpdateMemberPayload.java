package dev.gitone.server.controllers.members.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.MemberEntity;

public record UpdateMemberPayload(MemberEntity member) implements Payload {
}
