package cn.notfound.gitone.server.controllers.users;

public enum UserOrderField {
    CREATED_AT,
    UPDATED_At,
    USERNAME;

    @Override
    public String toString() {
        return name().toLowerCase();
    }
}
