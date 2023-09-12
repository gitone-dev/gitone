package cn.notfound.gitone.server.controllers.emails;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.controllers.emails.inputs.ConfirmEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.CreateEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.DeleteEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.SetPrimaryEmailInput;
import cn.notfound.gitone.server.controllers.emails.payloads.ConfirmEmailPayload;
import cn.notfound.gitone.server.controllers.emails.payloads.CreateEmailPayload;
import cn.notfound.gitone.server.controllers.emails.payloads.DeleteEmailPayload;
import cn.notfound.gitone.server.controllers.emails.payloads.SetPrimaryEmailPayload;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.services.EmailService;
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
