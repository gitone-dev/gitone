package dev.gitone.server.daos;

import dev.gitone.server.controllers.users.UserFilter;
import dev.gitone.server.controllers.users.UserPage;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.mappers.UserMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDao extends TimestampDao<Integer, UserEntity, UserMapper> {

    public UserDao(UserMapper mapper) {
        super(mapper);
    }

    public UserEntity findByFullPath(String fullPath) {
        return mapper.findByUsername(fullPath);
    }

    public UserEntity findByUsername(String username) {
        return mapper.findByUsername(username);
    }

    public List<UserEntity> findAll(UserFilter filter, UserPage page) {
        return mapper.findAll(filter, page);
    }
}
