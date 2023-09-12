package cn.notfound.gitone.server.controllers.groups.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.GroupEntity;

public record UpdateGroupVisibilityPayload(GroupEntity group) implements Payload {
}
