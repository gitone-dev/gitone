package dev.gitone.server.controllers.registeredClients;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.gitone.server.CustomCursor;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegisteredClientCursor extends CustomCursor {

    public static ConnectionCursor create(OAuth2RegisteredClientEntity node, RegisteredClientOrder order) {
        RegisteredClientCursor cursor = new RegisteredClientCursor();
        cursor.setId(node.getId());
        switch (order.getField()) {
            case CREATED_AT -> cursor.setCreatedAt(node.getCreatedAt());
            case UPDATED_AT -> cursor.setUpdatedAt(node.getUpdatedAt());
        }
        return cursor;
    }

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;
}
