package dev.gitone.server.controllers.branches.payloads;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.models.git.GitBranch;
import dev.gitone.server.models.git.GitRepository;

public record CreateBranchPayload(GitBranch branch) {

    public String getRepositoryId() {
        return Relay.toGlobalId(GitRepository.TYPE, branch.getGitRepository().getId());
    }
}
