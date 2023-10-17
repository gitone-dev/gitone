package cn.notfound.gitone.server.controllers.users;

import lombok.Data;

@Data
public class UserFilter {
    @Data
    public static class By {

        private String query;

        public UserFilter filter() {
            UserFilter filter = new UserFilter();
            filter.setQuery(query);
            return filter;
        }
    }

    private String query;
}
