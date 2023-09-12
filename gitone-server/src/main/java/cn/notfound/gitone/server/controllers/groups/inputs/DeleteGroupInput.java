package cn.notfound.gitone.server.controllers.groups.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.GroupEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteGroupInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(GroupEntity.TYPE, id).id();
    }
}
