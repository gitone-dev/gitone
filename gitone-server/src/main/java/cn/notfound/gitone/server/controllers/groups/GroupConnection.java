package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.CustomConnection;
import cn.notfound.gitone.server.entities.GroupEntity;
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
