package dev.gitone.server.controllers.tags;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class TagOrder implements Order {

    private TagOrderField field = TagOrderField.NAME;

    private OrderDirection direction = OrderDirection.ASC;
}
