package dev.gitone.server.controllers.projects.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.util.Assert;

import java.util.Set;

@Data
public class CreateProjectInput {

    private static final Set<String> types = Set.of(UserEntity.TYPE, GroupEntity.TYPE);

    @NotBlank
    private String parentId;

    @NotBlank @Size(min = 1, max = 64)
    private String name;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9\\-]{1,63}$")
    private String path;

    @NotNull
    private Visibility visibility;

    @NotNull @Size(max = 255)
    private String description;

    public Integer parentId() {
        Relay.ResolvedGlobalId globalId = Relay.fromGlobalId(parentId);
        Assert.isTrue(types.contains(globalId.type()), "上级类型不正确");
        return globalId.id();
    }

    public ProjectEntity entity() {
        ProjectEntity entity = new ProjectEntity();
        entity.setName(name);
        entity.setPath(path);
        entity.setFullName(name);
        entity.setFullPath(path);
        entity.setVisibility(visibility);
        entity.setDescription(description);
        return entity;
    }
}
