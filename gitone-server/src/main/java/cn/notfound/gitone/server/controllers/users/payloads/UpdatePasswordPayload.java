package cn.notfound.gitone.server.controllers.users.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.UserEntity;

public record UpdatePasswordPayload(UserEntity user) implements Payload {
}
