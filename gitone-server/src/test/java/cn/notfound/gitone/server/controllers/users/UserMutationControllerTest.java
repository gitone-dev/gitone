package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.controllers.users.inputs.*;
import cn.notfound.gitone.server.entities.Role;
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
        CreateUserInput input = userFactory.createUserInput();
        mutate("createUser", input)
                .path("payload.user.name").entity(String.class).isEqualTo(input.getName())
                .path("payload.user.username").entity(String.class).isEqualTo(input.getUsername())
                .path("payload.user.role").entity(Role.class).isEqualTo(Role.USER)
                .path("payload.user.namespace.name").entity(String.class).isEqualTo(input.getName())
                .path("payload.user.namespace.fullName").entity(String.class).isEqualTo(input.getName())
                .path("payload.user.namespace.path").entity(String.class).isEqualTo(input.getUsername())
                .path("payload.user.namespace.fullPath").entity(String.class).isEqualTo(input.getUsername())
                .path("payload.user.namespace.visibility").entity(Visibility.class).isEqualTo(Visibility.PUBLIC);
        query("namespace")
                .variable("fullPath", input.getUsername())
                .execute()
                .path("namespace.name").entity(String.class).isEqualTo(input.getName())
                .path("namespace.path").entity(String.class).isEqualTo(input.getUsername())
                .path("namespace.fullName").entity(String.class).isEqualTo(input.getName())
                .path("namespace.fullPath").entity(String.class).isEqualTo(input.getUsername())
                .path("namespace.visibility").entity(Visibility.class).isEqualTo(Visibility.PUBLIC);
    }

    @Test
    void deleteUser() {
        SessionResult session = userFactory.viewer();

        query("namespace")
                .variable("fullPath", session.getUsername())
                .execute().errors().verify();

        query("user")
                .variable("username", session.getUsername())
                .execute().errors().verify();

        String userId = query("viewer", session).execute().path("viewer.id").entity(String.class).get();
        DeleteUserInput input = new DeleteUserInput();
        input.setId(userId);
        mutate("deleteUser", session, input)
                .path("payload.user.id").entity(String.class).isEqualTo(userId)
                .path("payload.user.username").entity(String.class).isEqualTo(session.getUsername());

        query("user")
                .variable("username", session.getUsername())
                .execute().errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));

        query("namespace")
                .variable("fullPath", session.getUsername())
                .execute().errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));
    }

    @Test
    void updateActivationEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        mutate("createUser", createUserInput).errors().verify();

        UpdateActivationEmailInput input = new UpdateActivationEmailInput();
        input.setEmail(Faker.email());
        mutate("updateActivationEmail", input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));

        SessionResult session = createSession(createUserInput.getUsername(), createUserInput.getPassword());
        mutate("updateActivationEmail", session, input).errors().verify();
        Assertions.assertThrows(NullPointerException.class, () -> userFactory.getConfirmationToken(createUserInput.getEmail()));
        Assertions.assertNotNull(userFactory.getConfirmationToken(input.getEmail()));

        mutate("updateActivationEmail", session, input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));
    }

    @Test
    void sendActivationEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        mutate("createUser", createUserInput).errors().verify();

        String oldToken = userFactory.getConfirmationToken(createUserInput.getEmail());

        SendActivationEmailInput input = new SendActivationEmailInput();
        input.setEmail(createUserInput.getEmail());
        mutate("sendActivationEmail", input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));

        SessionResult session = createSession(createUserInput.getUsername(), createUserInput.getPassword());
        mutate("sendActivationEmail", session, input).errors().verify();

        String newToken = userFactory.getConfirmationToken(createUserInput.getEmail());
        Assertions.assertNotEquals(oldToken, newToken);

        ActivateUserInput activateUserInput = new ActivateUserInput();
        activateUserInput.setToken(newToken);
        mutate("activateUser", activateUserInput).errors().verify();

        mutate("sendActivationEmail", session, input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));
    }

    @Test
    void activateUser() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        mutate("createUser", createUserInput).errors().verify();

        ActivateUserInput input = new ActivateUserInput();

        input.setToken("01234567890123456789012345678901");
        mutate("activateUser", input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));

        input.setToken(userFactory.getConfirmationToken(createUserInput.getEmail()));
        mutate("activateUser", input).errors().verify();

        mutate("activateUser", input)
                .errors()
                .expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));
    }

    @Test
    void sendPasswordResetEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        mutate("createUser", createUserInput).errors().verify();

        SendPasswordResetEmailInput input = new SendPasswordResetEmailInput();
        input.setEmail(createUserInput.getEmail());
        Assertions.assertNull(userFactory.getResetPasswordToken(input.getEmail()));

        mutate("sendPasswordResetEmail", input).errors().verify();
        Assertions.assertNotNull(userFactory.getResetPasswordToken(input.getEmail()));
    }

    @Test
    void resetPassword() {
        CreateUserInput createUserInput = userFactory.createUserInput();
        mutate("createUser", createUserInput).errors().verify();

        SendPasswordResetEmailInput sendPasswordResetEmailInput = new SendPasswordResetEmailInput();
        sendPasswordResetEmailInput.setEmail(createUserInput.getEmail());
        mutate("sendPasswordResetEmail", sendPasswordResetEmailInput).errors().verify();

        ResetPasswordInput resetPasswordInput = new ResetPasswordInput();
        resetPasswordInput.setToken(userFactory.getResetPasswordToken(createUserInput.getEmail()));
        resetPasswordInput.setPassword("NEW_PASSWORD");
        mutate("resetPassword", resetPasswordInput).errors().verify();

        ActivateUserInput activateUserInput = new ActivateUserInput();
        activateUserInput.setToken(userFactory.getConfirmationToken(createUserInput.getEmail()));
        mutate("activateUser", activateUserInput).errors().verify();

        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(createUserInput.getUsername());
        createSessionInput.setPassword(resetPasswordInput.getPassword());
        mutate("createSession", createSessionInput).errors().verify();

        mutate("resetPassword", resetPasswordInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.BAD_REQUEST));
    }

    @Test
    void updateUser() {
        SessionResult session = userFactory.viewer();

        UserResult userResult = query("viewer", session).execute()
                .path("viewer").entity(UserResult.class).get();

        UpdateUserInput updateUserInput = new UpdateUserInput();
        updateUserInput.setName(Faker.username());
        updateUserInput.setBio(Faker.username());
        updateUserInput.setLocation(Faker.username());
        updateUserInput.setWebsiteUrl(Faker.username());
        Assertions.assertNotEquals(updateUserInput.getName(), userResult.getName());

        mutate("updateUser", updateUserInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        mutate("updateUser", session, updateUserInput)
                .path("payload.user.name").entity(String.class).isEqualTo(updateUserInput.getName())
                .path("payload.user.bio").entity(String.class).isEqualTo(updateUserInput.getBio())
                .path("payload.user.location").entity(String.class).isEqualTo(updateUserInput.getLocation())
                .path("payload.user.websiteUrl").entity(String.class).isEqualTo(updateUserInput.getWebsiteUrl());

        query("namespace")
                .variable("fullPath", userResult.getUsername())
                .execute()
                .path("namespace.name").entity(String.class).isEqualTo(updateUserInput.getName())
                .path("namespace.fullName").entity(String.class).isEqualTo(updateUserInput.getName());
    }

    @Test
    void updateUsername() {
        SessionResult session = userFactory.viewer();

        UserResult userResult = query("viewer", session).execute()
                .path("viewer").entity(UserResult.class).get();

        UpdateUsernameInput updateUsernameInput = new UpdateUsernameInput();
        updateUsernameInput.setUsername(Faker.username());
        Assertions.assertNotEquals(updateUsernameInput.getUsername(), userResult.getUsername());

        mutate("updateUsername", updateUsernameInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        mutate("updateUsername", session, updateUsernameInput)
                .path("payload.user.username").entity(String.class).isEqualTo(updateUsernameInput.getUsername());

        query("namespace")
                .variable("fullPath", updateUsernameInput.getUsername())
                .execute()
                .path("namespace.path").entity(String.class).isEqualTo(updateUsernameInput.getUsername())
                .path("namespace.fullPath").entity(String.class).isEqualTo(updateUsernameInput.getUsername());
    }

    @Test
    void updatePassword() {
        SessionResult session = userFactory.viewer();

        UpdatePasswordInput updatePasswordInput = new UpdatePasswordInput();
        updatePasswordInput.setOldPassword(session.getPassword());
        updatePasswordInput.setPassword(session.getPassword() + "new");
        updatePasswordInput.setPasswordConfirmation(session.getPassword() + "new");

        mutate("updatePassword", updatePasswordInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("updatePassword", session, updatePasswordInput).errors().verify();
        // FIXME? 旧的 TOKEN 未失效
        query("viewer", session).execute().errors().verify();

        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(session.getUsername());
        createSessionInput.setPassword(session.getPassword());
        mutate("createSession",createSessionInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        createSessionInput.setPassword(updatePasswordInput.getPassword());
        mutate("createSession",createSessionInput).errors().verify();
    }
}
