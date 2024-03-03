package dev.gitone.server.models.git;

import dev.gitone.server.controllers.commits.CommitFilter;
import dev.gitone.server.controllers.commits.CommitPage;
import dev.gitone.server.entities.Node;
import org.apache.logging.log4j.util.Strings;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.LogCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.*;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.revwalk.filter.RevFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class GitCommit implements Node<String> {

    public static final String TYPE = "Commit";

    private final GitRepository gitRepository;

    final RevCommit revCommit;

    public GitCommit(GitRepository gitRepository, RevCommit revCommit) {
        this.gitRepository = gitRepository;
        this.revCommit = revCommit;
    }

    @Override
    public String getId() {
        return String.format("%s:%s", gitRepository.getId(), revCommit.name());
    }

    public String getSha() {
        return revCommit.name();
    }

    public List<String> getParentShas() {
        return Arrays.stream(revCommit.getParents())
                .map(AnyObjectId::name)
                .collect(Collectors.toList());
    }

    public GitUser getAuthor() {
        return new GitUser(revCommit.getAuthorIdent());
    }

    public GitUser getCommitter() {
        return new GitUser(revCommit.getCommitterIdent());
    }

    public String getShortMessage() {
        return revCommit.getShortMessage();
    }

    public String getFullMessage() {
        return revCommit.getFullMessage();
    }

    public static GitCommit find(GitRepository gitRepository, String revision) throws IOException {
        if (Strings.isEmpty(revision)) return null;

        Repository repository = gitRepository.repository;
        ObjectId objectId = null;

        Ref ref = repository.getRefDatabase().findRef(Constants.R_TAGS + revision);
        if (ref != null) {
            objectId = ref.getObjectId(); // FIXME: 2023/11/2
        } else {
            ref = repository.getRefDatabase().findRef(Constants.R_HEADS + revision);
            if (ref != null)
                objectId = ref.getObjectId();
        }

        if (objectId == null && Util.isObjectId(revision)) {
            objectId = ObjectId.fromString(revision);
        }

        if (objectId == null)
            return null;

        try (RevWalk walk = new RevWalk(repository)) {
            RevCommit revCommit = walk.parseCommit(objectId);
            return new GitCommit(gitRepository, revCommit);
        }
    }

    // FIXME: 2023/11/2 排序问题
    public static List<GitCommit> findAll(GitRepository gitRepository, CommitFilter filterBy, CommitPage page) throws IOException  {
        List<GitCommit> commits = new ArrayList<>();
        Repository repository = gitRepository.repository;

        GitCommit leftCommit = find(gitRepository, filterBy.getLeft());
        GitCommit rightCommit;
        if (page.getAfter() != null && page.getAfter().getRight() != null) {
            rightCommit = find(gitRepository, page.getAfter().getRight());
        } else {
            rightCommit = find(gitRepository, filterBy.getRight());
        }
        if (rightCommit == null) return commits;

        try (Git git = new Git(repository)) {
            LogCommand command = git.log();
            command.add(rightCommit.revCommit);
            if (leftCommit != null) command.not(leftCommit.revCommit);
            if (Strings.isNotEmpty(filterBy.getPath())) command.addPath(filterBy.getPath());
            if (page.getAfter() != null) command.setSkip(page.getAfter().getSkip());
            if (page.getFirst() != null) command.setMaxCount(page.getLimit());

            Iterable<RevCommit> iterable = command.call();
            for (RevCommit revCommit : iterable) {
                commits.add(new GitCommit(gitRepository, revCommit));
            }
        } catch (GitAPIException e) {
            throw new RuntimeException(e);
        }

        return commits;
    }

    public static GitCommit mergeBase(GitRepository gitRepository, GitCommit left, GitCommit right) throws IOException {
        if (left == null || right == null) return null;

        try (RevWalk walk = new RevWalk(gitRepository.repository)) {
            walk.markStart(walk.parseCommit(left.revCommit));
            walk.markStart(walk.parseCommit(right.revCommit));
            walk.setRevFilter(RevFilter.MERGE_BASE);

            RevCommit base = walk.next();
            if (base == null) return null;
            // TODO 多个 merge base
            return new GitCommit(gitRepository, base);
        }
    }
}
