package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.controllers.members.inputs.*;
import cn.notfound.gitone.server.controllers.members.payloads.*;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.services.MemberService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class MemberMutationController extends ViewerContext {

    private MemberService memberService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateMemberPayload createMember(@Valid @Argument CreateMemberInput input) {
        MemberEntity memberEntity = memberService.create(input);
        return new CreateMemberPayload(memberEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateMemberPayload updateMember(@Valid @Argument UpdateMemberInput input) {
        MemberEntity memberEntity = memberService.update(input);
        return new UpdateMemberPayload(memberEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteMemberPayload deleteMember(@Valid @Argument DeleteMemberInput input) {
        MemberEntity memberEntity = memberService.delete(input);
        return new DeleteMemberPayload(memberEntity);
    }
}
