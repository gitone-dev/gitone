package dev.gitone.server.controllers.members;

import dev.gitone.server.CustomCursor;
import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.MemberEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MemberCursor extends CustomCursor {

    public static ConnectionCursor create(MemberEntity node, MemberOrder order) {
        MemberCursor cursor = new MemberCursor();
        cursor.setId(node.getId());
        switch (order.getField()) {
            case CREATED_AT -> cursor.setCreatedAt(node.getCreatedAt());
            case UPDATED_AT -> cursor.setUpdatedAt(node.getUpdatedAt());
            case ACCESS -> cursor.setAccess(node.getAccess());
            case USERNAME -> cursor.setUsername(node.getUsername());
        }
        return cursor;
    }

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Access access;

    private String username;
}
