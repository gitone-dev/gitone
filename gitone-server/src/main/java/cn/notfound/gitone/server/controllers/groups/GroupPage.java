package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.OrderPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class GroupPage extends OrderPage<GroupCursor> {

    private final GroupOrder order;

    public GroupPage(Integer first) {
        super(first, null);
        this.order = new GroupOrder();
    }

    public GroupPage(Integer first, String after, GroupOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public GroupPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected GroupCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public GroupOrder getOrder() {
        return order;
    }
}
