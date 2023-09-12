package cn.notfound.gitone.server.entities;

public class GroupEntity extends NamespaceEntity {

    public static final String TYPE = "Group";

    public GroupEntity() {
        setType(NamespaceType.GROUP);
    }
}
