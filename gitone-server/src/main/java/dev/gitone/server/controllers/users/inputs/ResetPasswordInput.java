package dev.gitone.server.controllers.users.inputs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordInput {

    @NotBlank
    public String token;

    @NotBlank @Size(min = 6, max = 32)
    public String password;
}
