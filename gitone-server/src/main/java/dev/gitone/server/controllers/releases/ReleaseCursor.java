package dev.gitone.server.controllers.releases;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.gitone.server.CustomCursor;
import dev.gitone.server.entities.ReleaseEntity;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReleaseCursor extends CustomCursor {

    public static ConnectionCursor create(ReleaseEntity node, ReleaseOrder order) {
        ReleaseCursor cursor = new ReleaseCursor();
        cursor.setId(node.getId());
        switch (order.getField()) {
            case CREATED_AT -> cursor.setCreatedAt(node.getCreatedAt());
            case TAG_NAME -> cursor.setTagName(node.getTagName());
        }
        return cursor;
    }

    private Integer id;

    private OffsetDateTime createdAt;

    private String tagName;
}
