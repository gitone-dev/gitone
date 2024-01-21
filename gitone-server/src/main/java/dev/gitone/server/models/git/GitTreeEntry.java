package dev.gitone.server.models.git;

import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.entities.Node;
import lombok.Getter;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.FileMode;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.treewalk.TreeWalk;
import org.eclipse.jgit.util.sha1.SHA1;

import java.io.IOException;
import java.util.Objects;

public class GitTreeEntry implements Node<String>, Comparable<GitTreeEntry> {

    public static final String TYPE = "TreeEntry";

    private final GitCommit gitCommit;

    @Getter
    private final String path;

    private final ObjectId objectId;

    private final FileMode fileMode;

    public GitTreeEntry(GitCommit gitCommit, String path, ObjectId objectId, FileMode fileMode) {
        this.gitCommit = gitCommit;
        this.path = Objects.requireNonNullElse(path, "");
        this.objectId = objectId;
        this.fileMode = fileMode;
    }

    @Override
    public String getId() {
        SHA1 sha1 = SHA1.newInstance();
        sha1.update(path.getBytes());
        return String.format("%s:%s", gitCommit.getId(), path);
    }

    public String getName() {
        return Util.filename(path);
    }

    public String getMode() {
        return fileMode.toString();
    }

    public String getType() {
        if (fileMode.equals(FileMode.TREE)) {
            return Constants.TYPE_TREE;
        } else if (fileMode.equals(FileMode.EXECUTABLE_FILE) || fileMode.equals(FileMode.REGULAR_FILE)) {
            return Constants.TYPE_BLOB;
        } else if (fileMode.equals(FileMode.GITLINK)) {
            return Constants.TYPE_COMMIT;
        } else if (fileMode.equals(FileMode.SYMLINK)) {
            return Constants.TYPE_BLOB;
        } else {
            throw new IllegalArgumentException("invalid entry type");
        }
    }

    @Override
    public int compareTo(GitTreeEntry gitTreeEntry) {
        return fileMode.getObjectType() - gitTreeEntry.fileMode.getObjectType();
    }

    public static GitTreeEntry find(GitRepository gitRepository, String revision, String path) throws IOException {
        GitCommit gitCommit = GitCommit.find(gitRepository, revision);
        NotFound.notNull(gitCommit, revision);

        RevTree rootTree = gitCommit.revCommit.getTree();
        ObjectId treeId = rootTree.getId();
        if (path.isEmpty()) {
            return new GitTreeEntry(gitCommit, path, treeId, FileMode.TREE);
        }

        try (TreeWalk walk = TreeWalk.forPath(gitRepository.repository, path, rootTree)) {
            return new GitTreeEntry(
                    gitCommit,
                    path,
                    walk.getObjectId(0),
                    walk.getFileMode(0)
            );
        }
    }
}
