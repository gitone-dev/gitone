package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.controllers.commits.CommitFilter;
import cn.notfound.gitone.server.controllers.commits.CommitPage;
import cn.notfound.gitone.server.entities.Node;
import org.apache.logging.log4j.util.Strings;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.LogCommand;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.lib.*;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;

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

    // FIXME: 2023/11/2
    public static List<GitCommit> findAll(GitRepository gitRepository, CommitFilter filterBy, CommitPage page) throws IOException  {
        List<GitCommit> commits = new ArrayList<>();
        Repository repository = gitRepository.repository;

        GitCommit gitCommit;
        if (page.getAfter() != null && page.getAfter().getReversion() != null) {
            gitCommit = find(gitRepository, page.getAfter().getReversion());
        } else {
            gitCommit = find(gitRepository, filterBy.getRevision());
        }
        if (gitCommit == null) return commits;

        try (Git git = new Git(repository)) {
            LogCommand command = git.log();
            command.add(gitCommit.revCommit);
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
}