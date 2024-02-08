package dev.gitone.server.controllers.registeredClients;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class RegisteredClientConnection extends CustomConnection<OAuth2RegisteredClientEntity, RegisteredClientPage> {

    public RegisteredClientConnection(List<OAuth2RegisteredClientEntity> data, RegisteredClientPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(OAuth2RegisteredClientEntity node) {
        return RegisteredClientCursor.create(node, page.getOrder());
    }
}
