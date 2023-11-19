package cn.notfound.gitone.server.controllers.tags.payloads;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.models.git.GitRepository;
import cn.notfound.gitone.server.models.git.GitTag;

public record CreateTagPayload(GitTag tag) {

    public String getRepositoryId() {
        return Relay.toGlobalId(GitRepository.TYPE, tag.getGitRepository().getId());
    }
}
