package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.controllers.users.inputs.ActivateUserInput;
import cn.notfound.gitone.server.controllers.users.inputs.CreateUserInput;
import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.daos.UserDetailDao;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.UserResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class UserFactory extends BaseFactory {

    private final EmailDao emailDao;

    private final UserDetailDao userDetailDao;

    @Autowired
    public UserFactory(WebGraphQlTester graphQlTester, EmailDao emailDao, UserDetailDao userDetailDao) {
        super(graphQlTester);
        this.emailDao = emailDao;
        this.userDetailDao = userDetailDao;
    }

    public CreateUserInput createUserInput() {
        String username = Faker.username();
        CreateUserInput input = new CreateUserInput();
        input.setName(username.toUpperCase());
        input.setUsername(username);
        input.setEmail(username + "@notfound.cn");
        input.setPassword("123456");
        return input;
    }

    public UserResult create() {
        return create(createUserInput());
    }

    public UserResult create(CreateUserInput input) {
        return create(input, true);
    }

    public UserResult create(CreateUserInput input, boolean active) {
        UserResult result = mutate("createUser", input)
                .path("payload.user.name").entity(String.class).isEqualTo(input.getName())
                .path("payload.user.username").entity(String.class).isEqualTo(input.getUsername())
                .path("payload.user.description").entity(String.class).isEqualTo("")
                .path("payload.user.active").entity(Boolean.class).isEqualTo(Boolean.FALSE)
                .path("payload.user.role").entity(Role.class).isEqualTo(Role.USER)
                .path("payload.user.location").entity(String.class).isEqualTo("")
                .path("payload.user.websiteUrl").entity(String.class).isEqualTo("")
                .path("payload.user").entity(UserResult.class).get();

        if (active) {
            activateUser(input.getEmail());
        }
        return result;
    }

    public UserResult viewer(SessionResult session) {
        return query("viewer", session)
                .execute()
                .path("viewer.username").entity(String.class).isEqualTo(session.getUsername())
                .path("viewer").entity(UserResult.class).get();
    }

    public SessionResult session() {
        CreateUserInput input = createUserInput();
        create(input);

        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(input.getUsername());
        createSessionInput.setPassword(input.getPassword());
        SessionResult session = createSession(createSessionInput);
        session.setUsername(input.getUsername());
        session.setPassword(input.getPassword());
        return session;
    }

    public String getConfirmationToken(String email) {
        return emailDao.findByEmail(email).getConfirmationToken();
    }

    public String getResetPasswordToken(String email) {
        return userDetailDao.findByEmail(email).getResetPasswordToken();
    }

    public void activateUser(String email) {
        ActivateUserInput input = new ActivateUserInput();
        input.setToken(getConfirmationToken(email));
        mutate("activateUser", input).errors().verify();
    }
}
