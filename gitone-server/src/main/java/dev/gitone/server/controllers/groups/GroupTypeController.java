package dev.gitone.server.controllers.groups;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.GroupEntity;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = GroupEntity.TYPE)
public class GroupTypeController {

    @SchemaMapping
    public String id(GroupEntity groupEntity) {
        return Relay.toGlobalId(GroupEntity.TYPE, groupEntity.getId());
    }

    @SchemaMapping
    public String avatarUrl(GroupEntity groupEntity) {
        return String.format("/avatars/n/%d", groupEntity.getId());
    }
}
