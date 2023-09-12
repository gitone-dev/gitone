package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.UserResult;
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

    @Test
    void users() {
        UserResult user1 = userFactory.create();
        UserResult user2 = userFactory.create();
        UserResult user3 = userFactory.create();

        UserOrder order = new UserOrder();
        order.setField(UserOrderField.CREATED_AT);
        order.setDirection(OrderDirection.DESC);

        String endCursor = query("users")
                .variable("first", 2)
                .variable("orderBy", order)
                .execute()
                .path("users.edges").entityList(Object.class).hasSize(2)
                .path("users.edges[0].node.id").entity(String.class).isEqualTo(user3.getId())
                .path("users.edges[1].node.id").entity(String.class).isEqualTo(user2.getId())
                .path("users.pageInfo.endCursor").entity(String.class).get();
        endCursor = query("users")
                .variable("first", 1)
                .variable("after", endCursor)
                .variable("orderBy", order)
                .execute()
                .path("users.edges").entityList(Object.class).hasSize(1)
                .path("users.edges[0].node.id").entity(String.class).isEqualTo(user1.getId())
                .path("users.pageInfo.endCursor").entity(String.class).get();

        order.setDirection(OrderDirection.ASC);
        endCursor= query("users")
                .variable("first", 1)
                .variable("after", endCursor)
                .variable("orderBy", order)
                .execute()
                .path("users.edges").entityList(Object.class).hasSize(1)
                .path("users.edges[0].node.id").entity(String.class).isEqualTo(user2.getId())
                .path("users.pageInfo.endCursor").entity(String.class).get();
        query("users")
                .variable("first", 1)
                .variable("after", endCursor)
                .variable("orderBy", order)
                .execute()
                .path("users.edges").entityList(Object.class).hasSize(1)
                .path("users.edges[0].node.id").entity(String.class).isEqualTo(user3.getId());
    }
}
