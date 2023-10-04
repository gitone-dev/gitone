package cn.notfound.gitone.server.controllers.groups.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateGroupVisibilityInput {

    @NotBlank
    private String id;

    @NotNull
    private Visibility visibility;

    public int id() {
        return Relay.fromGlobalId(GroupEntity.TYPE, id).id();
    }

    public boolean toPublic(GroupEntity entity) {
        return entity.isPrivate() && Visibility.PUBLIC.equals(visibility);
    }

    public boolean toPrivate(GroupEntity entity) {
        return entity.isPublic() && Visibility.PRIVATE.equals(visibility);
    }
}
