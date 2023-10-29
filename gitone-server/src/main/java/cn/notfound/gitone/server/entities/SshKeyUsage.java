package cn.notfound.gitone.server.entities;

import cn.notfound.gitone.server.config.mybatis.IntegerValue;

public enum SshKeyUsage implements IntegerValue {

    READ(0b01), WRITE(0b11);

    private final int value;

    SshKeyUsage(int value) {
        this.value = value;
    }

    @Override
    public int value() {
        return value;
    }

    public static SshKeyUsage toValueEnum(int value) {
        for (SshKeyUsage e : SshKeyUsage.values()) {
            if (e.value() == value) return e;
        }
        throw new IllegalArgumentException("Cannot convert " + value + " to SshKeyUsage by value.");
    }
}
