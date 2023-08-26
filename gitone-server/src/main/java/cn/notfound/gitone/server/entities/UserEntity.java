package cn.notfound.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class UserEntity implements TimestampNode<Integer> {

    public static final String TYPE = "User";

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Integer namespaceId;

    private String email;

    private String name;

    private String username;

    private String password;

    private String resetPasswordToken;

    private OffsetDateTime resetPasswordSentAt;

    private Boolean active = Boolean.FALSE;

    private Role role = Role.USER;
}
