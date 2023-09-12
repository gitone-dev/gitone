package cn.notfound.gitone.server.controllers.groups.inputs;

import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateGroupInput {

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String path;

    @NotNull
    private Visibility visibility;

    @NotNull @Size(max = 255)
    private String description;

    public GroupEntity entity() {
        GroupEntity entity = new GroupEntity();
        entity.setParentId(0);
        entity.setName(name);
        entity.setPath(path);
        entity.setFullName(name);
        entity.setFullPath(path);
        entity.setVisibility(visibility);
        entity.setDescription(description);
        return entity;
    }
}
