package dev.gitone.server.controllers.projects.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.ProjectEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteProjectInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(ProjectEntity.TYPE, id).id();
    }
}
