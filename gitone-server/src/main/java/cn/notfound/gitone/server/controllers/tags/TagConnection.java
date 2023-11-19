package cn.notfound.gitone.server.controllers.tags;

import cn.notfound.gitone.server.CustomConnection;
import cn.notfound.gitone.server.models.git.GitTag;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class TagConnection extends CustomConnection<GitTag, TagPage> {

    public TagConnection(List<GitTag> data, TagPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(GitTag node) {
        return TagCursor.create(node, page.getOrder());
    }
}
