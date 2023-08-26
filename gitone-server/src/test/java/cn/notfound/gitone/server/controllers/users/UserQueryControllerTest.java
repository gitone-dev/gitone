package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class UserQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public UserQueryControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Test
    void viewer() {
        SessionResult session = userFactory.viewer();
        query("viewer", session)
                .execute()
                .path("viewer.username").entity(String.class).isEqualTo(session.getUsername());
        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(1)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
    }

    @Test
    void user() {
        SessionResult session = userFactory.viewer();
        query("user")
                .variable("username", session.getUsername())
                .execute()
                .path("user.username").entity(String.class).isEqualTo(session.getUsername());
        query("userEmails")
                .variable("username", session.getUsername())
                .execute()
                .path("user.emails.edges").entityList(Object.class).hasSize(0)
                .path("user.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);

    }
}
