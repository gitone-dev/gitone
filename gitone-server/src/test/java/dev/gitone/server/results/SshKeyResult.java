package dev.gitone.server.results;

import dev.gitone.server.entities.SshKeyUsage;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Set;

@Data
public class SshKeyResult {

    private String id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private NamespaceResult namespace;

    private String title;

    private String key;

    private String fingerprint;

    private Set<SshKeyUsage> usages;

    private OffsetDateTime lastUsedAt;

    private OffsetDateTime expiresAt;

    private  Boolean isExpired;
}
