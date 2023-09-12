package cn.notfound.gitone.server.controllers.members.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.util.Assert;

@Data
public class CreateMemberInput {

    @NotBlank
    private String namespaceId;
    @NotBlank
    private String userId;
    @NotNull
    private Access access;

    public Integer namespaceId() {
        Relay.ResolvedGlobalId globalId = Relay.fromGlobalId(namespaceId);
        Assert.isTrue(GroupEntity.TYPE.equals(globalId.type()), "id 格式错误");
        return globalId.id();
    }

    public Integer userId() {
        return Relay.fromGlobalId(UserEntity.TYPE, userId).id();
    }

    public MemberEntity entity(Integer createdById) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setNamespaceId(namespaceId());
        memberEntity.setUserId(userId());
        memberEntity.setAccess(access);
        memberEntity.setCreatedById(createdById);
        return memberEntity;
    }
}
