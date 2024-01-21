package dev.gitone.server.models.git;

import dev.gitone.server.OrderDirection;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.controllers.branches.BranchFilter;
import dev.gitone.server.controllers.branches.BranchOrderField;
import dev.gitone.server.controllers.branches.BranchPage;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.RefUpdate;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.springframework.util.Assert;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class GitBranch extends GitRef {

    public static final String TYPE = "Branch";

    public GitBranch(GitRepository gitRepository, Ref ref, RevCommit revCommit) {
        super(gitRepository, ref, revCommit);
    }

    public String getName() {
        return getFullName().substring(Constants.R_HEADS.length());
    }

    // FIXME: 2023/11/3 时间相同
    private static final Map<BranchOrderField, Map<OrderDirection, Comparator<GitBranch>>> sort = Map.of(
            BranchOrderField.NAME, Map.of(
                    OrderDirection.ASC, Comparator.comparing(GitBranch::getName),
                    OrderDirection.DESC, (b1, b2) -> b2.getName().compareTo(b1.getName())),
            BranchOrderField.AUTHOR_DATE, Map.of(
                    OrderDirection.ASC, Comparator.comparing(b -> b.getCommit().getAuthor().getDate()),
                    OrderDirection.DESC, (b1, b2) -> b2.getCommit().getAuthor().getDate().compareTo(b1.getCommit().getAuthor().getDate())),
            BranchOrderField.COMMITTER_DATE, Map.of(
                    OrderDirection.ASC, Comparator.comparing(b -> b.getCommit().getCommitter().getDate()),
                    OrderDirection.DESC, (b1, b2) -> b2.getCommit().getCommitter().getDate().compareTo(b1.getCommit().getCommitter().getDate()))
    );

    public static GitBranch find(GitRepository gitRepository, String name) throws IOException {
        Repository repository = gitRepository.repository;
        Ref ref = repository.getRefDatabase().exactRef(Constants.R_HEADS + name);
        if (ref == null) return null;

        try (RevWalk walk = new RevWalk(repository)) {
            RevCommit revCommit = walk.parseCommit(ref.getObjectId());
            return  new GitBranch(gitRepository, ref, revCommit);
        }
    }

    public static List<GitBranch> findAll(GitRepository gitRepository, BranchFilter filterBy, BranchPage page) throws IOException {
        List<GitBranch> branches = new ArrayList<>();

        Repository repository = gitRepository.repository;
        List<Ref> refs = repository.getRefDatabase().getRefsByPrefix(Constants.R_HEADS);
        try (RevWalk walk = new RevWalk(repository)) {
            for (Ref ref : refs) {
                if (filterBy.getQuery() != null && !ref.getName().contains(filterBy.getQuery())) continue;

                RevCommit revCommit = walk.parseCommit(ref.getObjectId());
                GitBranch gitBranch = new GitBranch(gitRepository, ref, revCommit);
                if (!page.isBetween(gitBranch)) continue;

                branches.add(gitBranch);
            }
        }
        branches.sort(sort.get(page.getOrder().getField()).get(page.getOrder().getDirection()));

        if (page.getFirst() != null) {
            return branches.subList(0, Math.min(page.getFirst() + 1, branches.size()));
        } else {
            return branches.subList(Math.max(0, branches.size() - page.getLast() - 1), branches.size());
        }
    }

    public static GitBranch create(GitRepository gitRepository, String name, String revision) throws IOException {
        Repository repository = gitRepository.repository;

        GitCommit gitCommit = GitCommit.find(gitRepository, revision);
        NotFound.notNull(gitCommit, revision);
        String refLogMessage = "branch: Created from commit " + gitCommit.getSha();

        RefUpdate refUpdate = repository.updateRef(Constants.R_HEADS + name);
        refUpdate.setNewObjectId(gitCommit.revCommit.getId());
        refUpdate.setRefLogMessage(refLogMessage, false);
        RefUpdate.Result result = refUpdate.update();
        Assert.isTrue(result == RefUpdate.Result.NEW, "创建失败");

        return GitBranch.find(gitRepository, name);
    }

    public static void delete(GitRepository gitRepository, GitBranch branch) throws IOException {
        Repository repository = gitRepository.repository;

        Ref ref = repository.findRef(Constants.HEAD).getLeaf();
        Assert.isTrue(!branch.getFullName().equals(ref.getName()), "无法删除默认分支");

        RefUpdate update = repository.updateRef(branch.getFullName());
        update.setRefLogMessage("branch deleted", false); //$NON-NLS-1$
        update.setForceUpdate(true);
        RefUpdate.Result result = update.delete();
        Assert.isTrue(result != RefUpdate.Result.REJECTED, "删除失败");
    }
}
