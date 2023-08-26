package cn.notfound.gitone.server.controllers.users.inputs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Assert;

@Data
public class UpdatePasswordInput {

    @NotBlank
    private String oldPassword;

    @NotBlank @Size(min = 6, max = 32)
    private String password;

    @NotBlank @Size(min = 6, max = 32)
    private String passwordConfirmation;

    public void validate(PasswordEncoder passwordEncoder, String password) {
        Assert.isTrue(this.password.equals(passwordConfirmation), "两次输入的新密码不匹配");
        Assert.isTrue(passwordEncoder.matches(oldPassword, password), "旧密码错误");
    }
}
