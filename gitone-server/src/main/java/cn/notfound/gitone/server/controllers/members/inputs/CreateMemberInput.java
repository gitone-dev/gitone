package cn.notfound.gitone.server.controllers.members.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.util.Assert;

import java.util.List;

@Data
public class CreateMemberInput {

    public static final List<String> types = List.of(ProjectEntity.TYPE, GroupEntity.TYPE);

    @NotBlank
    private String namespaceId;
    @NotBlank
    private String userId;
    @NotNull
    private Access access;

    public Integer namespaceId() {
        Relay.ResolvedGlobalId globalId = Relay.fromGlobalId(namespaceId);
        Assert.isTrue(types.contains(globalId.type()), "命名空间标识格式错误");
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
