package cn.notfound.gitone.server.entities;

import java.util.Set;

public class ProjectEntity extends NamespaceEntity {

    public static final String TYPE = "Project";

    public static final Set<NamespaceType> namespaceTypes = Set.of(NamespaceType.USER, NamespaceType.GROUP);

    public ProjectEntity() {
        setType(NamespaceType.PROJECT);
    }
}
