package dev.gitone.server.controllers.groups;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.GroupEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class GroupConnection extends CustomConnection<GroupEntity, GroupPage> {

    public GroupConnection(List<GroupEntity> data, GroupPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(GroupEntity node) {
        return GroupCursor.create(node, page.getOrder());
    }
}
