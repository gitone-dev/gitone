package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.entities.Node;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.lib.FileMode;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.treewalk.filter.TreeFilter;
import org.eclipse.jgit.util.io.NullOutputStream;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class GitDiff implements Node<String> {

    private final GitRepository gitRepository;

    private final DiffEntry entry;

    private String diff;

    public GitDiff(GitRepository gitRepository, DiffEntry entry) {
        this.gitRepository = gitRepository;
        this.entry = entry;
    }

    @Override
    public String getId() {
        return String.format("%s:%s:%s", gitRepository.getId(), getOldSha(), getNewSha());
    }

    public DiffEntry.ChangeType getChangeType() {
        return entry.getChangeType();
    }

    public String getOldPath() {
        return entry.getOldPath();
    }

    public String getNewPath() {
        return entry.getNewPath();
    }

    public String getOldSha() {
        return entry.getOldId().name();
    }

    public String getNewSha() {
        return entry.getNewId().name();
    }

    public FileMode getOldMode() {
        return entry.getOldMode();
    }

    public FileMode getNewMode() {
        return entry.getNewMode();
    }

    public String getDiff() throws IOException {
        if (diff == null) {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            try (DiffFormatter formatter = new DiffFormatter(outputStream)) {
                formatter.setRepository(gitRepository.repository);
                formatter.format(entry);
                this.diff = outputStream.toString();
            }
        }
        return diff;
    }

    public static List<GitDiff> between(
            GitRepository gitRepository,
            GitCommit oldCommit,
            GitCommit newCommit) throws IOException {
        RevTree oldTree = null;
        if (oldCommit != null) {
            oldTree = oldCommit.revCommit.getTree();;
        }
        RevTree newTree = newCommit.revCommit.getTree();
        try (DiffFormatter formatter = new DiffFormatter(NullOutputStream.INSTANCE)) {
            formatter.setRepository(gitRepository.repository);
            formatter.setPathFilter(TreeFilter.ALL);

            List<DiffEntry> entries = formatter.scan(oldTree, newTree);
            return entries.stream().map(entry -> new GitDiff(gitRepository, entry)).collect(Collectors.toList());
        }
    }
}
