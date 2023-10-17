package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.config.exception.Unauthorized;
import cn.notfound.gitone.server.controllers.users.inputs.*;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.daos.UserDetailDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserDetailEntity;
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
public class UserService extends ViewerContext {

    private PasswordEncoder passwordEncoder;

    private UserDao userDao;

    private UserDetailDao userDetailDao;

    private EmailService emailService;

    private UserMailJob userMailJob;

    public UserEntity create(CreateUserInput input) {
        UserEntity userEntity = input.user();
        userEntity = userDao.create(userEntity);

        UserDetailEntity userDetailEntity = input.userDetail(passwordEncoder);
        userDetailEntity.setId(userEntity.getId());
        userDetailDao.create(userDetailEntity);

        emailService.createUser(userDetailEntity);
        return userEntity;
    }

    public UserEntity delete(DeleteUserInput input) {
        UserEntity userEntity = userDao.find(input.id());
        emailService.deleteByUserId(userEntity.getId());
        userDetailDao.delete(userEntity.getId());
        userDao.delete(userEntity);
        return userEntity;
    }

    public void updateActivationEmail(HttpServletRequest request, UpdateActivationEmailInput input) {
        HttpSession httpSession = request.getSession(false);
        Unauthorized.notNull(httpSession, "请先登录");

        Integer userId = (Integer) httpSession.getAttribute(SessionService.ACTIVATE_USER_KEY);
        Forbidden.notNull(userId, "请重新登录");
        httpSession.removeAttribute(SessionService.ACTIVATE_USER_KEY);

        UserDetailEntity userDetailEntity = userDetailDao.find(userId);
        Assert.notNull(userDetailEntity, "请重新登录");
        Assert.isTrue(!userDetailEntity.getActive(), "用户已激活");

        String oldEmail = userDetailEntity.getEmail();
        userDetailEntity.setEmail(input.getEmail());
        userDetailDao.update(userDetailEntity);

        emailService.updateEmail(userDetailEntity, oldEmail);
    }

    public void sendActivationEmail(HttpServletRequest request, SendActivationEmailInput input) {
        HttpSession httpSession = request.getSession(false);
        Unauthorized.notNull(httpSession, "请先登录");

        Integer userId = (Integer) httpSession.getAttribute(SessionService.ACTIVATE_USER_KEY);
        Forbidden.notNull(userId, "请重新登录");
        httpSession.removeAttribute(SessionService.ACTIVATE_USER_KEY);

        UserDetailEntity userDetailEntity = userDetailDao.find(userId);
        Forbidden.notNull(userDetailEntity, "请重新登录");
        Forbidden.isTrue(userDetailEntity.getEmail().equals(input.getEmail()), "请重新登录");
        Assert.isTrue(!userDetailEntity.getActive(), "用户已激活");

        emailService.updateToken(userDetailEntity);
    }

    public void activate(ActivateUserInput input) {
        EmailEntity emailEntity = emailService.confirm(input.getToken());
        Assert.notNull(emailEntity, "token 不合规");

        UserDetailEntity userDetailEntity = userDetailDao.find(emailEntity.getUserId());
        Assert.notNull(userDetailEntity, "token 不合规");

        userDetailEntity.setActive(true);
        userDetailDao.update(userDetailEntity);
    }

    public void sendPasswordResetEmail(SendPasswordResetEmailInput input) {
        UserDetailEntity userDetailEntity = userDetailDao.findByEmail(input.getEmail());
        Assert.notNull(userDetailEntity, "用户不存在或者非主邮箱");

        userDetailDao.updateResetPasswordToken(userDetailEntity);

        UserMailJob.Input jobInput = new UserMailJob.Input();
        jobInput.setType(UserMailJob.Type.RESET_PASSWORD);
        jobInput.setUserId(userDetailEntity.getId());
        jobInput.setEmail(userDetailEntity.getEmail());
        jobInput.setToken(userDetailEntity.getResetPasswordToken());
        userMailJob.enqueue(jobInput);
    }

    public void resetPassword(ResetPasswordInput input) {
        UserDetailEntity userDetailEntity = userDetailDao.findByResetPasswordToken(input.getToken());
        Assert.notNull(userDetailEntity, "密码重置令牌已失效");

        OffsetDateTime resetPasswordSentAt = userDetailEntity.getResetPasswordSentAt();
        Assert.notNull(resetPasswordSentAt, "密码重置令牌已失效");
        Assert.isTrue(Duration.between(resetPasswordSentAt, OffsetDateTime.now()).getSeconds() <= 500, "密码重置令牌已失效");

        userDetailEntity.setResetPasswordToken(null);
        userDetailEntity.setResetPasswordSentAt(null);
        userDetailEntity.setPassword(passwordEncoder.encode(input.getPassword()));
        userDetailDao.update(userDetailEntity);
    }

    public UserEntity update(UpdateUserInput input) {
        UserDetailEntity userDetailEntity = userDetailDao.find(viewerId());
        userDetailEntity.setLocation(input.getLocation());
        userDetailEntity.setWebsiteUrl(input.getWebsiteUrl());
        userDetailDao.update(userDetailEntity);

        UserEntity userEntity = userDao.find(viewerId());
        userEntity.setName(input.getName());
        userEntity.setFullName(input.getName());
        userEntity.setDescription(input.getDescription());
        return userDao.update(userEntity);
    }

    public UserEntity updatePassword(UpdatePasswordInput input) {
        UserDetailEntity userDetailEntity = userDetailDao.find(viewerId());
        input.validate(passwordEncoder, userDetailEntity.getPassword());

        userDetailEntity.setPassword(passwordEncoder.encode(input.getPassword()));
        userDetailDao.update(userDetailEntity);
        return userDao.find(viewerId());
    }
}
