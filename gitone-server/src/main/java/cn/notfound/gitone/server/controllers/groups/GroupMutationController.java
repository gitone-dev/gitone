package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.controllers.groups.inputs.*;
import cn.notfound.gitone.server.controllers.groups.payloads.*;
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

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateGroupPathPayload updateGroupPath(@Valid @Argument UpdateGroupPathInput input) {
        GroupEntity groupEntity = groupService.updatePath(input);
        return new UpdateGroupPathPayload(groupEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateGroupVisibilityPayload updateGroupVisibility(@Valid @Argument UpdateGroupVisibilityInput input) {
        GroupEntity groupEntity = groupService.updateVisibility(input);
        return new UpdateGroupVisibilityPayload(groupEntity);
    }
}
