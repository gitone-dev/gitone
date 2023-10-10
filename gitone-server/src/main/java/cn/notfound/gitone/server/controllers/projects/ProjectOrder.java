package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class ProjectOrder implements Order {

    private ProjectOrderField field = ProjectOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.DESC;
}
