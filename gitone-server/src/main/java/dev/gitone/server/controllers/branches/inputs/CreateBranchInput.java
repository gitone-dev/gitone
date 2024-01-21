package dev.gitone.server.controllers.branches.inputs;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CreateBranchInput {

    @NotEmpty
    private String fullPath;
    @NotEmpty
    private String revision;
    @NotEmpty
    private String name;
}
