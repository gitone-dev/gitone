package dev.gitone.server.controllers.releases;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.ReleaseEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class ReleaseConnection extends CustomConnection<ReleaseEntity, ReleasePage> {

    public ReleaseConnection(List<ReleaseEntity> data, ReleasePage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(ReleaseEntity node) {
        return ReleaseCursor.create(node, page.getOrder());
    }
}
