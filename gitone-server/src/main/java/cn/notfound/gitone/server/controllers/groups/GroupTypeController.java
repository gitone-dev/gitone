package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.GroupEntity;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = GroupEntity.TYPE)
public class GroupTypeController {

    @SchemaMapping
    public String id(GroupEntity groupEntity) {
        return Relay.toGlobalId(GroupEntity.TYPE, groupEntity.getId());
    }
}
