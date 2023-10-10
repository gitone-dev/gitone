package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.OrderPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class NamespacePage extends OrderPage<NamespaceCursor> {

    private final NamespaceOrder order;

    public NamespacePage(Integer first) {
        super(first, null);
        this.order = new NamespaceOrder();
    }

    public NamespacePage(Integer first, String after, NamespaceOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public NamespacePage validate() {
        super.validate();
        return this;
    }

    @Override
    protected NamespaceCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public NamespaceOrder getOrder() {
        return order;
    }
}
