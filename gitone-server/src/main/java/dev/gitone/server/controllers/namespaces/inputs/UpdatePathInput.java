package dev.gitone.server.controllers.namespaces.inputs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdatePathInput {

    @NotBlank
    private String fullPath;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9\\-]{1,63}$")
    private String path;
}
