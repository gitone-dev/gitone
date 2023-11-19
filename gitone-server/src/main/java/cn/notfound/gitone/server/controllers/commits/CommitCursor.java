package cn.notfound.gitone.server.controllers.commits;

import cn.notfound.gitone.server.CustomCursor;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommitCursor extends CustomCursor {

    public static ConnectionCursor create(String reversion, int skip) {
        CommitCursor cursor = new CommitCursor();
        cursor.setReversion(reversion);
        cursor.setSkip(skip);
        return cursor;
    }

    private String reversion;

    private int skip;
}
