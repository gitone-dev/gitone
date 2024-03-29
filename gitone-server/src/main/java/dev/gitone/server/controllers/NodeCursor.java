package dev.gitone.server.controllers;

import dev.gitone.server.CustomCursor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NodeCursor<ID> extends CustomCursor {

    private ID id;

    public NodeCursor() {
    }

    public NodeCursor(ID id) {
        this.id =id;
    }
}
