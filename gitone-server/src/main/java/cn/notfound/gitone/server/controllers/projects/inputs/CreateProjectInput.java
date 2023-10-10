package cn.notfound.gitone.server.controllers.projects.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateProjectInput {

    @NotBlank
    private String parentId;

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String path;

    @NotNull
    private Visibility visibility;

    @NotNull @Size(max = 255)
    private String description;

    private Integer parentId() {
        return Relay.fromGlobalId(parentId).id();
    }

    public String parentType() {
        return Relay.fromGlobalId(parentId).type();
    }

    public ProjectEntity entity() {
        ProjectEntity entity = new ProjectEntity();
        entity.setParentId(parentId());
        entity.setName(name);
        entity.setPath(path);
        entity.setFullName(name);
        entity.setFullPath(path);
        entity.setVisibility(visibility);
        entity.setDescription(description);
        return entity;
    }
}
