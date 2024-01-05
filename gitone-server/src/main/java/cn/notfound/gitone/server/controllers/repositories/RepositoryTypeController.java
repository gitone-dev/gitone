package cn.notfound.gitone.server.controllers.repositories;

import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.NodeConnection;
import cn.notfound.gitone.server.controllers.NodePage;
import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.controllers.branches.BranchConnection;
import cn.notfound.gitone.server.controllers.branches.BranchFilter;
import cn.notfound.gitone.server.controllers.branches.BranchOrder;
import cn.notfound.gitone.server.controllers.branches.BranchPage;
import cn.notfound.gitone.server.controllers.commits.CommitConnection;
import cn.notfound.gitone.server.controllers.commits.CommitFilter;
import cn.notfound.gitone.server.controllers.commits.CommitPage;
import cn.notfound.gitone.server.controllers.diffs.DiffConnection;
import cn.notfound.gitone.server.controllers.diffs.DiffPage;
import cn.notfound.gitone.server.controllers.tags.TagConnection;
import cn.notfound.gitone.server.controllers.tags.TagFilter;
import cn.notfound.gitone.server.controllers.tags.TagOrder;
import cn.notfound.gitone.server.controllers.tags.TagPage;
import cn.notfound.gitone.server.models.git.*;
import cn.notfound.gitone.server.services.node.HighlightService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = GitRepository.TYPE)
public class RepositoryTypeController {

    private final HighlightService highlightService;

    @SchemaMapping
    public String id(GitRepository gitRepository) {
        return Relay.toGlobalId(GitRepository.TYPE, gitRepository.getId());
    }

    @SchemaMapping
    public RevisionPath revisionPath(
            GitRepository gitRepository,
            @Argument String revisionPath) throws IOException {

        return new RevisionPath(gitRepository, revisionPath).extract();
    }

    @SchemaMapping
    public GitCommit commit(
            GitRepository gitRepository,
            @Argument String revision) throws IOException {

        return GitCommit.find(gitRepository, revision);
    }

    @SchemaMapping
    public BranchConnection branches(
            GitRepository gitRepository,
            @Argument Integer first,
            @Argument String after,
            @Argument BranchFilter filterBy,
            @Argument BranchOrder orderBy) throws IOException {

        filterBy = Objects.requireNonNullElse(filterBy, new BranchFilter());
        BranchPage page = new BranchPage(first, after, orderBy).validate();
        List<GitBranch> branches = GitBranch.findAll(gitRepository, filterBy, page);
        return new BranchConnection(branches, page);
    }

    @SchemaMapping
    public TagConnection tags(
            GitRepository gitRepository,
            @Argument Integer first,
            @Argument String after,
            @Argument TagFilter filterBy,
            @Argument TagOrder orderBy) throws IOException {

        filterBy = Objects.requireNonNullElse(filterBy, new TagFilter());
        TagPage page = new TagPage(first, after, orderBy).validate();
        List<GitTag> tags = GitTag.findAll(gitRepository, filterBy, page);
        return new TagConnection(tags, page);
    }

    @SchemaMapping
    public CommitConnection commits(
            GitRepository gitRepository,
            @Argument Integer first,
            @Argument String after,
            @Argument CommitFilter filterBy) throws IOException {

        filterBy = Objects.requireNonNullElse(filterBy, new CommitFilter());
        CommitPage page = new CommitPage(first, after).validate();
        List<GitCommit> commits = GitCommit.findAll(gitRepository, filterBy, page);
        return new CommitConnection(commits, page);
    }

    @SchemaMapping
    public GitBlob blob(
            GitRepository gitRepository,
            @Argument String revision,
            @Argument String path) throws IOException {

        return GitBlob.find(gitRepository, revision, path);
    }

    @SchemaMapping
    public NodeConnection<String, GitTreeEntry> tree(
            GitRepository gitRepository,
            @Argument String revision,
            @Argument String path) throws IOException {

        GitTree gitTree = GitTree.find(gitRepository, revision, path);
        NotFound.notNull(gitTree, revision + path);
        List<GitTreeEntry> entries = gitTree.getEntries();
        Collections.sort(entries);
        NodePage<String> page = new NodePage<>(entries.size());
        return new NodeConnection<>(entries, page);
    }

    @SchemaMapping
    public DiffConnection diffs(
            GitRepository gitRepository,
            @Argument String oldRevision,
            @Argument String newRevision,
            @Argument Integer first,
            @Argument String after
    ) throws IOException {
        DiffPage page = new DiffPage(first, after);

        GitCommit oldCommit = GitCommit.find(gitRepository, oldRevision);
        GitCommit newCommit = GitCommit.find(gitRepository, newRevision);
        List<GitDiff> diffs = GitDiff.between(gitRepository, oldCommit, newCommit);
        if (page.getAfter() != null) {
            String id = page.getAfter().getId();
            if (id != null) {
                for (int i = 0; i < diffs.size(); i++) {
                    if (!id.equals(diffs.get(i).getId())) continue;
                    diffs = diffs.subList(i + 1, diffs.size());
                    break;
                }
            }
        }
        if (page.getFirst() != null && page.getFirst() < diffs.size()) {
            diffs = diffs.subList(0, page.getFirst() + 1);
        }
        return new DiffConnection(diffs, page);
    }
}
