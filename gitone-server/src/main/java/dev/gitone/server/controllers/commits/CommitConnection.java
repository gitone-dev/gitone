package dev.gitone.server.controllers.commits;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.models.git.GitCommit;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class CommitConnection extends CustomConnection<GitCommit, CommitPage> {

    private String reversion;
    private int skip;

    public CommitConnection(List<GitCommit> data, CommitPage page) {
        super(data, page);
        if (page.getAfter() != null) {
            this.reversion = page.getAfter().getReversion();
            this.skip = page.getAfter().getSkip();
        } else if (!data.isEmpty()) {
            this.reversion = data.get(0).getSha();
            this.skip = 0;
        }
    }

    @Override
    protected ConnectionCursor createCursor(GitCommit node) {
        this.skip += 1;
        return CommitCursor.create(reversion, skip);
    }
}
