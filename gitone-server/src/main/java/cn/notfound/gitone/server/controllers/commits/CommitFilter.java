package cn.notfound.gitone.server.controllers.commits;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class CommitFilter {

    @NotEmpty
    private String revision;

    private String query;

    private String path;
}
