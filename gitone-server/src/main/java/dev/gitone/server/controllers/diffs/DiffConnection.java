package dev.gitone.server.controllers.diffs;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.models.git.GitDiff;
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
