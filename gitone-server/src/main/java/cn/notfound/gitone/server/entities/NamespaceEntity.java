package cn.notfound.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class NamespaceEntity implements TimestampNode<Integer> {

    public static final String TYPE = "Namespace";

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private NamespaceType type;

    private Integer parentId = 0;

    private String name;

    private String path;

    private String fullName;

    private String fullPath;

    private Visibility visibility = Visibility.PRIVATE;

    private String description = "";
}
