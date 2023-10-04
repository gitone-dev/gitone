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
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.util.List;

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

        UserOrder orderBy = new UserOrder();
        orderBy.setField(UserOrderField.CREATED_AT);
        orderBy.setDirection(OrderDirection.DESC);
        UserFilter filterBy = new UserFilter();

        /*
         * 分页
         */

        String after = queryUsers(null, filterBy, orderBy, List.of(user3.getId(), user2.getId()));
        after = queryUsers(after, filterBy, orderBy, List.of(user1.getId()));

        orderBy.setDirection(OrderDirection.ASC);
        after = queryUsers(after, filterBy, orderBy, List.of(user2.getId()));

        after = queryUsers(after, filterBy, orderBy, List.of(user3.getId()));

        /*
         * 过滤
         */

        orderBy.setDirection(OrderDirection.DESC);
        filterBy.setQuery(user1.getUsername());
        queryUsers(after, filterBy, orderBy, List.of(user1.getId()));
    }

    private String queryUsers(String after, UserFilter filterBy, UserOrder orderBy, List<String> ids) {
        GraphQlTester.Response response = query("users")
                .variable("first", ids.size())
                .variable("after", after)
                .variable("filterBy", filterBy)
                .variable("orderBy", orderBy)
                .execute();
        response.path("users.edges").entityList(Object.class).hasSize(ids.size());
        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("users.edges[%d].node.id", i)).entity(String.class).isEqualTo(ids.get(i));
        }

        return response.path("users.pageInfo.endCursor").entity(String.class).get();
    }
}
