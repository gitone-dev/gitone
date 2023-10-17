package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.entities.UserDetailEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserDetailMapper extends NodeMapper<Integer, UserDetailEntity> {

    UserDetailEntity findByEmail(String email);

    UserDetailEntity findByResetPasswordToken(String resetPasswordToken);
}
