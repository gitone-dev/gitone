package dev.gitone.server.controllers.registeredClients;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.controllers.registeredClients.inputs.CreateRegisteredClientInput;
import dev.gitone.server.controllers.registeredClients.inputs.DeleteRegisteredClientInput;
import dev.gitone.server.controllers.registeredClients.inputs.UpdateRegisteredClientInput;
import dev.gitone.server.controllers.registeredClients.payloads.CreateRegisteredClientPayload;
import dev.gitone.server.controllers.registeredClients.payloads.DeleteRegisteredClientPayload;
import dev.gitone.server.controllers.registeredClients.payloads.UpdateRegisteredClientPayload;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import dev.gitone.server.entities.Role;
import dev.gitone.server.services.RegisteredClientService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class RegisteredClientMutationController extends ViewerContext {

    private RegisteredClientService registeredClientService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateRegisteredClientPayload createRegisteredClient(@Argument CreateRegisteredClientInput input) {
        OAuth2RegisteredClientEntity registeredClientEntity = registeredClientService.create(input);
        return new CreateRegisteredClientPayload(registeredClientEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateRegisteredClientPayload updateRegisteredClient(@Argument UpdateRegisteredClientInput input) {
        OAuth2RegisteredClientEntity registeredClientEntity = registeredClientService.update(input);
        return new UpdateRegisteredClientPayload(registeredClientEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteRegisteredClientPayload deleteRegisteredClient(@Argument DeleteRegisteredClientInput input) {
        OAuth2RegisteredClientEntity registeredClientEntity = registeredClientService.delete(input);
        return new DeleteRegisteredClientPayload(registeredClientEntity);
    }
}
