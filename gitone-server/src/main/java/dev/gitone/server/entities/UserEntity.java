package dev.gitone.server.entities;

public class UserEntity extends NamespaceEntity {

    public static final String TYPE = "User";

    public UserEntity() {
        setType(NamespaceType.USER);
        setVisibility(Visibility.PUBLIC);
    }
}
