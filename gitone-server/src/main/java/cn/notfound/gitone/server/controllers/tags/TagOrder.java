package cn.notfound.gitone.server.controllers.tags;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class TagOrder implements Order {

    private TagOrderField field = TagOrderField.NAME;

    private OrderDirection direction = OrderDirection.ASC;
}
