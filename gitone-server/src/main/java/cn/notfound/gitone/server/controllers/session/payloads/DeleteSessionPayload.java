package cn.notfound.gitone.server.controllers.session.payloads;

import cn.notfound.gitone.server.controllers.Payload;

public record DeleteSessionPayload(String message) implements Payload {
}
