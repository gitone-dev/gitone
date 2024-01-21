package dev.gitone.server.controllers.members;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class MemberOrder implements Order {

    private MemberOrderField field = MemberOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
