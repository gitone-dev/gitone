package dev.gitone.server.controllers.branches.inputs;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class DeleteBranchInput {

    @NotEmpty
    private String fullPath;
    @NotEmpty
    private String name;
}
