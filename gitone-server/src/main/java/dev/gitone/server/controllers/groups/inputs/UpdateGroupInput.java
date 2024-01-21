package dev.gitone.server.controllers.groups.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateGroupInput {

    @NotBlank
    private String id;

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotNull @Size(max = 255)
    private String description;

    public int id() {
        return Relay.fromGlobalId(GroupEntity.TYPE, id).id();
    }
}
