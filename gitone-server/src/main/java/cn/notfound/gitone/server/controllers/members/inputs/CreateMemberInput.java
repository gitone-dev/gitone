package cn.notfound.gitone.server.controllers.members.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.UserEntity;
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
