package dev.gitone.server.controllers.users.inputs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendActivationEmailInput {

    @NotBlank @Email
    private String email;
}
