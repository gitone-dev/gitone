package dev.gitone.server.controllers.users;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.UserEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class UserConnection extends CustomConnection<UserEntity, UserPage> {

    public UserConnection(List<UserEntity> data, UserPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(UserEntity node) {
        return UserCursor.create(node, page.getOrder());
    }
}
