package cn.notfound.gitone.server.controllers.sshKeys;

import cn.notfound.gitone.server.controllers.sshKeys.inputs.CreateSshKeyInput;
import cn.notfound.gitone.server.controllers.sshKeys.inputs.DeleteSshKeyInput;
import cn.notfound.gitone.server.controllers.sshKeys.inputs.UpdateSshKeyInput;
import cn.notfound.gitone.server.controllers.sshKeys.payloads.CreateSshKeyPayload;
import cn.notfound.gitone.server.controllers.sshKeys.payloads.DeleteSshKeyPayload;
import cn.notfound.gitone.server.controllers.sshKeys.payloads.UpdateSshKeyPayload;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.entities.SshKeyEntity;
import cn.notfound.gitone.server.services.SshKeyService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class SshKeyMutationController {

    private final SshKeyService sshKeyService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateSshKeyPayload createSshKey(@Valid @Argument CreateSshKeyInput input) {
        SshKeyEntity sshKeyEntity = sshKeyService.create(input);
        return new CreateSshKeyPayload(sshKeyEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateSshKeyPayload updateSshKey(@Valid @Argument UpdateSshKeyInput input) {
        SshKeyEntity sshKeyEntity = sshKeyService.update(input);
        return new UpdateSshKeyPayload(sshKeyEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteSshKeyPayload deleteSshKey(@Valid @Argument DeleteSshKeyInput input) {
        SshKeyEntity sshKeyEntity = sshKeyService.delete(input);
        return new DeleteSshKeyPayload(sshKeyEntity);
    }
}
