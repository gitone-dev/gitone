package dev.gitone.server.controllers.releases.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.ReleaseEntity;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class DeleteReleaseInput {

    @NotEmpty
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(ReleaseEntity.TYPE, id).id();
    }
}
