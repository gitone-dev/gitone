package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.controllers.users.inputs.*;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.UserResult;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class UserMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public UserMutationControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Test
    void createUser() {
        UserResult user = userFactory.create();
        queryNamespace(user, null);
    }

    @Test
    void deleteUser() {
        SessionResult session = userFactory.session();
        UserResult user1 = userFactory.viewer(session);
        UserResult user2 = userFactory.create();

        queryUser(user1, null);
        queryNamespace(user1, null);

        DeleteUserInput input = new DeleteUserInput();
        input.setId(user2.getId());
        mutationDeleteUser(null, input, null, ErrorType.UNAUTHORIZED);
        mutationDeleteUser(session, input, null, ErrorType.FORBIDDEN);

        input.setId(user1.getId());
        mutationDeleteUser(session, input, user1, null);

        queryUser(user1, ErrorType.NOT_FOUND);
        queryNamespace(user1, ErrorType.NOT_FOUND);
    }

    @Test
    void updateActivationEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput, false);
        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(createUserInput.getUsername());
        createSessionInput.setPassword(createUserInput.getPassword());
        SessionResult session = userFactory.createSession(createSessionInput);

        UpdateActivationEmailInput input = new UpdateActivationEmailInput();
        input.setEmail(Faker.email());
        mutationUpdateActivationEmail(null, input, ErrorType.UNAUTHORIZED);

        mutationUpdateActivationEmail(session, input, null);
        Assertions.assertThrows(NullPointerException.class, () -> userFactory.getConfirmationToken(createUserInput.getEmail()));
        Assertions.assertNotNull(userFactory.getConfirmationToken(input.getEmail()));

        mutationUpdateActivationEmail(session, input, ErrorType.FORBIDDEN);
    }

    @Test
    void sendActivationEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput, false);
        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(createUserInput.getUsername());
        createSessionInput.setPassword(createUserInput.getPassword());
        SessionResult session = createSession(createSessionInput);

        String oldToken = userFactory.getConfirmationToken(createUserInput.getEmail());

        SendActivationEmailInput input = new SendActivationEmailInput();
        input.setEmail(createUserInput.getEmail());
        mutationSendActivationEmail(null, input, ErrorType.UNAUTHORIZED);
        mutationSendActivationEmail(session, input, null);

        String newToken = userFactory.getConfirmationToken(createUserInput.getEmail());
        Assertions.assertNotEquals(oldToken, newToken);

        ActivateUserInput activateUserInput = new ActivateUserInput();
        activateUserInput.setToken(newToken);
        mutationActivateUser(activateUserInput, null);

        mutationSendActivationEmail(session, input, ErrorType.FORBIDDEN);
    }

    @Test
    void activateUser() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput, false);

        ActivateUserInput input = new ActivateUserInput();
        input.setToken("01234567890123456789012345678901");
        mutationActivateUser(input, ErrorType.BAD_REQUEST);

        input.setToken(userFactory.getConfirmationToken(createUserInput.getEmail()));
        mutationActivateUser(input, null);
        mutationActivateUser(input, ErrorType.BAD_REQUEST);
    }

    @Test
    void sendPasswordResetEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput, false);

        SendPasswordResetEmailInput input = new SendPasswordResetEmailInput();
        input.setEmail(Faker.email());
        mutationSendPasswordResetEmail(input, ErrorType.BAD_REQUEST);

        input.setEmail(createUserInput.getEmail());
        Assertions.assertNull(userFactory.getResetPasswordToken(input.getEmail()));

        mutationSendPasswordResetEmail(input, null);
        Assertions.assertNotNull(userFactory.getResetPasswordToken(input.getEmail()));
    }

    @Test
    void resetPassword() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        userFactory.create(createUserInput, false);

        SendPasswordResetEmailInput sendPasswordResetEmailInput = new SendPasswordResetEmailInput();
        sendPasswordResetEmailInput.setEmail(createUserInput.getEmail());
        mutationSendPasswordResetEmail(sendPasswordResetEmailInput, null);

        ResetPasswordInput input = new ResetPasswordInput();
        input.setToken("01234567890123456789012345678901");
        input.setPassword("NEW_PASSWORD");
        mutationResetPassword(input, ErrorType.BAD_REQUEST);

        input.setToken(userFactory.getResetPasswordToken(createUserInput.getEmail()));
        mutationResetPassword(input, null);

        ActivateUserInput activateUserInput = new ActivateUserInput();
        activateUserInput.setToken(userFactory.getConfirmationToken(createUserInput.getEmail()));
        mutationActivateUser(activateUserInput, null);

        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(createUserInput.getUsername());
        createSessionInput.setPassword(input.getPassword());
        createSession(createSessionInput);

        mutationResetPassword(input, ErrorType.BAD_REQUEST);
    }

    @Test
    void updateUser() {
        SessionResult session = userFactory.session();
        UserResult user = userFactory.viewer(session);

        UpdateUserInput input = new UpdateUserInput();
        input.setName(Faker.username());
        input.setDescription(Faker.username());
        input.setLocation(Faker.username());
        input.setWebsiteUrl(Faker.username());
        Assertions.assertNotEquals(input.getName(), user.getName());

        user.setName(input.getName());
        user.setDescription(input.getDescription());
        user.setLocation(input.getLocation());
        user.setWebsiteUrl(input.getWebsiteUrl());
        mutationUpdateUser(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateUser(session, input, user, null);

        queryNamespace(user, null);
    }

    @Test
    void updatePassword() {
        SessionResult session = userFactory.session();

        UpdatePasswordInput input = new UpdatePasswordInput();
        input.setOldPassword(session.getPassword());
        input.setPassword(session.getPassword() + "new");
        input.setPasswordConfirmation(session.getPassword() + "new");

        mutationUpdatePassword(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdatePassword(session, input, null);
        // FIXME 旧的 TOKEN 未失效
        query("viewer", session).execute().errors().verify();

        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(session.getUsername());
        createSessionInput.setPassword(session.getPassword());
        mutate("createSession",createSessionInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        createSessionInput.setPassword(input.getPassword());
        createSession(createSessionInput);
    }

    private void queryNamespace(UserResult user, ErrorType errorType) {
        GraphQlTester.Response response = query("namespace")
                .variable("fullPath", user.getUsername())
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("namespace.name").entity(String.class).isEqualTo(user.getName())
                .path("namespace.fullName").entity(String.class).isEqualTo(user.getName())
                .path("namespace.path").entity(String.class).isEqualTo(user.getUsername())
                .path("namespace.fullPath").entity(String.class).isEqualTo(user.getUsername())
                .path("namespace.description").entity(String.class).isEqualTo(user.getDescription())
                .path("namespace.visibility").entity(Visibility.class).isEqualTo(Visibility.PUBLIC);
    }

    private void queryUser(UserResult user, ErrorType errorType) {
        GraphQlTester.Response response = query("user")
                .variable("username", user.getUsername())
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.errors().verify();
    }

    private void mutationDeleteUser(SessionResult session, DeleteUserInput input, UserResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("deleteUser", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.user.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.user.username").entity(String.class).isEqualTo(result.getUsername());
    }

    private void mutationUpdateActivationEmail(SessionResult session, UpdateActivationEmailInput input, ErrorType errorType) {
        GraphQlTester.Response response =  mutate("updateActivationEmail", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.errors().verify();
    }

    private void mutationSendActivationEmail(SessionResult session, SendActivationEmailInput input, ErrorType errorType)  {
        GraphQlTester.Response response =  mutate("sendActivationEmail", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.errors().verify();
    }

    private void mutationActivateUser(ActivateUserInput input, ErrorType errorType)  {
        GraphQlTester.Response response = mutate("activateUser", input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.errors().verify();
    }

    private void mutationSendPasswordResetEmail(SendPasswordResetEmailInput input, ErrorType errorType)  {
        GraphQlTester.Response response = mutate("sendPasswordResetEmail", input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.errors().verify();
    }

    private void mutationResetPassword(ResetPasswordInput input, ErrorType errorType)  {
        GraphQlTester.Response response = mutate("resetPassword", input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.errors().verify();
    }

    private void mutationUpdateUser(SessionResult session, UpdateUserInput input, UserResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updateUser", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.user.name").entity(String.class).isEqualTo(result.getName())
                .path("payload.user.description").entity(String.class).isEqualTo(result.getDescription())
                .path("payload.user.location").entity(String.class).isEqualTo(result.getLocation())
                .path("payload.user.websiteUrl").entity(String.class).isEqualTo(result.getWebsiteUrl());
    }

    private void mutationUpdatePassword(SessionResult session, UpdatePasswordInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updatePassword", session, input);
        if (errorType != null) {
            response.errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
            return;
        }
        response.errors().verify();
    }
}
