package dev.gitone.server.controllers.registeredClients;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = OAuth2RegisteredClientEntity.TYPE)
public class RegisteredClientTypeController {

    private final NamespaceDao namespaceDao;

    @SchemaMapping
    public String id(OAuth2RegisteredClientEntity entity) {
        return Relay.toGlobalId(OAuth2RegisteredClientEntity.TYPE, entity.getId());
    }

    @SchemaMapping
    public String avatarUrl(OAuth2RegisteredClientEntity entity) {
        return String.format("/avatars/a/%d", entity.getId());
    }

    @SchemaMapping
    public String clientSecret(OAuth2RegisteredClientEntity entity) {
        // {noop}, FIXME 加密？
        return entity.getClientSecret().substring(6);
    }

    @BatchMapping
    public Map<OAuth2RegisteredClientEntity, NamespaceEntity> namespace(List<OAuth2RegisteredClientEntity> registeredClients) {
        List<Integer> namespaceIds = registeredClients.stream().map(OAuth2RegisteredClientEntity::getNamespaceId).toList();
        Map<Integer, NamespaceEntity> namespaceMap = namespaceDao.findByIds(namespaceIds)
                .stream()
                .collect(Collectors.toMap(NamespaceEntity::getId, Function.identity()));

        Map<OAuth2RegisteredClientEntity, NamespaceEntity> map = new HashMap<>();
        for (OAuth2RegisteredClientEntity registeredClient: registeredClients) {
            map.put(registeredClient, namespaceMap.get(registeredClient.getNamespaceId()));
        }
        return map;
    }
}
