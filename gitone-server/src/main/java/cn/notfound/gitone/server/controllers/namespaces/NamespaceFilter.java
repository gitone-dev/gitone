package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.NamespaceType;
import cn.notfound.gitone.server.entities.Visibility;
import lombok.Data;

import java.util.Set;

@Data
public class NamespaceFilter {
    @Data
    public static class By {

        private Set<NamespaceType> types;

        private String parentId;

        private Boolean recursive;

        private Visibility visibility;

        private String query;

        private String username;

        private Integer parentId() {
            if (parentId == null || parentId.isBlank()) return null;

            return Relay.fromGlobalId(NamespaceEntity.TYPE, parentId).id();
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
