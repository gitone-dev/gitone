package dev.gitone.server.mappers;

import dev.gitone.server.entities.UserDetailEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDetailMapper extends NodeMapper<Integer, UserDetailEntity> {

    UserDetailEntity findByEmail(String email);

    UserDetailEntity findByResetPasswordToken(String resetPasswordToken);
}
