package dev.gitone.server.controllers.releases;

import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.daos.ReleaseDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.ReleaseEntity;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class ReleaseQueryController {

    private final ProjectDao projectDao;

    private final NamespacePolicy namespacePolicy;

    private final ReleaseDao releaseDao;

    @QueryMapping
    public ReleaseConnection releases(
            @Argument String fullPath,
            @Argument Integer first,
            @Argument String after,
            @Argument ReleaseFilter.By filterBy,
            @Argument ReleaseOrder orderBy) {

        NamespaceEntity projectEntity = projectDao.findByFullPath(fullPath);
        NotFound.notNull(projectEntity, fullPath);
        namespacePolicy.assertPermission(projectEntity, Action.READ);

        ReleaseFilter filter = Objects.requireNonNullElse(filterBy, new ReleaseFilter.By()).filter();
        filter.setProjectId(projectEntity.getId());

        ReleasePage page = new ReleasePage(first, after, orderBy).validate();
        List<ReleaseEntity> releases = releaseDao.findAll(filter, page);
        return new ReleaseConnection(releases, page);
    }
}
