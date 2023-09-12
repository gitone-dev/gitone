package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class MemberOrder implements Order {

    private MemberOrderField field = MemberOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
