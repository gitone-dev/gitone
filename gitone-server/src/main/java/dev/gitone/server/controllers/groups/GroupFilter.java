package dev.gitone.server.controllers.groups;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import dev.gitone.server.entities.NamespaceType;
import dev.gitone.server.entities.Visibility;
import lombok.Data;

import java.util.Set;

@Data
public class GroupFilter {
    @Data
    public static class By {

        private String parentId;

        private Boolean recursive;

        private Visibility visibility;

        private String query;

        private String username;

        private Integer parentId() {
            if (parentId == null || parentId.isBlank()) return null;

            return Relay.fromGlobalId(GroupEntity.TYPE, parentId).id();
        }

        public GroupFilter filter(Integer viewerId) {
            GroupFilter filter = new GroupFilter();
            filter.setParentId(parentId());
            filter.setRecursive(Boolean.TRUE.equals(recursive));
            filter.setViewerId(viewerId);
            filter.setVisibility(visibility);
            filter.setQuery(query);
            return filter;
        }
    }

    private final Set<NamespaceType> types = Set.of(NamespaceType.GROUP);

    private Integer parentId;

    private int parentLevel;

    private boolean recursive;

    private Integer viewerId;

    private Integer userId;

    private Visibility visibility;

    private String query;

    public boolean hasParent() {
        return parentId != null && parentId != 0;
    }
}
