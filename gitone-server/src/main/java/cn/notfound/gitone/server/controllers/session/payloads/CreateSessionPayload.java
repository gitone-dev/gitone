package cn.notfound.gitone.server.controllers.session.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.SessionEntity;

public record CreateSessionPayload(SessionEntity session) implements Payload {
}
