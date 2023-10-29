package cn.notfound.gitone.server.controllers.repositories;

import cn.notfound.gitone.server.controllers.NodeConnection;
import cn.notfound.gitone.server.controllers.NodePage;
import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.models.git.GitBranch;
import cn.notfound.gitone.server.models.git.GitRepository;
import cn.notfound.gitone.server.models.git.GitTag;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.List;

@Controller
@SchemaMapping(typeName = GitRepository.TYPE)
public class RepositoryTypeController {

    @SchemaMapping
    public String id(GitRepository gitRepository) {
        return Relay.toGlobalId(GitRepository.TYPE, gitRepository.getId());
    }

    @SchemaMapping
    public NodeConnection<String, GitBranch> branches(GitRepository gitRepository) throws IOException {
        List<GitBranch> branches = gitRepository.getBranches();
        NodePage<String> page = new NodePage<>(branches.size());
        return new NodeConnection<>(branches, page);
    }

    @SchemaMapping
    public NodeConnection<String, GitTag> tags(GitRepository gitRepository) throws IOException {
        List<GitTag> tags = gitRepository.getTags();
        NodePage<String> page = new NodePage<>(tags.size());
        return new NodeConnection<>(tags, page);
    }
}
