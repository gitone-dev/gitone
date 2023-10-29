package cn.notfound.gitone.server.controllers.sshKeys;

import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.daos.SshKeyDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.SshKeyEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class SshKeyQueryController {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final SshKeyDao sshKeyDao;

    @QueryMapping
    public SshKeyConnection sshKeys(
            @Argument String fullPath,
            @Argument Integer first,
            @Argument String after,
            @Argument SshKeyFilter.By filterBy,
            @Argument SshKeyOrder orderBy) {

        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(fullPath);
        NotFound.notNull(namespaceEntity, fullPath);
        namespacePolicy.assertPermission(namespaceEntity, Action.READ);

        SshKeyFilter filter = Objects.requireNonNullElse(filterBy, new SshKeyFilter.By()).filter();
        filter.setTraversalIds(namespaceEntity.traversalIds());
        if (namespaceEntity.getParentId() != null && namespaceEntity.getTraversalIds().length == 2) {
            NamespaceEntity parent = namespaceDao.find(namespaceEntity.getParentId());
            if (parent.isUser()) {
                filter.setTraversalIds(List.of(namespaceEntity.getId()));
            }
        }

        SshKeyPage page = new SshKeyPage(first, after, orderBy).validate();
        List<SshKeyEntity> sshKeys = sshKeyDao.findAll(filter, page);
        return new SshKeyConnection(sshKeys, page);
    }
}
