package cn.notfound.gitone.server.controllers.sshKeys;

import lombok.Data;

import java.util.Collection;
import java.util.LinkedHashSet;

@Data
public class SshKeyFilter {

    @Data
    public static class By {

        private String query;

        private String fingerprint;

        public SshKeyFilter filter() {
            SshKeyFilter filter = new SshKeyFilter();
            filter.setQuery(query);
            filter.setFingerprint(fingerprint);
            return filter;
        }
    }

    private Collection<Integer> traversalIds = new LinkedHashSet<>();

    private String query;

    private String fingerprint;
}
