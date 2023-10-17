package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.entities.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class UserQueryController extends ViewerContext {

    private UserDao userDao;

    @QueryMapping
    @Secured({ Role.ROLE_USER })
    public UserEntity viewer() {
        return userDao.find(viewerId());
    }

    @QueryMapping
    public UserEntity user(@Argument String username) {
        UserEntity userEntity = userDao.findByUsername(username);
        NotFound.notNull(userEntity, username);
        return userEntity;
    }

    @QueryMapping
    public UserConnection users(
            @Argument Integer first,
            @Argument String after,
            @Argument UserFilter.By filterBy,
            @Argument UserOrder orderBy) {

        filterBy = Objects.requireNonNullElse(filterBy, new UserFilter.By());
        UserFilter filter = filterBy.filter();
        UserPage page = new UserPage(first, after, orderBy).validate();
        List<UserEntity> users = userDao.findAll(filter, page);
        return new UserConnection(users, page);
    }
}
