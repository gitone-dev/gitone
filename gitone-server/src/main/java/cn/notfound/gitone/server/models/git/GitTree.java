package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.config.exception.NotFound;
import org.eclipse.jgit.lib.FileMode;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.treewalk.TreeWalk;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class GitTree {

    final GitRepository gitRepository;

    final GitCommit gitCommit;

    final String path;

    final ObjectId sha;

    final FileMode mode;

    public GitTree(GitRepository gitRepository, GitCommit gitCommit, String path, ObjectId sha, FileMode mode) {
        this.gitRepository = gitRepository;
        this.gitCommit = gitCommit;
        this.path = path;
        this.sha = sha;
        this.mode = mode;
    }

    public static GitTree find(GitRepository gitRepository, String revision, String path) throws IOException {
        GitCommit gitCommit = GitCommit.find(gitRepository, revision);
        NotFound.notNull(gitCommit, revision);

        RevTree rootTree = gitCommit.revCommit.getTree();
        ObjectId treeId = rootTree.getId();
        if (path.isEmpty()) {
            return new GitTree(gitRepository, gitCommit, path, treeId, FileMode.TREE);
        }

        try (TreeWalk walk = TreeWalk.forPath(gitRepository.repository, path, rootTree)) {
            FileMode mode = walk.getFileMode(0);
            if (!FileMode.TREE.equals(mode))
                return null;

            ObjectId objectId = walk.getObjectId(0);
            return new GitTree(gitRepository, gitCommit, path, objectId, mode);
        }
    }

    public List<GitTreeEntry> getEntries() throws IOException {
        List<GitTreeEntry> entries = new ArrayList<>();

        try (TreeWalk walk = new TreeWalk(gitRepository.repository)){
            int nth = walk.addTree(sha);
            walk.setRecursive(false);

            while (walk.next()) {
                entries.add(new GitTreeEntry(
                        gitCommit,
                        Util.join(path, walk.getPathString()),
                        walk.getObjectId(nth),
                        walk.getFileMode(nth)
                ));
            }
        }
        return entries;
    }
}
