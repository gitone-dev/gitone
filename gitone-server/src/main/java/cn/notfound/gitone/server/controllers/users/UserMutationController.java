package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.controllers.users.inputs.*;
import cn.notfound.gitone.server.controllers.users.payloads.*;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

@AllArgsConstructor
@Controller
public class UserMutationController extends ViewerContext {

    private HttpServletRequest request;

    private UserService userService;

    @MutationMapping
    public CreateUserPayload createUser(@Valid @Argument CreateUserInput input) {
        Assert.isTrue(!isAuthenticated(), "用户已登录");

        UserEntity userEntity = userService.create(input);
        return new CreateUserPayload(userEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteUserPayload deleteUser(@Valid @Argument DeleteUserInput input) {
        Forbidden.isTrue(viewerId().equals(input.id()), "用户 id 不匹配");

        UserEntity userEntity = userService.delete(input);
        return new DeleteUserPayload(userEntity);
    }

    @MutationMapping
    public UpdateActivationEmailPayload updateActivationEmail(@Valid @Argument UpdateActivationEmailInput input) {
        userService.updateActivationEmail(request, input);
        return new UpdateActivationEmailPayload("邮件已发送");
    }

    @MutationMapping
    public SendActivationEmailPayload sendActivationEmail(@Valid @Argument SendActivationEmailInput input) {
        Assert.isTrue(!isAuthenticated(), "用户已激活");
        userService.sendActivationEmail(request, input);
        return new SendActivationEmailPayload("邮件已发送");
    }

    @MutationMapping
    public ActivateUserPayload activateUser(@Valid @Argument ActivateUserInput input) {
        userService.activate(input);
        return new ActivateUserPayload("账号激活成功");
    }

    /*
     * TODO 控制发送频率
     */
    @MutationMapping
    public SendPasswordResetEmailPayload sendPasswordResetEmail(@Valid @Argument SendPasswordResetEmailInput input) {
        userService.sendPasswordResetEmail(input);
        return new SendPasswordResetEmailPayload("邮件已发送");
    }

    @MutationMapping
    public ResetPasswordPayload resetPassword(@Valid @Argument ResetPasswordInput input) {
        userService.resetPassword(input);
        return new ResetPasswordPayload("密码已修改");
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateNamePayload updateUser(@Valid @Argument UpdateUserInput input) {
        UserEntity userEntity = userService.update(input);
        return new UpdateNamePayload(userEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdatePasswordPayload updatePassword(@Valid @Argument UpdatePasswordInput input) {
        UserEntity userEntity = userService.updatePassword(input);
        return new UpdatePasswordPayload(userEntity);
    }
}
