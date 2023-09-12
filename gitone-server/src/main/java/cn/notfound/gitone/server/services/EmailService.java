package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.jobs.UserMailJob;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@AllArgsConstructor
@Service
public class EmailService extends ViewerContext {

    private static final int MAX_EMAILS = 10;

    private UserDao userDao;

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
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);
    }

    public EmailEntity confirm(String token) {
        return emailDao.confirm(token);
    }

    public int deleteByUserId(Integer userId) {
        return emailDao.deleteByUserId(userId);
    }

    public EmailEntity create(String email) {
        EmailEntity emailEntity = emailDao.findByEmail(email);
        if (emailEntity == null) {
            int count = emailDao.countByEmail(email);
            Assert.isTrue(count < MAX_EMAILS, "邮箱数量已达到最大值");

            emailEntity = new EmailEntity();
            emailEntity.setUserId(viewerId());
            emailEntity.setEmail(email);
            emailEntity = emailDao.create(emailEntity);
        } else {
            Assert.isTrue(viewerId().equals(emailEntity.getUserId()), "邮箱不存在");
            Assert.isTrue(!emailEntity.isConfirmed(), "邮箱已激活");
            emailDao.updateToken(emailEntity);
        }

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_EMAIL);
        input.setUserId(viewerId());
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);

        return emailEntity;
    }

    public EmailEntity setPrimary(String email) {
        UserEntity userEntity = userDao.find(viewerId());

        EmailEntity emailEntity = emailDao.findByEmail(email);
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(viewerId().equals(emailEntity.getUserId()), "邮箱不存在");
        Assert.isTrue(emailEntity.isConfirmed(), "邮箱未激活");

        userEntity.setEmail(email);
        userDao.update(userEntity);

        return emailEntity;
    }

    public EmailEntity delete(String email) {
        UserEntity userEntity = userDao.find(viewerId());
        Assert.isTrue(!userEntity.getEmail().equals(email), "无法删除主邮箱");

        EmailEntity emailEntity = emailDao.findByEmail(email);
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(viewerId().equals(emailEntity.getUserId()), "邮箱不存在");
        return emailDao.delete(emailEntity);
    }
}
