package cn.notfound.gitone.server.controllers.users.inputs;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UpdateUserInput {

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotNull @Size(max = 255)
    private String description;

    @NotNull @Size(max = 255)
    private String location;

    @NotNull @Size(max = 255)
    private String websiteUrl;
}
