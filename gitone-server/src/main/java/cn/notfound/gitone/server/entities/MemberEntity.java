package cn.notfound.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Set;

@Data
public class MemberEntity implements TimestampNode<Integer> {

    public static final String TYPE = "Member";

    public static final Set<NamespaceType> namespaceTypes = Set.of(NamespaceType.PROJECT, NamespaceType.GROUP);

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
