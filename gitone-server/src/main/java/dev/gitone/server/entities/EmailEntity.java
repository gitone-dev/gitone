package dev.gitone.server.entities;

import lombok.Data;

import java.time.Duration;
import java.time.OffsetDateTime;

@Data
public class EmailEntity implements TimestampNode<Integer> {

    public static final String TYPE = "Email";

    public static final int EXPIRE = 300;

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Integer userId;

    private String email;

    // FIXME: 2023/10/29 仅保存 SHA256
    private String confirmationToken;

    private OffsetDateTime confirmationSentAt;

    private OffsetDateTime confirmedAt;

    public boolean isConfirmed() {
        return confirmedAt != null;
    }

    public boolean isExpired() {
        return confirmationSentAt == null ||
                Duration.between(confirmationSentAt, OffsetDateTime.now()).getSeconds() > EXPIRE;
    }
}
