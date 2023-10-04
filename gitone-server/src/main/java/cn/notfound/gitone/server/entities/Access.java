package cn.notfound.gitone.server.entities;

import cn.notfound.gitone.server.config.mybatis.IntegerValue;

public enum Access implements IntegerValue {

    NO_ACCESS(0), MIN_ACCESS(10), REPORTER(20), MAINTAINER(40), OWNER(50);

    private final int value;

    Access(int value) {
        this.value = value;
    }

    @Override
    public int value() {
        return value;
    }

    // Less than
    public boolean lt(Access other) {
        return this.value < other.value;
    }

    // Less than  or equal to
    public boolean le(Access other) {
        return this.value <= other.value;
    }

    // greater than or equal to
    public boolean ge(Access other) {
        return this.value >= other.value;
    }

    // greater than
    public boolean gt(Access other) {
        return this.value > other.value;
    }

    public Access max(Access other) {
        return this.lt(other) ? other : this;
    }
}
