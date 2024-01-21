package dev.gitone.server.controllers.tags.inputs;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateTagInput {

    @NotEmpty
    private String fullPath;
    @NotEmpty
    private String revision;
    @NotEmpty
    private String name;

    private String message;
}
