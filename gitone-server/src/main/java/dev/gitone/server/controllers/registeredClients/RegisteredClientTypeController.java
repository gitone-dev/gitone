package dev.gitone.server.controllers.registeredClients;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = OAuth2RegisteredClientEntity.TYPE)
public class RegisteredClientTypeController {

    @SchemaMapping
    public String id(OAuth2RegisteredClientEntity entity) {
        return Relay.toGlobalId(OAuth2RegisteredClientEntity.TYPE, entity.getId());
    }

    @SchemaMapping
    public String clientSecret(OAuth2RegisteredClientEntity entity) {
        // {noop}
        return entity.getClientSecret().substring(6);
    }
}
