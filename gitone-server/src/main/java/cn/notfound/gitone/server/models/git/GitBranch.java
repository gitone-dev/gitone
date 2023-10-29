package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.entities.Node;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.util.sha1.SHA1;

public class GitBranch implements Node<String> {

    public static final String TYPE = "Branch";

    private final GitRepository gitRepository;

    private final Ref ref;

    public GitBranch(GitRepository gitRepository, Ref ref) {
        this.gitRepository = gitRepository;
        this.ref = ref;
    }

    @Override
    public String getId() {
        SHA1 sha1 = SHA1.newInstance();
        sha1.update(ref.getName().getBytes());
        return String.format("%s:%s", gitRepository.getId(), sha1.toObjectId().getName());
    }

    public String getName() {
        return ref.getName();
    }

    public GitCommit getCommit() {
        return new GitCommit(gitRepository, ref.getObjectId());
    }
}
