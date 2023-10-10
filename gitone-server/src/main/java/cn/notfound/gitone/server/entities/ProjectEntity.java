package cn.notfound.gitone.server.entities;

public class ProjectEntity extends NamespaceEntity {

    public static final String TYPE = "Project";

    public ProjectEntity() {
        setType(NamespaceType.PROJECT);
    }
}
