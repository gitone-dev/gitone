package dev.gitone.server.services;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.controllers.sshKeys.inputs.CreateSshKeyInput;
import dev.gitone.server.controllers.sshKeys.inputs.DeleteSshKeyInput;
import dev.gitone.server.controllers.sshKeys.inputs.UpdateSshKeyInput;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.daos.SshKeyDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.SshKeyEntity;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SshKeyService extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final SshKeyDao sshKeyDao;

    public SshKeyEntity create(CreateSshKeyInput input) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(input.getFullPath());
        NotFound.notNull(namespaceEntity, input.getFullPath());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        SshKeyEntity sshKeyEntity = input.entity();
        sshKeyEntity.setNamespaceId(namespaceEntity.getId());
        sshKeyEntity.setCreatedById(viewerId());
        return sshKeyDao.create(sshKeyEntity);
    }

    public SshKeyEntity update(UpdateSshKeyInput input) {
        SshKeyEntity sshKeyEntity = sshKeyDao.find(input.id());
        NotFound.notNull(sshKeyEntity, input.getId());

        NamespaceEntity namespaceEntity = namespaceDao.find(sshKeyEntity.getNamespaceId());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        sshKeyEntity.setTitle(input.getTitle());
        sshKeyEntity.setUsages(input.usages());
        sshKeyEntity.setExpiresAt(input.getExpiresAt());
        return sshKeyDao.update(sshKeyEntity);
    }

    public SshKeyEntity delete(DeleteSshKeyInput input) {
        SshKeyEntity sshKeyEntity = sshKeyDao.find(input.id());
        NotFound.notNull(sshKeyEntity, input.getId());

        NamespaceEntity namespaceEntity = namespaceDao.find(sshKeyEntity.getNamespaceId());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        return sshKeyDao.delete(sshKeyEntity);
    }
}
