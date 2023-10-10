package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.GroupDao;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.*;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.GroupPolicy;
import cn.notfound.gitone.server.policies.Policy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class GroupQueryController extends ViewerContext {

    private UserDao userDao;

    private GroupDao groupDao;

    private GroupPolicy groupPolicy;

    private MemberDao memberDao;

    @QueryMapping
    public GroupEntity group(@Argument String fullPath) {
        GroupEntity groupEntity = groupDao.findByFullPath(fullPath);
        groupPolicy.assertPermission(groupEntity, Action.READ);
        return groupEntity;
    }

    @QueryMapping
    public GroupConnection groups(
            @Argument Integer first,
            @Argument String after,
            @Argument GroupFilter.By filterBy,
            @Argument GroupOrder orderBy) {

        filterBy = Objects.requireNonNullElse(filterBy, new GroupFilter.By());
        GroupFilter filter = filterBy.filter(viewerId());
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

        GroupPage page = new GroupPage(first, after, orderBy).validate();
        List<GroupEntity> groups = groupDao.findAll(filter, page);
        return new GroupConnection(groups, page);
    }

    @QueryMapping
    public Policy groupPolicy(@Argument String fullPath) {
        GroupEntity groupEntity= groupDao.findByFullPath(fullPath);
        return groupPolicy.policy(groupEntity);
    }

    private void root(GroupFilter filter) {
        if (isAuthenticated()) {
            if (viewerId().equals(filter.getUserId())) {
                filter.setViewerId(null);
            }
        } else {
            if (filter.getVisibility() == null) {
                filter.setVisibility(Visibility.PUBLIC);
            } else {
                Assert.isTrue(Visibility.PUBLIC.equals(filter.getVisibility()), "只允许访问公开组织");
            }
        }

    }

    private void subgroup(GroupFilter filter) {
        GroupEntity parent = groupDao.find(filter.getParentId());
        NotFound.notNull(parent, "父组未找到");
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
                Assert.isTrue(Visibility.PUBLIC.equals(filter.getVisibility()), "只允许访问公开组织");
            }
            if (filter.getUserId() != null) {
                if (memberDao.findByAncestors(parent.traversalIds(), filter.getUserId()) != null) {
                    filter.setUserId(null);
                }
            }
        }
    }
}
