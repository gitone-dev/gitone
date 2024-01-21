package dev.gitone.server.controllers.blob;

import dev.gitone.node.highlight.BlobLine;
import dev.gitone.server.CustomCursor;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BlobLineCursor extends CustomCursor {

    public static ConnectionCursor create(BlobLine node) {
        BlobLineCursor cursor = new BlobLineCursor();
        cursor.setNumber(node.getNumber());
        return cursor;
    }

    private Integer number;
}
