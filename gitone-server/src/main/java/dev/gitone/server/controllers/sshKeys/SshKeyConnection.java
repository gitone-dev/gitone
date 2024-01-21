package dev.gitone.server.controllers.sshKeys;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.SshKeyEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class SshKeyConnection extends CustomConnection<SshKeyEntity, SshKeyPage> {

    public SshKeyConnection(List<SshKeyEntity> data, SshKeyPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(SshKeyEntity node) {
        return SshKeyCursor.create(node, page.getOrder());
    }
}
