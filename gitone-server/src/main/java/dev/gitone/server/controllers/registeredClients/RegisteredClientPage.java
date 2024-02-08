package dev.gitone.server.controllers.registeredClients;

import com.fasterxml.jackson.core.type.TypeReference;
import dev.gitone.server.CustomCursor;
import dev.gitone.server.OrderPage;

public class RegisteredClientPage extends OrderPage<RegisteredClientCursor> {

    private final RegisteredClientOrder order;

    public RegisteredClientPage(Integer first, String after, RegisteredClientOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public RegisteredClientPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected RegisteredClientCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public RegisteredClientOrder getOrder() {
        return order;
    }
}
