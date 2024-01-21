package dev.gitone.server.controllers.projects;

import dev.gitone.server.CustomCursor;
import dev.gitone.server.entities.ProjectEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectCursor extends CustomCursor {

    public static ConnectionCursor create(ProjectEntity node, ProjectOrder order) {
        ProjectCursor cursor = new ProjectCursor();
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
