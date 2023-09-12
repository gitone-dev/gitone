package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import cn.notfound.gitone.server.policies.Policy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class NamespaceQueryController {

    private NamespaceDao namespaceDao;

    private NamespacePolicy namespacePolicy;

    @QueryMapping
    public Boolean existFullPath(@Argument String fullPath) {
        return namespaceDao.findByFullPath(fullPath) != null;
    }

    @QueryMapping
    public NamespaceEntity namespace(@Argument String fullPath) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(fullPath);
        NotFound.notNull(namespaceEntity, fullPath);
        if (!namespacePolicy.policy(namespaceEntity).getActions().contains(Action.READ)) {
            NamespaceEntity entity = namespaceEntity;
            namespaceEntity = new NamespaceEntity();
            namespaceEntity.setId(entity.getId());
            namespaceEntity.setType(entity.getType());
            namespaceEntity.setFullPath(entity.getFullPath());
        }
        return namespaceEntity;
    }

    @QueryMapping
    public Policy namespacePolicy(@Argument String fullPath) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(fullPath);
        NotFound.notNull(namespaceEntity, fullPath);
        return namespacePolicy.policy(namespaceEntity);
    }
}
