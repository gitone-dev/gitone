package cn.notfound.gitone.server.controllers;

import cn.notfound.gitone.server.CustomCursor;

public class NodeCursor<ID> extends CustomCursor {

    private ID id;

    public NodeCursor() {
    }

    public NodeCursor(ID id) {
        this.id =id;
    }

    public ID getId() {
        return id;
    }

    public void setId(ID id) {
        this.id = id;
    }
}
