package cn.notfound.gitone.server.entities;

import cn.notfound.gitone.server.config.mybatis.IntegerValue;

public enum Visibility implements IntegerValue {

    PRIVATE(0), PUBLIC(40);

    final int value;

    Visibility(int value) {
        this.value = value;
    }

    @Override
    public int value() {
        return value;
    }
}
