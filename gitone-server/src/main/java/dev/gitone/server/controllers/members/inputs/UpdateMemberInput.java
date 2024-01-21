package dev.gitone.server.controllers.members.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.MemberEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateMemberInput {

    @NotBlank
    private String id;

    @NotNull
    private Access access;

    public Integer id() {
        return Relay.fromGlobalId(MemberEntity.TYPE, id).id();
    }
}
