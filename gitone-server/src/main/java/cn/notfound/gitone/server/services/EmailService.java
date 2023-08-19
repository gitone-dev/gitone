package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.jobs.UserMailJob;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@AllArgsConstructor
@Service
public class EmailService extends BaseService {

    private EmailDao emailDao;

    private UserMailJob userMailJob;

    public void createUser(UserEntity userEntity) {
        EmailEntity emailEntity = new EmailEntity();
        emailEntity.setUserId(userEntity.getId());
        emailEntity.setEmail(userEntity.getEmail());
        emailDao.create(emailEntity);

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setUserId(userEntity.getId());
        input.setUsername(userEntity.getUsername());
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);
    }

    public void updateEmail(UserEntity userEntity, String oldEmail) {
        EmailEntity emailEntity = emailDao.findByEmail(oldEmail);
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(userEntity.getId().equals(emailEntity.getUserId()), "数据状态不一致");
        emailEntity.setEmail(userEntity.getEmail());
        emailDao.updateToken(emailEntity);

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setUserId(userEntity.getId());
        input.setUsername(userEntity.getUsername());
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);
    }

    public void updateToken(UserEntity userEntity) {
        EmailEntity emailEntity = emailDao.findByEmail(userEntity.getEmail());
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(userEntity.getId().equals(emailEntity.getUserId()), "数据状态不一致");
        emailDao.updateToken(emailEntity);

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setUserId(userEntity.getId());
        input.setUsername(userEntity.getUsername());
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);
    }

    public EmailEntity confirm(String token) {
        return emailDao.confirm(token);
    }
}
