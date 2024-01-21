package dev.gitone.server.controllers.users.inputs;

import dev.gitone.server.entities.UserDetailEntity;
import dev.gitone.server.entities.UserEntity;
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

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9\\-]{1,63}$")
    private String username;

    @NotBlank @Size(min = 6, max = 32)
    private String password;

    public UserEntity user() {
        UserEntity userEntity = new UserEntity();
        userEntity.setName(name);
        userEntity.setFullName(name);
        userEntity.setPath(username);
        userEntity.setFullPath(username);
        return userEntity;
    }

    public UserDetailEntity userDetail(PasswordEncoder passwordEncoder) {
        UserDetailEntity userDetail = new UserDetailEntity();
        userDetail.setEmail(email);
        userDetail.setPassword(passwordEncoder.encode(password));
        return userDetail;
    }
}
