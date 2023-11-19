package cn.notfound.gitone.server.controllers.branches;

import cn.notfound.gitone.server.CustomConnection;
import cn.notfound.gitone.server.models.git.GitBranch;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class BranchConnection extends CustomConnection<GitBranch, BranchPage> {

    public BranchConnection(List<GitBranch> data, BranchPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(GitBranch node) {
        return BranchCursor.create(node, page.getOrder());
    }
}
