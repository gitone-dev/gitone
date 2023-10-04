package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.Visibility;
import lombok.Data;

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
