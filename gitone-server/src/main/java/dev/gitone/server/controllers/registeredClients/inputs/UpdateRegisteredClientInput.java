package dev.gitone.server.controllers.registeredClients.inputs;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class UpdateRegisteredClientInput {

    @NotBlank
    private String id;
    @NotBlank
    private String clientName;
    @NotBlank
    private List<String> redirectUris;
    @NotBlank
    private List<String> scopes;

    private String description = "";

    public Integer id() {
        return Relay.fromGlobalId(OAuth2RegisteredClientEntity.TYPE, id).id();
    }
}
