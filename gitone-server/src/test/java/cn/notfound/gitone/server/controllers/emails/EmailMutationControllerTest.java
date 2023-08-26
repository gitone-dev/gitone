package cn.notfound.gitone.server.controllers.emails;

import cn.notfound.gitone.server.controllers.emails.inputs.ConfirmEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.CreateEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.DeleteEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.SetPrimaryEmailInput;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class EmailMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public EmailMutationControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Test
    void createEmail() {
        SessionResult session = userFactory.viewer();

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());

        mutate("createEmail", createEmailInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("createEmail", session, createEmailInput)
                .path("payload.email.email").entity(String.class).isEqualTo(createEmailInput.getEmail())
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE);
        mutate("createEmail", session, createEmailInput).errors().verify();

        query("viewerEmails", session)
                .execute()
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(1)
                .path("viewer.unconfirmedEmails.edges[0].node.email").entity(String.class).isEqualTo(createEmailInput.getEmail())
                .path("viewer.unconfirmedEmails.edges[0].node.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE);

        createEmailInput.setEmail(session.getEmail());
        mutate("createEmail", session, createEmailInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));

    }

    @Test
    void confirmEmail() {
        SessionResult session = userFactory.viewer();

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());
        mutate("createEmail", session, createEmailInput).errors().verify();

        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(1)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(1);

        String token = userFactory.getConfirmationToken(createEmailInput.getEmail());
        ConfirmEmailInput confirmEmailInput = new ConfirmEmailInput();
        confirmEmailInput.setToken(token);
        mutate("confirmEmail", confirmEmailInput)
                .path("payload.email.email").entity(String.class).isEqualTo(createEmailInput.getEmail())
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE);

        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(2)
                .path("viewer.emails.edges[0].node.email").entity(String.class).isEqualTo(createEmailInput.getEmail())
                .path("viewer.emails.edges[0].node.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
    }

    @Test
    void setPrimaryEmail() {
        SessionResult session = userFactory.viewer();

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());
        mutate("createEmail", session, createEmailInput).errors().verify();

        SetPrimaryEmailInput setPrimaryEmailInput = new SetPrimaryEmailInput();
        setPrimaryEmailInput.setEmail(createEmailInput.getEmail());
        mutate("setPrimaryEmail", setPrimaryEmailInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("setPrimaryEmail", session, setPrimaryEmailInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));

        String token = userFactory.getConfirmationToken(createEmailInput.getEmail());
        ConfirmEmailInput confirmEmailInput = new ConfirmEmailInput();
        confirmEmailInput.setToken(token);
        mutate("confirmEmail", confirmEmailInput).errors().verify();

        mutate("setPrimaryEmail", session, setPrimaryEmailInput)
                .path("payload.email.email").entity(String.class).isEqualTo(createEmailInput.getEmail())
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.TRUE);

        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(2)
                .path("viewer.emails.edges[0].node.email").entity(String.class).isEqualTo(createEmailInput.getEmail())
                .path("viewer.emails.edges[0].node.primary").entity(Boolean.class).isEqualTo(Boolean.TRUE)
                .path("viewer.emails.edges[1].node.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
    }

    @Test
    void deleteEmail() {
        SessionResult session = userFactory.viewer();

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());
        mutate("createEmail", session, createEmailInput).errors().verify();

        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(1)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(1);

        DeleteEmailInput deleteEmailInput = new DeleteEmailInput();
        deleteEmailInput.setEmail(createEmailInput.getEmail());
        mutate("deleteEmail", deleteEmailInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("deleteEmail", session, deleteEmailInput)
                .path("payload.email.email").entity(String.class).isEqualTo(deleteEmailInput.getEmail())
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE);
        mutate("deleteEmail", session, deleteEmailInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));

        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(1)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
    }
}
