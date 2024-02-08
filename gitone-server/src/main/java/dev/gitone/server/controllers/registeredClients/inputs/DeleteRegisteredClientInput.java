package dev.gitone.server.controllers.registeredClients.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteRegisteredClientInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(OAuth2RegisteredClientEntity.TYPE, id).id();
    }
}
