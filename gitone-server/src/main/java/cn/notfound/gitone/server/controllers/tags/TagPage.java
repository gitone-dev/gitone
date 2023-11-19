package cn.notfound.gitone.server.controllers.tags;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.OrderPage;
import cn.notfound.gitone.server.models.git.GitTag;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.Objects;

public class TagPage extends OrderPage<TagCursor> {

    private final TagOrder order;

    private final TagCursor minCursor;

    private final TagCursor maxCursor;

    public TagPage(Integer first, String after, TagOrder order) {
        super(first, after);
        this.order = order;

        if (order.getDirection().equals(OrderDirection.DESC)) {
            minCursor = Objects.requireNonNullElse(getBefore(), new TagCursor());
            maxCursor = Objects.requireNonNullElse(getAfter(), new TagCursor());
        } else {
            minCursor = Objects.requireNonNullElse(getAfter(), new TagCursor());
            maxCursor = Objects.requireNonNullElse(getBefore(), new TagCursor());
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
        return isName(gitTag);
    }

    private boolean isName(GitTag gitTag) {
        boolean result = true;

        if (minCursor.getName() != null)
            result = gitTag.getName().compareTo(minCursor.getName()) > 0;

        if (result && maxCursor.getName() != null)
            result = gitTag.getName().compareTo(maxCursor.getName()) < 0;

        return result;
    }
}
