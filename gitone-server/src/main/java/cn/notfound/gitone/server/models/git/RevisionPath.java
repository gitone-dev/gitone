package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.entities.Node;
import lombok.Data;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.util.sha1.SHA1;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Data
public class RevisionPath implements Node<String> {

    private final GitRepository gitRepository;

    private final String revisionPath;

    private String type = Constants.TYPE_TREE; // FIXME: 2023/11/10 类型识别

    private String revision = "";

    private String path = "";


    public RevisionPath(GitRepository gitRepository, String revisionPath) {
        this.gitRepository = gitRepository;
        this.revisionPath = revisionPath;
    }

    @Override
    public String getId() {
        SHA1 sha1 = SHA1.newInstance();
        sha1.update(revisionPath.getBytes());
        return String.format("%s:%s", gitRepository.getId(), sha1.toObjectId().getName());
    }

    public RevisionPath extract() throws IOException {
        if (gitRepository.empty())
            return this;

        if (revisionPath == null || revisionPath.isEmpty()) {
            this.revision = gitRepository.defaultBranch().getName();
            return this;
        }

        if (!revisionPath.contains("/")) {
            this.revision = revisionPath;
            return this;
        }

        String[] pair = revisionPath.split("/", 2);
        if (Util.isObjectId(pair[0])) {
            this.revision = pair[0];
            this.path = pair[1];
            execute();
            return this;
        }

        String id = revisionPath.endsWith("/") ? revisionPath : revisionPath + "/";
        for (String refName : refNames()) {
            if (id.startsWith(refName + "/") && refName.length() > revision.length())
                this.revision = refName;
        }

        NotFound.isTrue(!revision.isEmpty(), "revision");
        if (id.length() > revision.length() + 1) {
            this.path = id.substring(revision.length() + 1, id.length() - 1);
        }
        execute();

        return this;
    }

    public void execute() throws IOException {
        if (path.isEmpty()) return;

        GitTreeEntry entry = GitTreeEntry.find(gitRepository, revision, path);
        if (entry.getType() != null) {
            this.type = entry.getType();
        }
    }

    private List<String> refNames() throws IOException {
        List<String> refNames = new ArrayList<>();
        Repository repository = gitRepository.repository;

        for (Ref ref : repository.getRefDatabase().getRefsByPrefix(Constants.R_TAGS))
            refNames.add(ref.getName().substring(Constants.R_TAGS.length()));
        for (Ref ref : repository.getRefDatabase().getRefsByPrefix(Constants.R_HEADS))
            refNames.add(ref.getName().substring(Constants.R_HEADS.length()));

        return refNames;
    }
}
