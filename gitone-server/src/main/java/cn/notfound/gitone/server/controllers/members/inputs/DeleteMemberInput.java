package cn.notfound.gitone.server.controllers.members.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.MemberEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteMemberInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(MemberEntity.TYPE, id).id();
    }
}
