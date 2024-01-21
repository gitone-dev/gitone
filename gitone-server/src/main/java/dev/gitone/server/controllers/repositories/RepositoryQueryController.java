package dev.gitone.server.controllers.repositories;

import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@AllArgsConstructor
@Controller
public class RepositoryQueryController {

    private final ProjectDao projectDao;

    private final NamespacePolicy namespacePolicy;

    @QueryMapping
    GitRepository repository(@Argument String fullPath) throws IOException {
        ProjectEntity projectEntity = projectDao.findByFullPath(fullPath);
        NotFound.notNull(projectEntity, fullPath);
        namespacePolicy.assertPermission(projectEntity, Action.READ);

        return new GitRepository(projectEntity);
    }
}
