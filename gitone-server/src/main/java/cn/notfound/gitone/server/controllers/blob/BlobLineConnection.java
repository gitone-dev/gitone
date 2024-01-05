package cn.notfound.gitone.server.controllers.blob;

import cn.notfound.gitone.node.highlight.BlobLine;
import cn.notfound.gitone.server.CustomConnection;
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
