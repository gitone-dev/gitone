package cn.notfound.gitone.server.controllers.users;

public enum UserOrderField {
    CREATED_AT,
    UPDATED_AT,
    USERNAME;

    @Override
    public String toString() {
        if (this.equals(USERNAME)) {
            return "full_path";
        }
        return name().toLowerCase();
    }
}
