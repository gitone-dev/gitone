package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = NamespaceEntity.TYPE)
public class NamespaceTypeController {

    @SchemaMapping
    public String id(NamespaceEntity namespaceEntity) {
        return Relay.toGlobalId(namespaceEntity.getType().toString(), namespaceEntity.getId());
    }
}
