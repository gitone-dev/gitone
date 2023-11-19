package cn.notfound.gitone.server.controllers.tags.inputs;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class DeleteTagInput {

    @NotEmpty
    private String fullPath;
    @NotEmpty
    private String name;
}
