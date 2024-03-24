package dev.gitone.server.controllers.releases.payloads;

import dev.gitone.server.entities.ReleaseEntity;

public record DeleteReleasePayload(ReleaseEntity release) {
}
