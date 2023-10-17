package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class UserTypeControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public UserTypeControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    @Test
    void emails() {
        SessionResult session = userFactory.session();
        queryViewerEmails(session);
        queryUserEmails(session, session.getUsername());
        queryUserEmails(null, session.getUsername());
    }

    private void queryViewerEmails(SessionResult session) {
        query("viewerEmails", session)
                .execute()
                .path("viewer.emails.edges").entityList(Object.class).hasSize(1)
                .path("viewer.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
    }

    private void queryUserEmails(SessionResult session, String username) {
        GraphQlTester.Response response = query("userEmails", session)
                .variable("username", username)
                .execute();
        if (session == null) {
            response.path("user.emails.edges").entityList(Object.class).hasSize(0)
                    .path("user.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
        } else {
            response.path("user.emails.edges").entityList(Object.class).hasSize(1)
                    .path("user.unconfirmedEmails.edges").entityList(Object.class).hasSize(0);
        }
    }
}
