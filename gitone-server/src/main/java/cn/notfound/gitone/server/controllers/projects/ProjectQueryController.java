package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.daos.ProjectDao;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.Policy;
import cn.notfound.gitone.server.policies.ProjectPolicy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class ProjectQueryController extends ViewerContext {

    private final UserDao userDao;

    private final ProjectDao projectDao;

    private final ProjectPolicy projectPolicy;

    private final NamespaceDao namespaceDao;

    private final MemberDao memberDao;

    @QueryMapping
    public ProjectEntity project(@Argument String fullPath) {
        ProjectEntity projectEntity  = projectDao.findByFullPath(fullPath);
        NotFound.notNull(projectEntity, fullPath);
        projectPolicy.assertPermission(projectEntity, Action.READ);
        return projectEntity;
    }

    @QueryMapping
    public ProjectConnection projects(
            @Argument Integer first,
            @Argument String after,
            @Argument ProjectFilter.By filterBy,
            @Argument ProjectOrder orderBy) {

        filterBy = Objects.requireNonNullElse(filterBy, new ProjectFilter.By());
        ProjectFilter filter = filterBy.filter(viewerId());
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

        ProjectPage page = new ProjectPage(first, after, orderBy).validate();
        List<ProjectEntity> groups = projectDao.findAll(filter, page);
        return new ProjectConnection(groups, page);
    }

    @QueryMapping
    public Policy projectPolicy(@Argument String fullPath) {
        ProjectEntity projectEntity  = projectDao.findByFullPath(fullPath);
        return projectPolicy.policy(projectEntity);
    }

    private void root(ProjectFilter filter) {
        if (isAuthenticated()) {
            if (viewerId().equals(filter.getUserId())) {
                filter.setViewerId(null);
            }
        } else {
            if (filter.getVisibility() == null) {
                filter.setVisibility(Visibility.PUBLIC);
            } else {
                Assert.isTrue(Visibility.PUBLIC.equals(filter.getVisibility()), "只允许访问公开项目");
            }
        }
    }

    private void subgroup(ProjectFilter filter) {
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
