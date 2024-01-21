package dev.gitone.server.controllers.sshKeys.payloads;

import dev.gitone.server.entities.SshKeyEntity;

public record DeleteSshKeyPayload(SshKeyEntity sshKey) {
}
