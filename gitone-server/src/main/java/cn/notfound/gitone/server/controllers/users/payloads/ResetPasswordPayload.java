package cn.notfound.gitone.server.controllers.users.payloads;

import cn.notfound.gitone.server.controllers.Payload;

public record ResetPasswordPayload(String message) implements Payload {
}