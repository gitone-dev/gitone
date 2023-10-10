package cn.notfound.gitone.server.controllers.projects.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.ProjectEntity;

public record UpdateProjectPayload(ProjectEntity project) implements Payload {
}
