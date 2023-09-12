package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.GroupDao;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.entities.Visibility;
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
        GroupFilter filter = filterBy.filter();
        if (filterBy.getUsername() != null) {
            UserEntity userEntity = userDao.findByUsername(filterBy.getUsername());
            NotFound.notNull(userEntity, filterBy.getUsername());
            filter.setMemberUserId(userEntity.getId());
        }
        if (!isAuthenticated() || !viewerId().equals(filter.getMemberUserId())) {
            Assert.isTrue(Visibility.PUBLIC.equals(filter.getVisibility()), "只允许访问公开组织");
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
}
