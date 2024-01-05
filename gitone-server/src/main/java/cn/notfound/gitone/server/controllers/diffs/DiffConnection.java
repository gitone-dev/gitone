package cn.notfound.gitone.server.controllers.diffs;

import cn.notfound.gitone.server.CustomConnection;
import cn.notfound.gitone.server.models.git.GitDiff;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class DiffConnection extends CustomConnection<GitDiff, DiffPage> {

    public DiffConnection(List<GitDiff> data, DiffPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(GitDiff node) {
        return DiffCursor.create(node);
    }
}
