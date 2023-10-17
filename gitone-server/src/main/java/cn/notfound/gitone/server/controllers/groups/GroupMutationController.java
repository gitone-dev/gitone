package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.controllers.groups.inputs.CreateGroupInput;
import cn.notfound.gitone.server.controllers.groups.inputs.DeleteGroupInput;
import cn.notfound.gitone.server.controllers.groups.inputs.UpdateGroupInput;
import cn.notfound.gitone.server.controllers.groups.payloads.CreateGroupPayload;
import cn.notfound.gitone.server.controllers.groups.payloads.DeleteGroupPayload;
import cn.notfound.gitone.server.controllers.groups.payloads.UpdateGroupPayload;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.services.GroupService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class GroupMutationController {

    private GroupService groupService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateGroupPayload createGroup(@Valid @Argument CreateGroupInput input) {
        GroupEntity groupEntity = groupService.create(input);
        return new CreateGroupPayload(groupEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteGroupPayload deleteGroup(@Valid @Argument DeleteGroupInput input) {
        GroupEntity groupEntity = groupService.delete(input);
        return new DeleteGroupPayload(groupEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateGroupPayload updateGroup(@Valid @Argument UpdateGroupInput input) {
        GroupEntity groupEntity = groupService.update(input);
        return new UpdateGroupPayload(groupEntity);
    }
}
