package dev.gitone.server.controllers.sshKeys;

import dev.gitone.server.CustomCursor;
import dev.gitone.server.OrderPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class SshKeyPage extends OrderPage<SshKeyCursor> {

    private final SshKeyOrder order;

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
