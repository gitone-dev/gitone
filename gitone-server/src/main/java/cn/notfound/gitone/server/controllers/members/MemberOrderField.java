package cn.notfound.gitone.server.controllers.members;

public enum MemberOrderField {
    CREATED_AT,
    UPDATED_AT,
    ACCESS,
    USERNAME;

    public boolean joinUsers() {
        return this.equals(USERNAME);
    }
}
