package dev.gitone.server.controllers.projects.payloads;

import dev.gitone.server.controllers.Payload;
import dev.gitone.server.entities.ProjectEntity;

public record UpdateProjectPayload(ProjectEntity project) implements Payload {
}
