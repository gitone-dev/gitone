package dev.gitone.server.controllers.users;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class UserOrder implements Order {

    private UserOrderField field = UserOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
