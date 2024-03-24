package dev.gitone.server.controllers.releases;

import lombok.Data;

@Data
public class ReleaseFilter {

    @Data
    public static class By {

        private String query;

        public ReleaseFilter filter() {
            ReleaseFilter filter = new ReleaseFilter();
            filter.setQuery(query);
            return filter;
        }
    }

    private Integer projectId;

    private String query;
}
