package dev.gitone.server.services;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.controllers.registeredClients.inputs.CreateRegisteredClientInput;
import dev.gitone.server.controllers.registeredClients.inputs.DeleteRegisteredClientInput;
import dev.gitone.server.controllers.registeredClients.inputs.UpdateRegisteredClientInput;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.daos.OAuth2RegisteredClientDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class RegisteredClientService extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final OAuth2RegisteredClientDao registeredClientDao;

    public OAuth2RegisteredClientEntity create(CreateRegisteredClientInput input) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(input.getFullPath());
        NotFound.notNull(namespaceEntity, input.getFullPath());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        // FIXME
        OAuth2RegisteredClientEntity registeredClientEntity = input.entity();
        registeredClientEntity.setNamespaceId(namespaceEntity.getId());
        registeredClientEntity.setCreatedById(viewerId());
        return registeredClientDao.create(registeredClientEntity);
    }

    public OAuth2RegisteredClientEntity update(UpdateRegisteredClientInput input) {
        OAuth2RegisteredClientEntity registeredClientEntity = registeredClientDao.find(input.id());
        NotFound.notNull(registeredClientEntity, input.getId());

        NamespaceEntity namespaceEntity = namespaceDao.find(registeredClientEntity.getNamespaceId());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        registeredClientEntity.setClientName(input.getClientName());
        registeredClientEntity.setRedirectUris(input.getRedirectUris().toArray(new String[0]));
        registeredClientEntity.setDescription(input.getDescription());
        return registeredClientDao.update(registeredClientEntity);
    }

    public OAuth2RegisteredClientEntity delete(DeleteRegisteredClientInput input) {
        OAuth2RegisteredClientEntity registeredClientEntity = registeredClientDao.find(input.id());
        NotFound.notNull(registeredClientEntity, input.getId());

        NamespaceEntity namespaceEntity = namespaceDao.find(registeredClientEntity.getNamespaceId());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        return registeredClientDao.delete(registeredClientEntity);
    }
}
