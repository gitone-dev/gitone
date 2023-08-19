package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.CustomPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class UserPage extends CustomPage<UserCursor> {

    private final UserOrder order;

    public UserPage(Integer first, String after, UserOrder orderBy) {
        super(first, after);
        this.order = orderBy;
    }

    @Override
    public UserCursor getBefore() {
        return super.getBefore();
    }

    @Override
    public UserCursor getAfter() {
        return super.getAfter();
    }

    public UserOrder getOrder() {
        return order;
    }

    @Override
    public UserPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected UserCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }
}
