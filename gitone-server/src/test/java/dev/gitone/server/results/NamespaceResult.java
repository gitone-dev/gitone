package dev.gitone.server.results;

import dev.gitone.server.entities.Visibility;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NamespaceResult {

    private String id;

    private String name;

    private String path;

    private String fullName;

    private String fullPath;

    private Visibility visibility;

    private String description;

    public void reset() {
        this.name = null;
        this.path = null;
        this.fullName = null;
        this.description = "";
    }
}
