package cn.notfound.gitone.server.controllers.users.inputs;

import cn.notfound.gitone.server.entities.UserEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
public class CreateUserInput {

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min = 2, max = 64)
    private String name;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String username;

    @NotBlank @Size(min = 6, max = 32)
    private String password;

    public UserEntity entity(PasswordEncoder passwordEncoder) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(email);
        userEntity.setName(name);
        userEntity.setUsername(username);
        userEntity.setPassword(passwordEncoder.encode(password));
        return userEntity;
    }
}
