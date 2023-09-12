package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class GroupOrder implements Order {

    private GroupOrderField field = GroupOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.DESC;
}
