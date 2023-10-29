package cn.notfound.gitone.server.controllers.sshKeys.payloads;

import cn.notfound.gitone.server.entities.SshKeyEntity;

public record CreateSshKeyPayload(SshKeyEntity sshKey) {
}
