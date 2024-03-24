package dev.gitone.server.controllers.releases;

import dev.gitone.server.controllers.releases.inputs.CreateReleaseInput;
import dev.gitone.server.controllers.releases.inputs.DeleteReleaseInput;
import dev.gitone.server.controllers.releases.inputs.UpdateReleaseInput;
import dev.gitone.server.controllers.releases.payloads.CreateReleasePayload;
import dev.gitone.server.controllers.releases.payloads.DeleteReleasePayload;
import dev.gitone.server.controllers.releases.payloads.UpdateReleasePayload;
import dev.gitone.server.entities.Role;
import dev.gitone.server.entities.ReleaseEntity;
import dev.gitone.server.services.ReleaseService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class ReleaseMutationController {

    private final ReleaseService releaseService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateReleasePayload createRelease(@Valid @Argument CreateReleaseInput input) {
        ReleaseEntity releaseEntity = releaseService.create(input);
        return new CreateReleasePayload(releaseEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateReleasePayload updateRelease(@Valid @Argument UpdateReleaseInput input) {
        ReleaseEntity releaseEntity = releaseService.update(input);
        return new UpdateReleasePayload(releaseEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteReleasePayload deleteRelease(@Valid @Argument DeleteReleaseInput input) {
        ReleaseEntity releaseEntity = releaseService.delete(input);
        return new DeleteReleasePayload(releaseEntity);
    }
}
