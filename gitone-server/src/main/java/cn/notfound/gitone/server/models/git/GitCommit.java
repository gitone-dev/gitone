package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.entities.Node;
import org.eclipse.jgit.lib.ObjectId;

public class GitCommit implements Node<String> {

    public static final String TYPE = "Commit";

    private final GitRepository gitRepository;

    private final ObjectId objectId;

    public GitCommit(GitRepository gitRepository, ObjectId objectId) {
        this.gitRepository = gitRepository;
        this.objectId = objectId;
    }

    @Override
    public String getId() {
        return String.format("%s:%s", gitRepository.getId(), objectId.name());
    }

    public String getSha() {
        return objectId.name();
    }
}
