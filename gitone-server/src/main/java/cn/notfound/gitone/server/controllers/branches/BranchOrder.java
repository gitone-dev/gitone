package cn.notfound.gitone.server.controllers.branches;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class BranchOrder implements Order {

    private BranchOrderField field = BranchOrderField.NAME;

    private OrderDirection direction = OrderDirection.ASC;
}
