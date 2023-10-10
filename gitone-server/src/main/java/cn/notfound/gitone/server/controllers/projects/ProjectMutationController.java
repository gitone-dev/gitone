package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.controllers.projects.inputs.*;
import cn.notfound.gitone.server.controllers.projects.payloads.*;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.services.ProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class ProjectMutationController {

    private final ProjectService projectService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateProjectPayload createProject(@Valid @Argument CreateProjectInput input) {
        ProjectEntity projectEntity = projectService.create(input);
        return new CreateProjectPayload(projectEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteProjectPayload deleteProject(@Valid @Argument DeleteProjectInput input) {
        ProjectEntity projectEntity = projectService.delete(input);
        return new DeleteProjectPayload(projectEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateProjectPayload updateProject(@Valid @Argument UpdateProjectInput input) {
        ProjectEntity projectEntity = projectService.update(input);
        return new UpdateProjectPayload(projectEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateProjectPathPayload updateProjectPath(@Valid @Argument UpdateProjectPathInput input) {
        ProjectEntity projectEntity = projectService.updatePath(input);
        return new UpdateProjectPathPayload(projectEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateProjectVisibilityPayload updateProjectVisibility(@Valid @Argument UpdateProjectVisibilityInput input) {
        ProjectEntity projectEntity = projectService.updateVisibility(input);
        return new UpdateProjectVisibilityPayload(projectEntity);
    }
}
