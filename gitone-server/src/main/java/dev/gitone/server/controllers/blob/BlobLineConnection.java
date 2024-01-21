package dev.gitone.server.controllers.blob;

import dev.gitone.node.highlight.BlobLine;
import dev.gitone.server.CustomConnection;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class BlobLineConnection extends CustomConnection<BlobLine, BlobLinePage> {

    public BlobLineConnection(List<BlobLine> data, BlobLinePage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(BlobLine node) {
        return BlobLineCursor.create(node);
    }
}
