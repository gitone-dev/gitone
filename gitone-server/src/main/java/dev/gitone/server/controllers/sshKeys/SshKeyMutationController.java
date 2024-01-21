package dev.gitone.server.controllers.sshKeys;

import dev.gitone.server.controllers.sshKeys.inputs.CreateSshKeyInput;
import dev.gitone.server.controllers.sshKeys.inputs.DeleteSshKeyInput;
import dev.gitone.server.controllers.sshKeys.inputs.UpdateSshKeyInput;
import dev.gitone.server.controllers.sshKeys.payloads.CreateSshKeyPayload;
import dev.gitone.server.controllers.sshKeys.payloads.DeleteSshKeyPayload;
import dev.gitone.server.controllers.sshKeys.payloads.UpdateSshKeyPayload;
import dev.gitone.server.entities.Role;
import dev.gitone.server.entities.SshKeyEntity;
import dev.gitone.server.services.SshKeyService;
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
