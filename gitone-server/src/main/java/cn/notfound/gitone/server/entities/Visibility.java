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

    // Less than
    public boolean lt(Visibility other) {
        return this.value < other.value;
    }

    // Less than  or equal to
    public boolean le(Visibility other) {
        return this.value <= other.value;
    }

    // greater than or equal to
    public boolean ge(Visibility other) {
        return this.value >= other.value;
    }

    // greater than
    public boolean gt(Visibility other) {
        return this.value > other.value;
    }
}
