package cn.notfound.gitone.server.entities;

public class UserNamespaceEntity extends NamespaceEntity {

    public static final String TYPE = "UserNamespace";

    public UserNamespaceEntity() {
        setType(NamespaceType.USER);
        setVisibility(Visibility.PUBLIC);
    }
}
