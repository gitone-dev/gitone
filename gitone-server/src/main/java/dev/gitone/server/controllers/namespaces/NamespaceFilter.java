package dev.gitone.server.controllers.namespaces;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import dev.gitone.server.entities.NamespaceType;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.entities.Visibility;
import lombok.Data;
import org.springframework.util.Assert;

import java.util.Set;

@Data
public class NamespaceFilter {
    @Data
    public static class By {
        private static final Set<String> allowTypes = Set.of(UserEntity.TYPE, GroupEntity.TYPE);

        private Set<NamespaceType> types;

        private String parentId;

        private Boolean recursive;

        private Visibility visibility;

        private String query;

        private String username;

        private Integer parentId() {
            if (parentId == null || parentId.isBlank()) return null;

            Relay.ResolvedGlobalId globalId = Relay.fromGlobalId(parentId);
            Assert.isTrue(allowTypes.contains(globalId.type()), parentId);
            return globalId.id();

        }

        public NamespaceFilter filter(Integer viewerId) {
            NamespaceFilter filter = new NamespaceFilter();
            filter.setParentId(parentId());
            filter.setRecursive(Boolean.TRUE.equals(recursive));
            filter.setViewerId(viewerId);
            filter.setVisibility(visibility);
            filter.setQuery(query);
            filter.setTypes(types);
            return filter;
        }
    }

    private Set<NamespaceType> types;

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
