package cn.notfound.gitone.server.controllers.sshKeys.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.SshKeyEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteSshKeyInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(SshKeyEntity.TYPE, id).id();
    }
}
