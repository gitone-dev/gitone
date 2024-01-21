package dev.gitone.server.controllers.users.inputs;

import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.controllers.Relay;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteUserInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(UserEntity.TYPE, id).id();
    }
}
