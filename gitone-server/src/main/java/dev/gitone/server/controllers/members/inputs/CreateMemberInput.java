package dev.gitone.server.controllers.members.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.UserEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateMemberInput {

    @NotBlank
    private String fullPath;
    @NotBlank
    private String userId;
    @NotNull
    private Access access;

    public Integer userId() {
        return Relay.fromGlobalId(UserEntity.TYPE, userId).id();
    }
}
