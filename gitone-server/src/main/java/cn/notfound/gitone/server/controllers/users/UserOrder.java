package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class UserOrder {

    private UserOrderField field = UserOrderField.USERNAME;

    private OrderDirection direction = OrderDirection.ASC;
}
