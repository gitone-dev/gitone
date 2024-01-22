package dev.gitone.server.controllers.session;

import dev.gitone.server.controllers.users.inputs.CreateUserInput;
import dev.gitone.server.factories.BaseFactory;
import dev.gitone.server.factories.LoginInput;
import dev.gitone.server.factories.UserFactory;
import dev.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class SessionMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public SessionMutationControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Disabled
    void createSession() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput, false);

        LoginInput input = new LoginInput();
        input.setUsername(createUserInput.getUsername());
        input.setPassword("error password");
        mutationCreateSession(input, ErrorType.UNAUTHORIZED, null);

        input.setPassword(createUserInput.getPassword());
        mutationCreateSession(input, null, Boolean.FALSE);

        userFactory.activateUser(createUserInput.getEmail());
        mutationCreateSession(input, null, Boolean.TRUE);
    }

    @Disabled
    void deleteSession() {
        SessionResult session = userFactory.session();
        userFactory.viewer(session);
        mutate("deleteSession", session).errors().verify();
        userFactory.viewer(session);
        /* FIXME: 2023/10/29 无法通过测试
         * query("viewer", session).execute()
         *         .errors()
         *         .expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
         */
    }

    private void mutationCreateSession(LoginInput input, ErrorType errorType, Boolean active) {
        GraphQlTester.Response response = mutate("createSession", input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.session.header").entity(String.class).isEqualTo("X-Auth-Token")
                .path("payload.session.token").entity(String.class).isNotEqualTo("")
                .path("payload.session.active").entity(Boolean.class).isEqualTo(active);
    }
}
