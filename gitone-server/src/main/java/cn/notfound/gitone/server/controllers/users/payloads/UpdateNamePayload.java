package cn.notfound.gitone.server.controllers.users.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.UserEntity;

public record UpdateNamePayload(UserEntity user) implements Payload {
}
