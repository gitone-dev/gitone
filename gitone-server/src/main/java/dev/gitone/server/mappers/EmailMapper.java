package dev.gitone.server.mappers;

import dev.gitone.server.entities.EmailEntity;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface EmailMapper extends NodeMapper<Integer, EmailEntity> {

    EmailEntity findByEmail(String email);

    int countByEmail(String email);

    EmailEntity findByConfirmationToken(String confirmationToken);

    List<EmailEntity> findByUserId(Integer userId);

    int countByUserId(Integer userId);

    int deleteByUserId(Integer userId);
}
