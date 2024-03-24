package dev.gitone.server.controllers.releases.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateReleaseInput {

    @NotBlank
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String title;

    private String description;

    public Integer id() {
        return Relay.fromGlobalId(GroupEntity.TYPE, id).id();
    }
}
