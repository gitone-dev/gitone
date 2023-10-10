package cn.notfound.gitone.server.entities;

import cn.notfound.gitone.server.config.mybatis.IntegerValue;

public enum NamespaceType implements IntegerValue {

    USER(1), GROUP(2), PROJECT(3);

    final int value;

    NamespaceType(int value) {
        this.value = value;
    }

    @Override
    public int value() {
        return value;
    }

    @Override
    public String toString() {
        return switch (value) {
            case 0 -> NamespaceEntity.TYPE;
            case 1 -> UserNamespaceEntity.TYPE;
            case 2 -> GroupEntity.TYPE;
            case 3 -> ProjectEntity.TYPE;
            default -> throw new IllegalArgumentException("invalid namespace type");
        };
    }
}
