package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.entities.Visibility;
import lombok.Data;

@Data
public class GroupFilter {
    @Data
    public static class By {

        private Visibility visibility;

        private String query;

        private String username;

        public GroupFilter filter() {
            GroupFilter filter = new GroupFilter();
            filter.setVisibility(visibility);
            filter.setQuery(query);
            return filter;
        }
    }

    private String query;

    private Visibility visibility;

    private Integer parentId;

    private Integer memberUserId;
}
