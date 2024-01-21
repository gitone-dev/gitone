package dev.gitone.server.mappers;

import dev.gitone.server.controllers.users.UserFilter;
import dev.gitone.server.controllers.users.UserPage;
import dev.gitone.server.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper extends NodeMapper<Integer, UserEntity> {

    UserEntity findByUsername(String username);

    List<UserEntity> findAll(@Param("filter") UserFilter filter, @Param("page") UserPage page);
}
