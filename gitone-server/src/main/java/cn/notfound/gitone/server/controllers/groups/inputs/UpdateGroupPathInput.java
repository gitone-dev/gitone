package cn.notfound.gitone.server.controllers.groups.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.GroupEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class UpdateGroupPathInput {

    @NotBlank
    private String id;

    @NotBlank @Pattern(regexp = "^[A-Za-z][A-Za-z0-9]{1,63}$")
    private String path;

    public int id() {
        return Relay.fromGlobalId(GroupEntity.TYPE, id).id();
    }
}
