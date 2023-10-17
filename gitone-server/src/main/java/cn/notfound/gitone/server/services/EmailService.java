package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.daos.UserDetailDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserDetailEntity;
import cn.notfound.gitone.server.jobs.UserMailJob;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@AllArgsConstructor
@Service
public class EmailService extends ViewerContext {

    private static final int MAX_EMAILS = 10;

    private UserDetailDao userDetailDao;

    private EmailDao emailDao;

    private UserMailJob userMailJob;

    public void createUser(UserDetailEntity userDetailEntity) {
        EmailEntity emailEntity = new EmailEntity();
        emailEntity.setUserId(userDetailEntity.getId());
        emailEntity.setEmail(userDetailEntity.getEmail());
        emailDao.create(emailEntity);

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setUserId(userDetailEntity.getId());
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);
    }

    public void updateEmail(UserDetailEntity userDetailEntity, String oldEmail) {
        EmailEntity emailEntity = emailDao.findByEmail(oldEmail);
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(userDetailEntity.getId().equals(emailEntity.getUserId()), "数据状态不一致");
        emailEntity.setEmail(userDetailEntity.getEmail());
        emailDao.updateToken(emailEntity);

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setUserId(userDetailEntity.getId());
        input.setEmail(emailEntity.getEmail());
        input.setToken(emailEntity.getConfirmationToken());
        userMailJob.enqueue(input);
    }

    public void updateToken(UserDetailEntity userDetailEntity) {
        EmailEntity emailEntity = emailDao.findByEmail(userDetailEntity.getEmail());
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(userDetailEntity.getId().equals(emailEntity.getUserId()), "数据状态不一致");
        emailDao.updateToken(emailEntity);

        UserMailJob.Input input = new UserMailJob.Input();
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setUserId(userDetailEntity.getId());
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
        UserDetailEntity userDetailEntity = userDetailDao.find(viewerId());

        EmailEntity emailEntity = emailDao.findByEmail(email);
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(viewerId().equals(emailEntity.getUserId()), "邮箱不存在");
        Assert.isTrue(emailEntity.isConfirmed(), "邮箱未激活");

        userDetailEntity.setEmail(email);
        userDetailDao.update(userDetailEntity);

        return emailEntity;
    }

    public EmailEntity delete(String email) {
        UserDetailEntity userDetailEntity = userDetailDao.find(viewerId());
        Assert.isTrue(!userDetailEntity.getEmail().equals(email), "无法删除主邮箱");

        EmailEntity emailEntity = emailDao.findByEmail(email);
        Assert.notNull(emailEntity, "邮箱不存在");
        Assert.isTrue(viewerId().equals(emailEntity.getUserId()), "邮箱不存在");
        return emailDao.delete(emailEntity);
    }
}
