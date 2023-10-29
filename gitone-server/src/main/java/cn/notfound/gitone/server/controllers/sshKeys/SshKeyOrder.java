package cn.notfound.gitone.server.controllers.sshKeys;

import cn.notfound.gitone.server.Order;
import cn.notfound.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class SshKeyOrder implements Order {

    private SshKeyOrderField field = SshKeyOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
