package cn.notfound.gitone.server.controllers.projects.payloads;

import cn.notfound.gitone.server.entities.ProjectEntity;

public record CreateProjectPayload(ProjectEntity project) {
}
