package dev.gitone.server.controllers.emails;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.controllers.emails.inputs.ConfirmEmailInput;
import dev.gitone.server.controllers.emails.inputs.CreateEmailInput;
import dev.gitone.server.controllers.emails.inputs.DeleteEmailInput;
import dev.gitone.server.controllers.emails.inputs.SetPrimaryEmailInput;
import dev.gitone.server.controllers.emails.payloads.ConfirmEmailPayload;
import dev.gitone.server.controllers.emails.payloads.CreateEmailPayload;
import dev.gitone.server.controllers.emails.payloads.DeleteEmailPayload;
import dev.gitone.server.controllers.emails.payloads.SetPrimaryEmailPayload;
import dev.gitone.server.entities.EmailEntity;
import dev.gitone.server.entities.Role;
import dev.gitone.server.services.EmailService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class EmailMutationController extends ViewerContext {

    private EmailService emailService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateEmailPayload createEmail(@Valid @Argument CreateEmailInput input) {
        EmailEntity emailEntity = emailService.create(input.getEmail());
        return new CreateEmailPayload(emailEntity);
    }

    @MutationMapping
    public ConfirmEmailPayload confirmEmail(@Valid @Argument ConfirmEmailInput input) {
        EmailEntity emailEntity = emailService.confirm(input.getToken());
        return new ConfirmEmailPayload(emailEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public SetPrimaryEmailPayload setPrimaryEmail(@Valid @Argument SetPrimaryEmailInput input) {
        EmailEntity emailEntity = emailService.setPrimary(input.getEmail());
        return new SetPrimaryEmailPayload(emailEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteEmailPayload deleteEmail(@Valid @Argument DeleteEmailInput input) {
        EmailEntity emailEntity = emailService.delete(input.getEmail());
        return new DeleteEmailPayload(emailEntity);
    }
}
