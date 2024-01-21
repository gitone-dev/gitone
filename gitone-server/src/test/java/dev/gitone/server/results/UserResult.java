package dev.gitone.server.results;

import dev.gitone.server.entities.Role;
import dev.gitone.server.entities.Visibility;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class UserResult {

    private String id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String name;

    private String username;

    private String description;

    private Boolean active;

    private Role role;

    private String location;

    private String websiteUrl;

    public NamespaceResult namespace() {
        NamespaceResult result = new NamespaceResult();
        result.setId(id);
        result.setName(name);
        result.setFullName(name);
        result.setPath(username);
        result.setFullPath(username);
        result.setDescription(description);
        result.setVisibility(Visibility.PUBLIC);
        return result;
    }
}
