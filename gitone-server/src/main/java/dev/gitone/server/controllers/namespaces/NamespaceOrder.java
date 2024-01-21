package dev.gitone.server.controllers.namespaces;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class NamespaceOrder implements Order {

    private NamespaceOrderField field = NamespaceOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.DESC;
}
