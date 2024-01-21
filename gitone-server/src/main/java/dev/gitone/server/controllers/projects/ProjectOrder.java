package dev.gitone.server.controllers.projects;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class ProjectOrder implements Order {

    private ProjectOrderField field = ProjectOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.DESC;
}
