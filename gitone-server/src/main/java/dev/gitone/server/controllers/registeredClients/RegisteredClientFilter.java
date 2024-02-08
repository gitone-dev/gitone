package dev.gitone.server.controllers.registeredClients;

import lombok.Data;

import java.util.Collection;
import java.util.LinkedHashSet;

@Data
public class RegisteredClientFilter {

    @Data
    public static class By {

        private String query;

        public RegisteredClientFilter filter() {
            RegisteredClientFilter filter = new RegisteredClientFilter();
            filter.setQuery(query);
            return filter;
        }
    }

    private Collection<Integer> traversalIds = new LinkedHashSet<>();

    private String query;
}
