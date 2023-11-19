package cn.notfound.gitone.server.controllers.tree;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.models.git.GitTreeEntry;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@SchemaMapping(typeName = GitTreeEntry.TYPE)
@Controller
public class TreeTypeController {

    @SchemaMapping
    public String id(GitTreeEntry gitTreeEntry) {
        return Relay.toGlobalId(GitTreeEntry.TYPE, gitTreeEntry.getId());
    }
}
