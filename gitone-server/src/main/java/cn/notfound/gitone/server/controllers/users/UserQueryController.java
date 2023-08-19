package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.config.exception.NotFoundException;
import cn.notfound.gitone.server.controllers.BaseController;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.entities.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class UserQueryController extends BaseController {

    private UserDao userDao;

    @QueryMapping
    @Secured({ Role.ROLE_USER })
    public UserEntity viewer() {
        return userDao.find(viewerId());
    }

    @QueryMapping
    public UserEntity user(@Argument String username) {
        UserEntity userEntity = userDao.findByUsername(username);
        if (userEntity == null) {
            throw new NotFoundException(username);
        }
        return userEntity;
    }
}
