package dev.gitone.server.controllers.members;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.controllers.members.inputs.CreateMemberInput;
import dev.gitone.server.controllers.members.inputs.DeleteMemberInput;
import dev.gitone.server.controllers.members.inputs.UpdateMemberInput;
import dev.gitone.server.controllers.members.payloads.CreateMemberPayload;
import dev.gitone.server.controllers.members.payloads.DeleteMemberPayload;
import dev.gitone.server.controllers.members.payloads.UpdateMemberPayload;
import dev.gitone.server.entities.MemberEntity;
import dev.gitone.server.entities.Role;
import dev.gitone.server.services.MemberService;
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
