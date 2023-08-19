package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.users.inputs.ActivateUserInput;
import cn.notfound.gitone.server.controllers.users.inputs.CreateUserInput;
import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.UserResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class UserFactory extends BaseFactory {

    @Autowired
    private EmailDao emailDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    public UserFactory(WebGraphQlTester graphQlTester) {
        super(graphQlTester);
    }

    public CreateUserInput createUserInput() {
        CreateUserInput input = new CreateUserInput();
        String username = Faker.username();
        input.setName(username.toUpperCase());
        input.setUsername(username);
        input.setEmail(username + "@notfound.cn");
        input.setPassword("123456");
        return input;
    }

    public void create(CreateUserInput input) {
        mutate("createUser", input)
                .path("payload.user").entity(UserResult.class).get();
    }

    public String getConfirmationToken(String email) {
        return emailDao.findByEmail(email).getConfirmationToken();
    }

    public String getResetPasswordToken(String email) {
        return userDao.findByEmail(email).getResetPasswordToken();
    }

    public void activate(String email) {
        ActivateUserInput input = new ActivateUserInput();
        input.setToken(getConfirmationToken(email));
        mutate("activateUser", input).errors().verify();
    }

    public SessionResult viewer() {
        CreateUserInput createUserInput = createUserInput();
        create(createUserInput);
        activate(createUserInput.getEmail());
        return createSession(createUserInput.getUsername(), createUserInput.getPassword());
    }
}
