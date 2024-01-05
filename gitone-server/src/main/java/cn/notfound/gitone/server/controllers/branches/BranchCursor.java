package cn.notfound.gitone.server.controllers.branches;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.models.git.GitBranch;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BranchCursor extends CustomCursor {

    public static ConnectionCursor create(GitBranch node, BranchOrder order) {
        BranchCursor cursor = new BranchCursor();
        switch (order.getField()) {
            case NAME -> cursor.setName(node.getName());
            case AUTHOR_DATE -> cursor.setAuthorDate(node.getCommit().getAuthor().getDate());
            case COMMITTER_DATE -> cursor.setCommitterDate(node.getCommit().getCommitter().getDate());
        }
        return cursor;
    }

    private String name;

    private OffsetDateTime authorDate;

    private OffsetDateTime committerDate;
}
