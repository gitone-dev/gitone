package dev.gitone.server.controllers.registeredClients;

import dev.gitone.server.Order;
import dev.gitone.server.OrderDirection;
import lombok.Data;

@Data
public class RegisteredClientOrder implements Order {

    private RegisteredClientOrderField field = RegisteredClientOrderField.CREATED_AT;

    private OrderDirection direction = OrderDirection.ASC;

}
