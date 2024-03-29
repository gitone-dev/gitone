package dev.gitone.server.controllers.emails;

import dev.gitone.server.controllers.users.inputs.CreateUserInput;
import dev.gitone.server.factories.BaseFactory;
import dev.gitone.server.factories.UserFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class EmailQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public EmailQueryControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Test
    void existEmail() {
        CreateUserInput createUserInput = userFactory.createUserInput();

        queryExistEmail(createUserInput.getEmail(), Boolean.FALSE);
        userFactory.create(createUserInput);
        queryExistEmail(createUserInput.getEmail(), Boolean.TRUE);
    }

    private void queryExistEmail(String email, Boolean result) {
        query("existEmail")
                .variable("email", email)
                .execute()
                .path("existEmail").entity(Boolean.class).isEqualTo(result);
    }
}
