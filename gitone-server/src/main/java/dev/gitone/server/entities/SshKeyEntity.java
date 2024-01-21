package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class SshKeyEntity implements TimestampNode<Integer> {

    public static final String TYPE = "SshKey";

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Integer namespaceId;

    private String title;

    private String key;

    private byte[] fingerprint;

    private Integer[] usages = new Integer[0];

    private OffsetDateTime lastUsedAt;

    private OffsetDateTime expiresAt;

    private Integer createdById;

    public boolean isExpired() {
        return expiresAt != null &&
                expiresAt.isBefore(OffsetDateTime.now());
    }

    public Set<SshKeyUsage> usages() {
        return Arrays.stream(usages).
                map(SshKeyUsage::toValueEnum)
                .collect(Collectors.toSet());
    }
}
