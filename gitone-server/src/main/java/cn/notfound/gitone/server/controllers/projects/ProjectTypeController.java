package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.ProjectEntity;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = ProjectEntity.TYPE)
public class ProjectTypeController {

    @SchemaMapping
    public String id(ProjectEntity projectEntity) {
        return Relay.toGlobalId(ProjectEntity.TYPE, projectEntity.getId());
    }
}
