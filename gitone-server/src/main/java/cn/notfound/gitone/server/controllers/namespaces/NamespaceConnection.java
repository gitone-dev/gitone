package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.CustomConnection;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class NamespaceConnection extends CustomConnection<NamespaceEntity, NamespacePage> {

    public NamespaceConnection(List<NamespaceEntity> data, NamespacePage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(NamespaceEntity node) {
        return NamespaceCursor.create(node, page.getOrder());
    }
}
