package dev.gitone.server.controllers.sshKeys;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class SshKeyOrder implements Order {

    private SshKeyOrderField field = SshKeyOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;
}
