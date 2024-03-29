package dev.gitone.server.controllers.groups.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import dev.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateGroupInput {

    private String parentId;

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String path;

    @NotNull
    private Visibility visibility;

    @NotNull @Size(max = 255)
    private String description;

    private int parentId() {
        if (parentId == null || parentId.isBlank()) return 0;

        return Relay.fromGlobalId(GroupEntity.TYPE, parentId).id();
    }

    public GroupEntity entity() {
        GroupEntity entity = new GroupEntity();
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
