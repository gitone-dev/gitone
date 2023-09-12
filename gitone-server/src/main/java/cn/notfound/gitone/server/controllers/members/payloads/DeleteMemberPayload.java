package cn.notfound.gitone.server.controllers.members.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.MemberEntity;

public record DeleteMemberPayload(MemberEntity member) implements Payload {
}
