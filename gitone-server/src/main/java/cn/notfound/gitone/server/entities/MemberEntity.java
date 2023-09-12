package cn.notfound.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class MemberEntity implements TimestampNode<Integer> {

    public static final String TYPE = "Member";

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Integer namespaceId;

    private Integer userId;

    private Access access;

    private Integer createdById;

    // join users
    private String username;
}
