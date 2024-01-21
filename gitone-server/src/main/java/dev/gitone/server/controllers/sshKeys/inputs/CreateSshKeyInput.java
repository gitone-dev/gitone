package dev.gitone.server.controllers.sshKeys.inputs;

import dev.gitone.server.entities.SshKeyEntity;
import dev.gitone.server.entities.SshKeyUsage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.apache.sshd.common.config.keys.AuthorizedKeyEntry;
import org.apache.sshd.common.config.keys.KeyUtils;
import org.apache.sshd.common.digest.BuiltinDigests;

import java.security.PublicKey;
import java.time.OffsetDateTime;
import java.util.Set;

@Data
public class CreateSshKeyInput {

    @NotBlank
    private String fullPath;
    @NotBlank
    private String title;
    @NotBlank
    private String key;
    @NotNull
    private Set<SshKeyUsage> usages;

    private OffsetDateTime expiresAt;

    public SshKeyEntity entity() {
        SshKeyEntity entity = new SshKeyEntity();
        entity.setTitle(title);
        entity.setKey(key);
        entity.setFingerprint(generateFingerprint());
        entity.setUsages(usages());
        entity.setExpiresAt(expiresAt);
        return entity;
    }

    private byte[] generateFingerprint() {
        AuthorizedKeyEntry keyEntry = AuthorizedKeyEntry.parseAuthorizedKeyEntry(key);
        try {
            PublicKey publicKey = keyEntry.resolvePublicKey(null, null);
            return KeyUtils.getRawFingerprint(BuiltinDigests.sha256, publicKey);
        } catch (Exception e) {
            throw new IllegalArgumentException(e);
        }
    }

    private Integer[] usages() {
        return usages.stream().map(SshKeyUsage::value).toArray(Integer[]::new);
    }
}
