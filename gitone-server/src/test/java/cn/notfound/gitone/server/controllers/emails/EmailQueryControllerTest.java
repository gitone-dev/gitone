package cn.notfound.gitone.server.controllers.emails;

import cn.notfound.gitone.server.controllers.users.inputs.CreateUserInput;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
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

        query("existEmail")
                .variable("email", createUserInput.getEmail())
                .execute()
                .path("existEmail").entity(Boolean.class).isEqualTo(Boolean.FALSE);

        userFactory.create(createUserInput);
        query("existEmail")
                .variable("email", createUserInput.getEmail())
                .execute()
                .path("existEmail").entity(Boolean.class).isEqualTo(Boolean.TRUE);
    }
}
