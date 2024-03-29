package dev.gitone.server.controllers.commits;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.models.git.GitCommit;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = GitCommit.TYPE)
public class CommitTypeController {

    @SchemaMapping
    public String id(GitCommit gitCommit) {
        return Relay.toGlobalId(GitCommit.TYPE, gitCommit.getId());
    }
}
