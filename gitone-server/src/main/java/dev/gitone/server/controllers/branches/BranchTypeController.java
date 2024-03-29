package dev.gitone.server.controllers.branches;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.models.git.GitBranch;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@Controller
@SchemaMapping(typeName = GitBranch.TYPE)
public class BranchTypeController {

    @SchemaMapping
    public String id(GitBranch gitBranch) {
        return Relay.toGlobalId(GitBranch.TYPE, gitBranch.getId());
    }
}
