package dev.gitone.server.controllers.projects;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.ProjectEntity;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = ProjectEntity.TYPE)
public class ProjectTypeController {

    @SchemaMapping
    public String id(ProjectEntity projectEntity) {
        return Relay.toGlobalId(ProjectEntity.TYPE, projectEntity.getId());
    }

    @SchemaMapping
    public String avatarUrl(ProjectEntity projectEntity) {
        return String.format("/avatars/n/%d", projectEntity.getId());
    }
}
