package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.controllers.users.inputs.CreateUserInput;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class NamespaceQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public NamespaceQueryControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Test
    void existFullPath() {
        CreateUserInput createUserInput = userFactory.createUserInput();

        query("existFullPath")
                .variable("fullPath", createUserInput.getUsername())
                .execute()
                .path("existFullPath")
                .entity(Boolean.class).isEqualTo(Boolean.FALSE);

        userFactory.create(createUserInput);
        query("existFullPath")
                .variable("fullPath", createUserInput.getUsername())
                .execute()
                .path("existFullPath")
                .entity(Boolean.class).isEqualTo(Boolean.TRUE);
    }

    @Test
    void namespace() {
        CreateUserInput createUserInput = userFactory.createUserInput();

        query("namespace")
                .variable("fullPath", createUserInput.getUsername())
                .execute()
                .errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));

        userFactory.create(createUserInput);
        query("namespace")
                .variable("fullPath", createUserInput.getUsername())
                .execute()
                .path("namespace.fullPath").entity(String.class).isEqualTo(createUserInput.getUsername());
    }
}
