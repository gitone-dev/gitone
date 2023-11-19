package cn.notfound.gitone.server.controllers.branches.payloads;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.models.git.GitBranch;
import cn.notfound.gitone.server.models.git.GitRepository;

public record DeleteBranchPayload(GitBranch branch) {

    public String getRepositoryId() {
        return Relay.toGlobalId(GitRepository.TYPE, branch.getGitRepository().getId());
    }
}
