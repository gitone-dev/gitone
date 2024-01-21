package dev.gitone.server.controllers;

import dev.gitone.server.CustomPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class NodePage<ID> extends CustomPage<NodeCursor<ID>> {

    public NodePage(Integer first) {
        super(first);
    }

    public NodePage(Integer first, String after) {
        super(first, after);
    }

    @Override
    public NodeCursor<ID> getBefore() {
        return super.getBefore();
    }

    @Override
    public NodeCursor<ID> getAfter() {
        return super.getAfter();
    }

    @Override
    public NodePage<ID> validate() {
        super.validate();
        return this;
    }

    @Override
    protected NodeCursor<ID> createCursor(String cursor) {
        return NodeCursor.create(cursor, new TypeReference<>() {});
    }
}
