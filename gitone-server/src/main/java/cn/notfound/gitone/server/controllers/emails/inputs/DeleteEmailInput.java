package cn.notfound.gitone.server.controllers.emails.inputs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteEmailInput {

    @NotBlank @Email
    private String email;
}
