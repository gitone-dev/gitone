package cn.notfound.gitone.server.controllers.projects.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateProjectVisibilityInput {

    @NotBlank
    private String id;

    @NotNull
    private Visibility visibility;

    public int id() {
        return Relay.fromGlobalId(ProjectEntity.TYPE, id).id();
    }

    public boolean toPublic(ProjectEntity entity) {
        return entity.isPrivate() && Visibility.PUBLIC.equals(visibility);
    }
}
