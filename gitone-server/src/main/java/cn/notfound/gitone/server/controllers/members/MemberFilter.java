package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.entities.Access;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class MemberFilter {
    @Data
    public static class By {

        private Access access;

        private String query;

        public MemberFilter filter() {
            MemberFilter filter = new MemberFilter();
            filter.setAccess(access);
            filter.setQuery(query);
            return filter;
        }
    }

    private Integer namespaceId;

    private Access access;

    private String query;
}
