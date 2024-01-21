package dev.gitone.server.controllers.groups.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteGroupInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(GroupEntity.TYPE, id).id();
    }
}
