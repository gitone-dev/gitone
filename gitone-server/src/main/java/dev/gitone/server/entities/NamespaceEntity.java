package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.List;

@Data
public class NamespaceEntity implements TimestampNode<Integer> {

    public static final String TYPE = "Namespace";

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private NamespaceType type;

    private Integer parentId = 0;

    private Integer[] traversalIds = new Integer[0];

    private String name;

    private String path;

    private String fullName;

    private String fullPath;

    private Visibility visibility = Visibility.PRIVATE;

    private String description = "";

    public boolean isUser() {
        return type.equals(NamespaceType.USER);
    }

    public boolean isPublic() {
        return Visibility.PUBLIC.equals(visibility);
    }

    public boolean isPrivate() {
        return Visibility.PRIVATE.equals(visibility);
    }

    public List<Integer> traversalIds() {
        return List.of(traversalIds);
    }
}
