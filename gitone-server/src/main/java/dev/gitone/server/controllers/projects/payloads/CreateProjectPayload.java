package dev.gitone.server.controllers.projects.payloads;

import dev.gitone.server.entities.ProjectEntity;

public record CreateProjectPayload(ProjectEntity project) {
}
