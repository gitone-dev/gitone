package cn.notfound.gitone.server.controllers.users.inputs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ActivateUserInput {

    @NotBlank @Pattern(regexp = "[0-9a-fA-F]{32}")
    private String token;
}
