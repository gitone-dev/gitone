package cn.notfound.gitone.server.controllers.projects.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.ProjectEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateProjectPathInput {

    @NotBlank
    private String id;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String path;

    public int id() {
        return Relay.fromGlobalId(ProjectEntity.TYPE, id).id();
    }
}
