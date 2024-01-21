package dev.gitone.server.controllers.tags.payloads;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.models.git.GitTag;

public record DeleteTagPayload(GitTag tag) {

    public String getRepositoryId() {
        return Relay.toGlobalId(GitRepository.TYPE, tag.getGitRepository().getId());
    }
}
