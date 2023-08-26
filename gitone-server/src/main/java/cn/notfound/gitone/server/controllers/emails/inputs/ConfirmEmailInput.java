package cn.notfound.gitone.server.controllers.emails.inputs;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ConfirmEmailInput {

    @NotBlank
    private String token;
}
