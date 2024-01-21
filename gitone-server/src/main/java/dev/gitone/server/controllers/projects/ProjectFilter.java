package dev.gitone.server.controllers.projects;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import dev.gitone.server.entities.NamespaceType;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.entities.Visibility;
import lombok.Data;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Set;

@Data
public class ProjectFilter {
    @Data
    public static class By {

        private final List<String> types = List.of(GroupEntity.TYPE, UserEntity.TYPE);

        private String parentId;

        private Boolean recursive;

        private Visibility visibility;

        private String query;

        private String username;

        private Integer parentId() {
            if (parentId == null || parentId.isBlank()) return null;

            Relay.ResolvedGlobalId globalId = Relay.fromGlobalId(parentId);
            Assert.isTrue(types.contains(globalId.type()), "上级类型错误");

            return globalId.id();
        }

        public ProjectFilter filter(Integer viewerId) {
            ProjectFilter filter = new ProjectFilter();
            filter.setParentId(parentId());
            filter.setRecursive(Boolean.TRUE.equals(recursive));
            filter.setViewerId(viewerId);
            filter.setVisibility(visibility);
            filter.setQuery(query);
            return filter;
        }
    }

    private final Set<NamespaceType> types = Set.of(NamespaceType.PROJECT);

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
