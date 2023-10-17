package cn.notfound.gitone.server.controllers.namespaces.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.NamespaceEntity;

public record UpdateVisibilityPayload(NamespaceEntity namespace) implements Payload {
}
