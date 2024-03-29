package dev.gitone.server.controllers.users;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.daos.UserDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.Role;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.policies.NamespacePolicy;
import dev.gitone.server.policies.Policy;
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

    private NamespacePolicy namespacePolicy;

    @QueryMapping
    @Secured({ Role.ROLE_USER })
    public UserEntity viewer() {
        return userDao.find(viewerId());
    }

    @QueryMapping
    @Secured({ Role.ROLE_USER })
    public Policy viewerPolicy() {
        NamespaceEntity namespaceEntity = userDao.find(viewerId());;
        return namespacePolicy.policy(namespaceEntity);
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
