package dev.gitone.server.controllers.projects;

import dev.gitone.server.controllers.projects.inputs.CreateProjectInput;
import dev.gitone.server.controllers.projects.inputs.DeleteProjectInput;
import dev.gitone.server.controllers.projects.inputs.UpdateProjectInput;
import dev.gitone.server.controllers.projects.payloads.CreateProjectPayload;
import dev.gitone.server.controllers.projects.payloads.DeleteProjectPayload;
import dev.gitone.server.controllers.projects.payloads.UpdateProjectPayload;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.entities.Role;
import dev.gitone.server.services.ProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@AllArgsConstructor
@Controller
public class ProjectMutationController {

    private final ProjectService projectService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateProjectPayload createProject(@Valid @Argument CreateProjectInput input) throws IOException {
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
}
