package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class UserOrder implements Order {

    private UserOrderField field = UserOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
