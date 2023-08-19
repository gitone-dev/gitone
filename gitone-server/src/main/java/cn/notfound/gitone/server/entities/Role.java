package cn.notfound.gitone.server.entities;

import cn.notfound.gitone.server.config.mybatis.IntegerValue;

public enum Role implements IntegerValue {

    USER(0), ADMIN(65535);

    private final int value;

    Role(int value) {
        this.value = value;
    }

    @Override
    public int value() {
        return value;
    }

    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";

}
