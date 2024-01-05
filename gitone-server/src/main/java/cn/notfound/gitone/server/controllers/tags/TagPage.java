package cn.notfound.gitone.server.controllers.tags;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.OrderPage;
import cn.notfound.gitone.server.models.git.GitTag;
import com.fasterxml.jackson.core.type.TypeReference;

public class TagPage extends OrderPage<TagCursor> {

    private final TagOrder order;

    private final TagCursor minCursor;

    private final TagCursor maxCursor;

    public TagPage(Integer first, String after, TagOrder order) {
        super(first, after);
        this.order = order;

        if (order.getDirection().equals(OrderDirection.DESC)) {
            minCursor = getBefore();
            maxCursor = getAfter();
        } else {
            minCursor = getAfter();
            maxCursor = getBefore();
        }
    }

    @Override
    public TagPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected TagCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public TagOrder getOrder() {
        return order;
    }

    public boolean isBetween(GitTag gitTag) {
        return isName(gitTag) && isAuthorDate(gitTag) && isCommitterDate(gitTag);
    }

    private boolean isName(GitTag gitTag) {
        boolean result = true;

        if (minCursor != null && minCursor.getName() != null)
            result = gitTag.getName().compareTo(minCursor.getName()) > 0;

        if (result && maxCursor != null && maxCursor.getName() != null)
            result = gitTag.getName().compareTo(maxCursor.getName()) < 0;

        return result;
    }

    private boolean isAuthorDate(GitTag gitTag) {
        boolean result = true;

        if (minCursor != null && minCursor.getAuthorDate() != null)
            result = gitTag.getCommit().getAuthor().getDate().isAfter(minCursor.getAuthorDate());

        if (result && maxCursor != null && maxCursor.getAuthorDate() != null)
            result = gitTag.getCommit().getCommitter().getDate().isBefore(maxCursor.getAuthorDate());

        return result;
    }

    private boolean isCommitterDate(GitTag gitTag) {
        boolean result = true;

        if (minCursor != null && minCursor.getCommitterDate() != null)
            result = gitTag.getCommit().getCommitter().getDate().isAfter(minCursor.getCommitterDate());

        if (result && maxCursor != null && maxCursor.getCommitterDate() != null)
            result = gitTag.getCommit().getCommitter().getDate().isBefore(maxCursor.getCommitterDate());

        return result;
    }
}
