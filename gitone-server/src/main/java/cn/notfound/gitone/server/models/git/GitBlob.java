package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.entities.Node;
import lombok.Getter;
import org.eclipse.jgit.lib.FileMode;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.ObjectLoader;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.treewalk.filter.PathFilter;
import org.eclipse.jgit.util.sha1.SHA1;

import java.io.IOException;

public class GitBlob implements Node<String> {

    public static final String TYPE = "Blob";

    private final GitRepository gitRepository;

    private final GitCommit gitCommit;

    @Getter
    private final String path;

    private final ObjectId sha;

    private final FileMode mode;

    private Long size;

    private byte[] data;

    public GitBlob(GitRepository gitRepository, GitCommit gitCommit, String path, ObjectId sha, FileMode mode) {
        this.gitRepository = gitRepository;
        this.gitCommit = gitCommit;
        this.path = path;
        this.sha = sha;
        this.mode = mode;
    }

    @Override
    public String getId() {
        SHA1 sha1 = SHA1.newInstance();
        sha1.update(path.getBytes());
        return String.format("%s:%s:%s", gitRepository.getId(), gitCommit.getSha(), sha1.toObjectId().getName());
    }

    public String getSha() {
        return sha.name();
    }

    public String getName() {
        return Util.filename(path);
    }

    public int getMode() {
        return mode.getBits();
    }

    public byte[] getData() throws IOException {
        if (data == null)
            loadData();
        return data;
    }

    public Long getSize() throws IOException {
        if (size == null)
            loadData();
        return size;
    }

    private void loadData() throws IOException {
        if (isFile()) {
            ObjectLoader objectLoader = gitRepository.repository.open(sha);
            this.size = objectLoader.getSize();
            this.data = objectLoader.getBytes();
        } else {
            this.size = 0L;
            this.data = new byte[0];
        }
    }

    private boolean isFile() {
        return (mode.getBits() & FileMode.TYPE_MASK) == FileMode.TYPE_FILE;
    }

    public static GitBlob find(GitRepository gitRepository, String revision, String path) throws IOException {
        GitCommit gitCommit = GitCommit.find(gitRepository, revision);
        NotFound.notNull(gitCommit, revision);

        try (TreeWalk walk = new TreeWalk(gitRepository.repository)) {
            int nth = walk.addTree(gitCommit.revCommit.getTree());
            walk.setRecursive(true);
            walk.setFilter(PathFilter.create(path));

            NotFound.isTrue(walk.next(), path);
            FileMode mode = walk.getFileMode(nth);
            ObjectId sha = walk.getObjectId(nth);
            return new GitBlob(gitRepository, gitCommit, path, sha, mode);
        }
    }
}
