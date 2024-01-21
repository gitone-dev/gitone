package dev.gitone.server.controllers.tags;

import dev.gitone.server.CustomCursor;
import dev.gitone.server.models.git.GitTag;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TagCursor extends CustomCursor {

    public static ConnectionCursor create(GitTag node, TagOrder order) {
        TagCursor cursor = new TagCursor();
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
