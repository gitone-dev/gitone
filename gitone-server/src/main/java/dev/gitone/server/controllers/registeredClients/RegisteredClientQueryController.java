package dev.gitone.server.controllers.registeredClients;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.controllers.Relay;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.daos.OAuth2RegisteredClientDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
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
public class RegisteredClientQueryController extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final OAuth2RegisteredClientDao registeredClientDao;

    @QueryMapping
    public OAuth2RegisteredClientEntity registeredClient(@Argument String id) {
        Integer intId = Relay.fromGlobalId(OAuth2RegisteredClientEntity.TYPE, id).id();
        OAuth2RegisteredClientEntity entity = registeredClientDao.find(intId);
        NotFound.notNull(entity, String.format("notfound %s", id));

        NamespaceEntity namespaceEntity = namespaceDao.find(entity.getNamespaceId());
        NotFound.notNull(namespaceEntity, "notfound namespace");
        namespacePolicy.assertPermission(namespaceEntity, Action.READ);

        return entity;
    }

    @QueryMapping
    public RegisteredClientConnection registeredClients(
            @Argument String fullPath,
            @Argument Integer first,
            @Argument String after,
            @Argument RegisteredClientFilter.By filterBy,
            @Argument RegisteredClientOrder orderBy) {

        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(fullPath);
        NotFound.notNull(namespaceEntity, fullPath);
        namespacePolicy.assertPermission(namespaceEntity, Action.READ);

        RegisteredClientFilter filter = Objects.requireNonNullElse(filterBy, new RegisteredClientFilter.By()).filter();
        filter.setTraversalIds(namespaceEntity.traversalIds());
        if (namespaceEntity.getParentId() != null && namespaceEntity.getTraversalIds().length == 2) {
            NamespaceEntity parent = namespaceDao.find(namespaceEntity.getParentId());
            if (parent.isUser()) {
                filter.setTraversalIds(List.of(namespaceEntity.getId()));
            }
        }

        RegisteredClientPage page = new RegisteredClientPage(first, after, orderBy).validate();
        List<OAuth2RegisteredClientEntity> registeredClients = registeredClientDao.findAll(filter, page);
        return new RegisteredClientConnection(registeredClients, page);
    }
}
