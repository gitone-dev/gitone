package cn.notfound.gitone.server.controllers.users.inputs;

import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.controllers.Relay;
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
