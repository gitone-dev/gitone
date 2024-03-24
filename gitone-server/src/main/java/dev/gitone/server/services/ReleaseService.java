package dev.gitone.server.services;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.controllers.releases.inputs.CreateReleaseInput;
import dev.gitone.server.controllers.releases.inputs.DeleteReleaseInput;
import dev.gitone.server.controllers.releases.inputs.UpdateReleaseInput;
import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.daos.ReleaseDao;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.entities.ReleaseEntity;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class ReleaseService extends ViewerContext {

    private NamespacePolicy namespacePolicy;

    private ProjectDao projectDao;

    private ReleaseDao releaseDao;

    public ReleaseEntity create(CreateReleaseInput input) {
        ProjectEntity projectEntity = projectDao.findByFullPath(input.getFullPath());
        NotFound.notNull(projectEntity, input.getFullPath());

        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        ReleaseEntity entity = input.entity();
        entity.setProjectId(projectEntity.getId());
        entity.setCreatedById(viewerId());
        return releaseDao.create(entity);
    }

    public ReleaseEntity update(UpdateReleaseInput input) {
        ReleaseEntity releaseEntity = releaseDao.find(input.id());
        NotFound.notNull(releaseEntity, input.getId());

        ProjectEntity projectEntity = projectDao.find(releaseEntity.getProjectId());
        NotFound.notNull(projectEntity, input.getId());

        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        releaseEntity.setTagName(releaseEntity.getTagName());
        releaseEntity.setTitle(releaseEntity.getTitle());
        releaseEntity.setDescription(releaseEntity.getDescription());

        return releaseDao.update(releaseEntity);
    }

    public ReleaseEntity delete(DeleteReleaseInput input) {
        ReleaseEntity releaseEntity = releaseDao.find(input.id());
        NotFound.notNull(releaseEntity, input.getId());

        ProjectEntity projectEntity = projectDao.find(releaseEntity.getProjectId());
        NotFound.notNull(projectEntity, releaseEntity.getProjectId().toString());

        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        return releaseEntity;
    }
}
