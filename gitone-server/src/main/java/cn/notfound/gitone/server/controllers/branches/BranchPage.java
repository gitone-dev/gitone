package cn.notfound.gitone.server.controllers.branches;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.OrderPage;
import cn.notfound.gitone.server.models.git.GitBranch;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.Objects;

public class BranchPage extends OrderPage<BranchCursor> {

    private final BranchOrder order;

    private final BranchCursor minCursor;

    private final BranchCursor maxCursor;

    public BranchPage(Integer first, String after, BranchOrder order) {
        super(first, after);
        this.order = order;

        if (order.getDirection().equals(OrderDirection.DESC)) {
            minCursor = Objects.requireNonNullElse(getBefore(), new BranchCursor());
            maxCursor = Objects.requireNonNullElse(getAfter(), new BranchCursor());
        } else {
            minCursor = Objects.requireNonNullElse(getAfter(), new BranchCursor());
            maxCursor = Objects.requireNonNullElse(getBefore(), new BranchCursor());
        }
    }

    @Override
    public BranchPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected BranchCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public BranchOrder getOrder() {
        return order;
    }

    public boolean isBetween(GitBranch gitBranch) {
        return isName(gitBranch) && isAuthorDate(gitBranch) && isCommitterDate(gitBranch);
    }

    private boolean isName(GitBranch gitBranch) {
        boolean result = true;

        if (minCursor.getName() != null)
            result = gitBranch.getName().compareTo(minCursor.getName()) > 0;

        if (result && maxCursor.getName() != null)
            result = gitBranch.getName().compareTo(maxCursor.getName()) < 0;

        return result;
    }

    private boolean isAuthorDate(GitBranch gitBranch) {
        boolean result = true;

        if (minCursor.getAuthorDate() != null)
            result = gitBranch.getCommit().getAuthor().getDate().isAfter(minCursor.getAuthorDate());

        if (result && maxCursor.getAuthorDate() != null)
            result = gitBranch.getCommit().getCommitter().getDate().isBefore(maxCursor.getAuthorDate());

        return result;
    }

    private boolean isCommitterDate(GitBranch gitBranch) {
        boolean result = true;

        if (minCursor.getCommitterDate() != null)
            result = gitBranch.getCommit().getCommitter().getDate().isAfter(minCursor.getCommitterDate());

        if (result && maxCursor.getCommitterDate() != null)
            result = gitBranch.getCommit().getCommitter().getDate().isBefore(maxCursor.getCommitterDate());

        return result;
    }
}
