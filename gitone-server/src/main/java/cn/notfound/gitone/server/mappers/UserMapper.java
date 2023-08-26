package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.controllers.users.UserFilter;
import cn.notfound.gitone.server.controllers.users.UserPage;
import cn.notfound.gitone.server.entities.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper extends NodeMapper<Integer, UserEntity> {

    UserEntity findByEmail(String email);

    UserEntity findByUsername(String username);

    UserEntity findByResetPasswordToken(String resetPasswordToken);

    List<UserEntity> findAll(@Param("filter") UserFilter filter, @Param("page") UserPage page);
}
