package dev.gitone.server.controllers;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.Node;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class NodeConnection<ID, T extends Node<ID>> extends CustomConnection<T, NodePage<ID>> {

    public NodeConnection() {
        super(List.of(), new NodePage<>(0));
    }

    public NodeConnection(List<T> data, NodePage<ID> page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(T node) {
        return new NodeCursor<>(node.getId());
    }
}
