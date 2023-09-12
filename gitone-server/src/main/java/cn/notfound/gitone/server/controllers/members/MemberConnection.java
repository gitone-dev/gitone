package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.CustomConnection;
import cn.notfound.gitone.server.entities.MemberEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class MemberConnection extends CustomConnection<MemberEntity, MemberPage> {

    public MemberConnection(List<MemberEntity> data, MemberPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(MemberEntity node) {
        return MemberCursor.create(node, page.getOrder());
    }
}
