package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.entities.GroupEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GroupCursor extends CustomCursor {

    public static ConnectionCursor create(GroupEntity node, GroupOrder order) {
        GroupCursor cursor = new GroupCursor();
        cursor.setId(node.getId());
        switch (order.getField()) {
            case CREATED_AT -> cursor.setCreatedAt(node.getCreatedAt());
            case UPDATED_AT -> cursor.setUpdatedAt(node.getUpdatedAt());
            case PATH -> cursor.setPath(node.getPath());
        }
        return cursor;
    }

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String path;
}
