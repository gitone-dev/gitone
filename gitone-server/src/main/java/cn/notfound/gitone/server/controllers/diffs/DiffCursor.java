package cn.notfound.gitone.server.controllers.diffs;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.models.git.GitDiff;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DiffCursor extends CustomCursor {

    public static ConnectionCursor create(GitDiff node) {
        DiffCursor cursor = new DiffCursor();
        cursor.setId(node.getId());
        return cursor;
    }

    private String id;
}
