package dev.gitone.server.controllers.sshKeys;

import dev.gitone.server.CustomCursor;
import dev.gitone.server.entities.SshKeyEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SshKeyCursor extends CustomCursor {

    public static ConnectionCursor create(SshKeyEntity node, SshKeyOrder order) {
        SshKeyCursor cursor = new SshKeyCursor();
        cursor.setId(node.getId());
        switch (order.getField()) {
            case CREATED_AT -> cursor.setCreatedAt(node.getCreatedAt());
            case UPDATED_AT -> cursor.setUpdatedAt(node.getUpdatedAt());
            case TITLE -> cursor.setTitle(node.getTitle());
        }
        return cursor;
    }

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String title;
}
