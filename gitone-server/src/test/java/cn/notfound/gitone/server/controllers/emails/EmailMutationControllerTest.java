package cn.notfound.gitone.server.controllers.emails;

import cn.notfound.gitone.server.controllers.emails.inputs.ConfirmEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.CreateEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.DeleteEmailInput;
import cn.notfound.gitone.server.controllers.emails.inputs.SetPrimaryEmailInput;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.EmailResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.util.ArrayList;
import java.util.List;

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
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        CreateEmailInput input = new CreateEmailInput();
        input.setEmail(Faker.email());
        mutationCreateEmail(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateEmail(session1, input, null);
        mutationCreateEmail(session1, input, null);
        queryUnconfirmedEmails(session1, List.of(input.getEmail()));

        mutationCreateEmail(session2, input, ErrorType.BAD_REQUEST);
    }

    @Test
    void confirmEmail() {
        SessionResult session = userFactory.session();

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());
        mutationCreateEmail(session, createEmailInput, null);
        queryUnconfirmedEmails(session, List.of(createEmailInput.getEmail()));

        List<EmailResult> results = queryEmails(session);

        ConfirmEmailInput input = new ConfirmEmailInput();
        input.setToken("01234567890123456789012345678901");
        mutationConfirmEmail(input, createEmailInput.getEmail(), ErrorType.BAD_REQUEST);

        input.setToken(userFactory.getConfirmationToken(createEmailInput.getEmail()));
        mutationConfirmEmail(input, createEmailInput.getEmail(), null);
        mutationConfirmEmail(input, createEmailInput.getEmail(), ErrorType.BAD_REQUEST);

        queryEmails(session, List.of(new EmailResult(createEmailInput.getEmail(), false), results.get(0)));
        queryUnconfirmedEmails(session, List.of());
    }

    @Test
    void setPrimaryEmail() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        List<EmailResult> results = queryEmails(session1);

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());
        mutationCreateEmail(session1, createEmailInput, null);

        SetPrimaryEmailInput input = new SetPrimaryEmailInput();
        input.setEmail(createEmailInput.getEmail());
        mutationSetPrimaryEmail(session1, input, ErrorType.BAD_REQUEST);

        ConfirmEmailInput confirmEmailInput = new ConfirmEmailInput();
        confirmEmailInput.setToken(userFactory.getConfirmationToken(createEmailInput.getEmail()));
        mutationConfirmEmail(confirmEmailInput, createEmailInput.getEmail(), null);

        mutationSetPrimaryEmail(null, input, ErrorType.UNAUTHORIZED);
        mutationSetPrimaryEmail(session2, input, ErrorType.BAD_REQUEST);
        mutationSetPrimaryEmail(session1, input, null);
        mutationSetPrimaryEmail(session1, input, null);

        results.get(0).setPrimary(false);

        queryEmails(session1, List.of(new EmailResult(input.getEmail(), true), results.get(0)));
        queryUnconfirmedEmails(session1, List.of());
    }

    @Test
    void deleteEmail() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        CreateEmailInput createEmailInput = new CreateEmailInput();
        createEmailInput.setEmail(Faker.email());
        mutationCreateEmail(session1, createEmailInput, null);
        queryUnconfirmedEmails(session1, List.of(createEmailInput.getEmail()));

        DeleteEmailInput deleteEmailInput = new DeleteEmailInput();
        deleteEmailInput.setEmail(createEmailInput.getEmail());
        mutationDeleteEmail(null, deleteEmailInput, ErrorType.UNAUTHORIZED);
        mutationDeleteEmail(session2, deleteEmailInput, ErrorType.BAD_REQUEST);
        mutationDeleteEmail(session1, deleteEmailInput, null);
        mutationDeleteEmail(session1, deleteEmailInput, ErrorType.BAD_REQUEST);
        queryUnconfirmedEmails(session1, List.of());

        List<EmailResult> emails = queryEmails(session1);
        deleteEmailInput.setEmail(emails.get(0).getEmail());
        mutationDeleteEmail(session1, deleteEmailInput, ErrorType.BAD_REQUEST);
        mutationDeleteEmail(session2, deleteEmailInput, ErrorType.BAD_REQUEST);
    }

    private void mutationCreateEmail(SessionResult session, CreateEmailInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("createEmail", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.email.email").entity(String.class).isEqualTo(input.getEmail())
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE);
    }

    private void mutationConfirmEmail(ConfirmEmailInput input, String email, ErrorType errorType) {
        GraphQlTester.Response response = mutate("confirmEmail", input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.email.email").entity(String.class).isEqualTo(email)
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.FALSE);
    }

    private void mutationSetPrimaryEmail(SessionResult session, SetPrimaryEmailInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("setPrimaryEmail", session,  input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.email.email").entity(String.class).isEqualTo(input.getEmail())
                .path("payload.email.primary").entity(Boolean.class).isEqualTo(Boolean.TRUE);
    }

    private void mutationDeleteEmail(SessionResult session, DeleteEmailInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("deleteEmail", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.email.email").entity(String.class).isEqualTo(input.getEmail());
    }

    private void queryUnconfirmedEmails(SessionResult session, List<String> emails) {
        GraphQlTester.Response response = query("viewerEmails", session)
                .execute();
        response.path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(emails.size());
        for (int i = 0; i < emails.size(); i++) {
            response.path(String.format("viewer.unconfirmedEmails.edges[%d].node.email", i)).entity(String.class).isEqualTo(emails.get(i))
                    .path(String.format("viewer.unconfirmedEmails.edges[%d].node.primary", i)).entity(Boolean.class).isEqualTo(Boolean.FALSE);
        }
    }

    private void queryEmails(SessionResult session, List<EmailResult> result) {
        GraphQlTester.Response response = query("viewerEmails", session)
                .execute();
        response.path("viewer.emails.edges").entityList(Object.class).hasSize(result.size());
        for (int i = 0; i < result.size(); i++) {
            response.path(String.format("viewer.emails.edges[%d].node.email", i)).entity(String.class).isEqualTo(result.get(i).getEmail())
                    .path(String.format("viewer.emails.edges[%d].node.primary", i)).entity(Boolean.class).isEqualTo(result.get(i).getPrimary());
        }
    }

    private List<EmailResult> queryEmails(SessionResult session) {
        List<EmailResult> emails = new ArrayList<>();

        GraphQlTester.Response response = query("viewerEmails", session)
                .execute();
        int size = response.path("viewer.emails.edges").entityList(Object.class).get().size();
        for (int i = 0; i < size; i++) {
            EmailResult result = response.path(String.format("viewer.emails.edges[%d].node", i)).entity(EmailResult.class).get();
            emails.add(result);
        }
        return emails;
    }
}
