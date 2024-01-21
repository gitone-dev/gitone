package dev.gitone.server.models.git;

import dev.gitone.server.entities.Node;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.lib.FileMode;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.treewalk.filter.TreeFilter;
import org.eclipse.jgit.util.io.NullOutputStream;
import org.eclipse.jgit.util.sha1.SHA1;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class GitDiff implements Node<String> {

    public static final String TYPE = "Diff";

    private final GitRepository gitRepository;

    private final DiffEntry entry;

    private String diff;

    private byte[] oldContent;

    private byte[] newContent;

    private List<GitDiffLine> diffLines;

    public GitDiff(GitRepository gitRepository, DiffEntry entry) {
        this.gitRepository = gitRepository;
        this.entry = entry;
    }

    @Override
    public String getId() {
        SHA1 sha1 = SHA1.newInstance();
        sha1.update(getOldSha().getBytes());
        sha1.update(getNewSha().getBytes());
        sha1.update(getOldPath().getBytes());
        sha1.update(getNewPath().getBytes());
        return String.format("%s:%s", gitRepository.getId(), sha1.toObjectId().getName());
    }

    public DiffEntry.ChangeType getType() {
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

    public byte[] getOldContent() throws IOException {
        if (oldContent != null) return oldContent;

        getDiffLines();
        return oldContent;
    }

    public byte[] getNewContent() throws IOException {
        if (newContent != null) return newContent;

        getDiffLines();
        return newContent;
    }

    public String getDiff() throws IOException {
        if (diff != null) return diff;
        getDiffLines();
        return diff;
    }

    public List<GitDiffLine> getDiffLines() throws IOException {
        if (diffLines != null) return diffLines;

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (GitDiffFormatter formatter = new GitDiffFormatter(outputStream)) {
            formatter.setRepository(gitRepository.repository);
            formatter.format(entry);
            this.oldContent = formatter.getOldContent();
            this.newContent = formatter.getNewContent();
            this.diff = outputStream.toString();
            this.diffLines = formatter.getDiffLines();
        }
        return diffLines;
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
