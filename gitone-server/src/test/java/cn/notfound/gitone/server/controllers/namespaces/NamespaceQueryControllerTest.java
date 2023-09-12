package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.controllers.users.inputs.CreateUserInput;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.SessionResult;
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

    private final GroupFactory groupFactory;

    @Autowired
    public NamespaceQueryControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
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
        query("namespace")
                .variable("fullPath", "notfound/notfound")
                .execute()
                .errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));

        SessionResult session = userFactory.viewer();
        GroupResult group = groupFactory.create(session);

        query("namespace")
                .variable("fullPath", group.getFullPath())
                .execute()
                .path("namespace.id").entity(String.class).isNotEqualTo("")
                .path("namespace.name").valueIsNull()
                .path("namespace.path").valueIsNull()
                .path("namespace.fullName").valueIsNull()
                .path("namespace.fullPath").entity(String.class).isEqualTo(group.getFullPath())
                .path("namespace.description").entity(String.class).isEqualTo("");
        query("namespace", session)
                .variable("fullPath", group.getFullPath())
                .execute()
                .path("namespace.fullName").entity(String.class).isEqualTo(group.getFullName())
                .path("namespace.fullPath").entity(String.class).isEqualTo(group.getFullPath());
    }

    @Test
    void namespacePolicy() {
        SessionResult session = userFactory.viewer();

        query("namespacePolicy")
                .variable("fullPath", session.getUsername())
                .execute()
                .path("namespacePolicy.access").entity(Access.class).isEqualTo(Access.REPORTER)
                .path("namespacePolicy.actions").entityList(Action.class).hasSize(1)
                .contains(Action.READ);
        query("namespacePolicy", session)
                .variable("fullPath", session.getUsername())
                .execute()
                .path("namespacePolicy.access").entity(Access.class).isEqualTo(Access.REPORTER)
                .path("namespacePolicy.actions").entityList(Action.class).hasSize(1)
                .contains(Action.READ);
    }
}
