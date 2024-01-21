package dev.gitone.server.controllers.branches;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class BranchOrder implements Order {

    private BranchOrderField field = BranchOrderField.NAME;

    private OrderDirection direction = OrderDirection.ASC;
}
