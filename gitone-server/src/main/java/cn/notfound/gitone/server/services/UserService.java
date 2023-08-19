package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.controllers.users.inputs.*;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.jobs.UserMailJob;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.time.Duration;
import java.time.OffsetDateTime;

@AllArgsConstructor
@Service
public class UserService {

    private PasswordEncoder passwordEncoder;

    private UserDao userDao;

    private EmailService emailService;

    private UserMailJob userMailJob;

    public UserEntity create(CreateUserInput input) {
        UserEntity userEntity = input.entity(passwordEncoder);
        userEntity = userDao.create(userEntity);
        emailService.createUser(userEntity);
        return userEntity;
    }

    public UserEntity delete(DeleteUserInput input) {
        UserEntity userEntity = userDao.find(input.id());
        userDao.delete(userEntity);
        return userEntity;
    }

    public void updateActivationEmail(HttpServletRequest request, UpdateActivationEmailInput input) {
        HttpSession httpSession = request.getSession(false);
        Assert.notNull(httpSession, "请先登录");

        Integer userId = (Integer) httpSession.getAttribute(SessionService.ACTIVATE_USER_KEY);
        Assert.notNull(userId, "请重新登录");
        httpSession.removeAttribute(SessionService.ACTIVATE_USER_KEY);

        UserEntity userEntity = userDao.find(userId);
        Assert.notNull(userEntity, "请重新登录");
        Assert.isTrue(!userEntity.getActive(), "用户已激活");

        String oldEmail = userEntity.getEmail();
        userEntity.setEmail(input.getEmail());
        userDao.update(userEntity);

        emailService.updateEmail(userEntity, oldEmail);
    }

    public void sendActivationEmail(HttpServletRequest request, SendActivationEmailInput input) {
        HttpSession httpSession = request.getSession(false);
        Assert.notNull(httpSession, "请先登录");

        Integer userId = (Integer) httpSession.getAttribute(SessionService.ACTIVATE_USER_KEY);
        Assert.notNull(userId, "请重新登录");
        httpSession.removeAttribute(SessionService.ACTIVATE_USER_KEY);

        UserEntity userEntity = userDao.find(userId);
        Assert.notNull(userEntity, "请重新登录");
        Assert.isTrue(userEntity.getEmail().equals(input.getEmail()), "请重新登录");
        Assert.isTrue(!userEntity.getActive(), "用户已激活");

        emailService.updateToken(userEntity);
    }

    public void activate(ActivateUserInput input) {
        EmailEntity emailEntity = emailService.confirm(input.getToken());
        Assert.notNull(emailEntity, "token 不合规");

        UserEntity userEntity = userDao.find(emailEntity.getUserId());
        Assert.notNull(userEntity, "token 不合规");

        userEntity.setActive(true);
        userDao.update(userEntity);
    }

    public void sendPasswordResetEmail(SendPasswordResetEmailInput input) {
        UserEntity userEntity = userDao.findByEmail(input.getEmail());
        Assert.notNull(userEntity, "用户不存在或者非主邮箱");

        userDao.updateResetPasswordToken(userEntity);

        UserMailJob.Input jobInput = new UserMailJob.Input();
        jobInput.setType(UserMailJob.Type.RESET_PASSWORD);
        jobInput.setUserId(userEntity.getId());
        jobInput.setUsername(userEntity.getUsername());
        jobInput.setEmail(userEntity.getEmail());
        jobInput.setToken(userEntity.getResetPasswordToken());
        userMailJob.enqueue(jobInput);
    }

    public void resetPassword(ResetPasswordInput input) {
        UserEntity userEntity = userDao.findByResetPasswordToken(input.getToken());
        Assert.notNull(userEntity, "密码重置令牌已失效");

        OffsetDateTime resetPasswordSentAt = userEntity.getResetPasswordSentAt();
        Assert.notNull(resetPasswordSentAt, "密码重置令牌已失效");
        Assert.isTrue(Duration.between(resetPasswordSentAt, OffsetDateTime.now()).getSeconds() <= 500, "密码重置令牌已失效");

        userEntity.setResetPasswordToken(null);
        userEntity.setResetPasswordSentAt(null);
        userEntity.setPassword(passwordEncoder.encode(input.getPassword()));
        userDao.update(userEntity);
    }
}
