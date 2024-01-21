package dev.gitone.server.controllers.groups;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class GroupOrder implements Order {

    private GroupOrderField field = GroupOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.DESC;
}
