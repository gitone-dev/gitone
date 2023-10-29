package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.entities.Node;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.util.sha1.SHA1;

public class GitTag implements Node<String> {

    public static final String TYPE = "Tag";

    private final GitRepository gitRepository;

    private final Ref ref;

    public GitTag(GitRepository gitRepository, Ref ref) {
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
}
