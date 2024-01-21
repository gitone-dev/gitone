package dev.gitone.server.controllers.tags;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.models.git.GitTag;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = GitTag.TYPE)
public class TagController {

    @SchemaMapping
    public String id(GitTag gitTag) {
        return Relay.toGlobalId(GitTag.TYPE, gitTag.getId());
    }
}
