package dev.gitone.server.controllers.members;

import dev.gitone.server.CustomCursor;
import dev.gitone.server.OrderPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class MemberPage extends OrderPage<MemberCursor> {

    private final MemberOrder order;

    public MemberPage(Integer first) {
        super(first, null);
        this.order = new MemberOrder();
    }

    public MemberPage(Integer first, String after, MemberOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public MemberPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected MemberCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() { });
    }

    @Override
    public MemberOrder getOrder() {
        return order;
    }
}
