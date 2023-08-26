package cn.notfound.gitone.server.controllers.users.inputs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateUsernameInput {

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String username;
}
