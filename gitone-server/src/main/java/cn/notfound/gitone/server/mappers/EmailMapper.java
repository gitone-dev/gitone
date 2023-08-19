package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.entities.EmailEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmailMapper extends BaseMapper<Integer, EmailEntity>{

    EmailEntity findByEmail(String email);

    EmailEntity findByConfirmationToken(String confirmationToken);

    List<EmailEntity> findByUserId(Integer userId);

    int countByUserId(Integer userId);
}
