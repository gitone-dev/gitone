package cn.notfound.gitone.server;

import graphql.relay.ConnectionCursor;

public abstract class CustomPage<T extends ConnectionCursor> {

    private Integer first;

    private Integer last;

    private T before;

    private T after;

    public CustomPage(Integer first) {
        this.first = first;
    }

    public CustomPage(Integer first, String after) {
        this.first = first;
        setAfter(after);
    }

    public Integer getFirst() {
        return first;
    }

    public void setFirst(Integer first) {
        this.first = first;
    }

    public Integer getLast() {
        return last;
    }

    public void setLast(Integer last) {
        this.last = last;
    }

    public T getBefore() {
        return before;
    }

    public void setBefore(String before) {
        if (before != null) {
            this.before = createCursor(before);
        }
    }

    public T getAfter() {
        return after;
    }

    public void setAfter(String after) {
        if (after != null) {
            this.after = createCursor(after);
        }
    }

    public Integer getLimit() {
        int limit = 20;
        if (first != null) {
            limit = first;
        } else if (last != null) {
            limit = last;
        }
        return limit + 1;
    }

    public CustomPage<T> validate() {
        if (first != null && last != null) {
            throw new IllegalArgumentException("invalid both with first and last");
        }

        return this;
    }

    protected abstract T createCursor(String cursor);
}
