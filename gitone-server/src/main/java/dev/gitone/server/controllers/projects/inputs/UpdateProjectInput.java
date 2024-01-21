package dev.gitone.server.controllers.projects.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.ProjectEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateProjectInput {

    @NotBlank
    private String id;

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotNull @Size(max = 255)
    private String description;

    public int id() {
        return Relay.fromGlobalId(ProjectEntity.TYPE, id).id();
    }
}
