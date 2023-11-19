package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.entities.Node;
import lombok.Getter;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.util.sha1.SHA1;

public abstract class GitRef implements Node<String> {

    @Getter
    protected final GitRepository gitRepository;

    protected final Ref ref;

    private final GitCommit gitCommit;

    public GitRef(GitRepository gitRepository, Ref ref, RevCommit revCommit) {
        this.gitRepository = gitRepository;
        this.ref = ref;
        this.gitCommit = new GitCommit(gitRepository, revCommit);
    }

    @Override
    public String getId() {
        SHA1 sha1 = SHA1.newInstance();
        sha1.update(getFullName().getBytes());
        return String.format("%s:%s", gitRepository.getId(), sha1.toObjectId().getName());
    }

    public String getFullName() {
        return ref.getName();
    }

    public GitCommit getCommit() {
        return gitCommit;
    }
}
