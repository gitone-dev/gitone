package dev.gitone.server.controllers.namespaces;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.config.exception.Unauthorized;
import dev.gitone.server.daos.MemberDao;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.daos.UserDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.entities.Visibility;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import dev.gitone.server.policies.Policy;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class NamespaceQueryController extends ViewerContext {

    private final UserDao userDao;

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final MemberDao memberDao;

    @QueryMapping
    public Boolean existFullPath(@Argument String fullPath) {
        return namespaceDao.findByFullPath(fullPath) != null;
    }

    @QueryMapping
    public NamespaceEntity namespace(@Argument String fullPath) {
        NamespaceEntity namespaceEntity = findNamespace(fullPath);

        if (!namespacePolicy.policy(namespaceEntity).getActions().contains(Action.READ)) {
            namespaceEntity.setCreatedAt(null);
            namespaceEntity.setUpdatedAt(null);
            namespaceEntity.setName(null);
            namespaceEntity.setPath(null);
            namespaceEntity.setFullName(null);
            namespaceEntity.setDescription("");
        }
        return namespaceEntity;
    }

    @QueryMapping
    public Policy namespacePolicy(@Argument String fullPath) {
        NamespaceEntity namespaceEntity = findNamespace(fullPath);
        return namespacePolicy.policy(namespaceEntity);
    }

    @QueryMapping
    public NamespaceConnection namespaces(
            @Argument Integer first,
            @Argument String after,
            @Argument NamespaceFilter.By filterBy,
            @Argument NamespaceOrder orderBy) {

        filterBy = Objects.requireNonNullElse(filterBy, new NamespaceFilter.By());
        NamespaceFilter filter = filterBy.filter(viewerId());
        if (filterBy.getUsername() != null) {
            UserEntity userEntity = userDao.findByUsername(filterBy.getUsername());
            NotFound.notNull(userEntity, filterBy.getUsername());
            filter.setUserId(userEntity.getId());
        }

        if (!filter.hasParent()) {
            root(filter);
        } else {
            subgroup(filter);
        }

        NamespacePage page = new NamespacePage(first, after, orderBy).validate();
        List<NamespaceEntity> namespaces = namespaceDao.findAll(filter, page);
        return new NamespaceConnection(namespaces, page);
    }

    @NotNull
    private NamespaceEntity findNamespace(@Nullable String fullPath) {
        NamespaceEntity namespaceEntity;
        if (fullPath == null || fullPath.isEmpty()) {
            Unauthorized.isTrue(isAuthenticated(), "未登录且 fullPath 参数为空");
            namespaceEntity = namespaceDao.find(viewerId());
        } else {
            namespaceEntity = namespaceDao.findByFullPath(fullPath);
        }
        NotFound.notNull(namespaceEntity, fullPath);
        return namespaceEntity;
    }

    private void root(NamespaceFilter filter) {
        if (isAuthenticated()) {
            if (viewerId().equals(filter.getUserId())) {
                filter.setViewerId(null);
            }
        } else {
            if (filter.getVisibility() == null) {
                filter.setVisibility(Visibility.PUBLIC);
            } else {
                Assert.isTrue(Visibility.PUBLIC.equals(filter.getVisibility()), "只允许访问公开命名空间");
            }
        }
    }

    private void subgroup(NamespaceFilter filter) {
        NamespaceEntity parent = namespaceDao.find(filter.getParentId());
        NotFound.notNull(parent, "上级命名空间未找到");
        filter.setParentLevel(parent.getTraversalIds().length);

        if (isAuthenticated()) {
            if (filter.getUserId() == null) {
                if (memberDao.findByAncestors(parent.traversalIds(), viewerId()) != null) {
                    filter.setViewerId(null);
                }
            } else {
                if (memberDao.findByAncestors(parent.traversalIds(), viewerId()) != null) {
                    filter.setViewerId(null);
                }
                if (memberDao.findByAncestors(parent.traversalIds(), filter.getUserId()) != null) {
                    filter.setUserId(null);
                }
                if (viewerId().equals(filter.getUserId())) {
                    filter.setViewerId(null);
                }
            }
        } else {
            if (filter.getVisibility() == null) {
                filter.setVisibility(Visibility.PUBLIC);
            } else {
                Assert.isTrue(Visibility.PUBLIC.equals(filter.getVisibility()), "只允许访问公开命名空间");
            }
            if (filter.getUserId() != null) {
                if (memberDao.findByAncestors(parent.traversalIds(), filter.getUserId()) != null) {
                    filter.setUserId(null);
                }
            }
        }
    }
}
