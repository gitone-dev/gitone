package cn.notfound.gitone.server.controllers.members.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.MemberEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateMemberInput {

    @NotBlank
    private String id;

    @NotNull
    private Access access;

    public Integer id() {
        return Relay.fromGlobalId(MemberEntity.TYPE, id).id();
    }
}
