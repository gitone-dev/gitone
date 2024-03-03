package dev.gitone.server.controllers.commits;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CommitFilter {

    private String left;
    @NotEmpty
    private String right;

    private String path;
}
