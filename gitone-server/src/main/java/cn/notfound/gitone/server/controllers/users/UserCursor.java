package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.entities.UserEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserCursor extends CustomCursor {

    public static ConnectionCursor create(UserEntity node, UserOrder order) {
        UserCursor cursor = new UserCursor();
        cursor.setId(node.getId());
        switch (order.getField()) {
            case CREATED_AT -> cursor.setCreatedAt(node.getCreatedAt());
            case UPDATED_AT -> cursor.setUpdatedAt(node.getUpdatedAt());
            case USERNAME -> cursor.setUsername(node.getFullPath());
        }
        return cursor;
    }

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String username;
}
