package dev.gitone.server.controllers.releases;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.gitone.server.CustomCursor;
import dev.gitone.server.OrderPage;

public class ReleasePage extends OrderPage<ReleaseCursor> {

    private final ReleaseOrder order;

    public ReleasePage(Integer first, String after, ReleaseOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public ReleasePage validate() {
        super.validate();
        return this;
    }

    @Override
    protected ReleaseCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public ReleaseOrder getOrder() {
        return order;
    }
}
