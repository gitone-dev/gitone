package dev.gitone.server.controllers.sshKeys.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.SshKeyEntity;
import dev.gitone.server.entities.SshKeyUsage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Set;

@Data
public class UpdateSshKeyInput {

    @NotBlank
    private String id;
    @NotBlank
    private String title;
    @NotNull
    private Set<SshKeyUsage> usages;

    private OffsetDateTime expiresAt;

    public Integer id() {
        return Relay.fromGlobalId(SshKeyEntity.TYPE, id).id();
    }

    public Integer[] usages() {
        return usages.stream().map(SshKeyUsage::value).toArray(Integer[]::new);
    }
}
