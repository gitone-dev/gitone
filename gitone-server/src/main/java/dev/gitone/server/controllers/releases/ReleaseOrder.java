package dev.gitone.server.controllers.releases;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class ReleaseOrder implements Order {

    private ReleaseOrderField field = ReleaseOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
