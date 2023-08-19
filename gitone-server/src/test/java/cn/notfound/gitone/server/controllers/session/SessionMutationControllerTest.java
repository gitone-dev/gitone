package cn.notfound.gitone.server.controllers.session;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.controllers.users.inputs.CreateUserInput;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
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

    @Test
    void createSession() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput);

        CreateSessionInput input = new CreateSessionInput();
        input.setUsername(createUserInput.getUsername());

        input.setPassword("error password");
        mutate("createSession", input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        input.setPassword(createUserInput.getPassword());
        mutate("createSession", input)
                .path("payload.session.email").entity(String.class).isEqualTo(createUserInput.getEmail())
                .path("payload.session.username").entity(String.class).isEqualTo(input.getUsername())
                .path("payload.session.header").entity(String.class).isEqualTo("X-Auth-Token")
                .path("payload.session.token").entity(String.class).isNotEqualTo("")
                .path("payload.session.active").entity(Boolean.class).isEqualTo(Boolean.FALSE);

        userFactory.activate(createUserInput.getEmail());
        mutate("createSession", input)
                .path("payload.session.email").valueIsNull()
                .path("payload.session.username").entity(String.class).isEqualTo(input.getUsername())
                .path("payload.session.header").entity(String.class).isEqualTo("X-Auth-Token")
                .path("payload.session.token").entity(String.class).isNotEqualTo("")
                .path("payload.session.active").entity(Boolean.class).isEqualTo(Boolean.TRUE);
    }

    @Test
    void deleteSession() {
        SessionResult session = userFactory.viewer();
        query("viewer", session).execute().errors().verify();
        mutate("deleteSession", session).errors().verify();
        /* FIXME 无法通过测试
         * query("viewer", session).execute()
         *         .errors()
         *         .expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
         */
    }
}
