package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class NamespaceOrder implements Order {

    private NamespaceOrderField field = NamespaceOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.DESC;
}
