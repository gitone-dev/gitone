package cn.notfound.gitone.server.controllers.sshKeys;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class SshKeyPage extends OrderPage<SshKeyCursor> {

    private final SshKeyOrder order;

    public SshKeyPage(Integer first) {
        super(first, null);
        this.order = new SshKeyOrder();
    }

    public SshKeyPage(Integer first, String after, SshKeyOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public SshKeyPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected SshKeyCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public SshKeyOrder getOrder() {
        return order;
    }
}
