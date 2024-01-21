package dev.gitone.server.controllers.users;

import dev.gitone.server.OrderDirection;
import dev.gitone.server.entities.Role;
import dev.gitone.server.factories.BaseFactory;
import dev.gitone.server.factories.GroupFactory;
import dev.gitone.server.factories.ProjectFactory;
import dev.gitone.server.factories.UserFactory;
import dev.gitone.server.results.GroupResult;
import dev.gitone.server.results.ProjectResult;
import dev.gitone.server.results.SessionResult;
import dev.gitone.server.results.UserResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.util.List;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class UserQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    @Autowired
    public UserQueryControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory,
            ProjectFactory projectFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
        this.projectFactory = projectFactory;
    }

    @Test
    void viewer() {
        SessionResult session = userFactory.session();
        queryViewer(null, ErrorType.UNAUTHORIZED);
        queryViewer(session, null);
    }

    @Test
    void user() {
        UserResult user = userFactory.create();
        queryUser("notfound", null, ErrorType.NOT_FOUND);
        queryUser(user.getUsername(), user, null);
    }

    @Test
    void users() {
        UserResult user1 = userFactory.create();
        UserResult user2 = userFactory.create();
        UserResult user3 = userFactory.create();

        UserOrder orderBy = new UserOrder();
        orderBy.setField(UserOrderField.CREATED_AT);
        orderBy.setDirection(OrderDirection.DESC);
        UserFilter.By filterBy = new UserFilter.By();

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

        filterBy.setQuery("notfound");
        queryUsers(after, filterBy, orderBy, List.of());

        // 组织

        SessionResult session = userFactory.session();
        GroupResult group = groupFactory.create(session);
        ProjectResult project = projectFactory.create(session, group);

        filterBy.setQuery(group.getPath());
        queryUsers(null, filterBy, orderBy, List.of());

        filterBy.setQuery(project.getPath());
        queryUsers(null, filterBy, orderBy, List.of());
    }

    private void queryViewer(SessionResult session, ErrorType errorType) {
        GraphQlTester.Response response = query("viewer", session)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("viewer.username").entity(String.class).isEqualTo(session.getUsername());
    }

    private void queryUser(String username, UserResult result, ErrorType errorType) {
        GraphQlTester.Response response = query("user")
                .variable("username", username)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("user.name").entity(String.class).isEqualTo(result.getName())
                .path("user.username").entity(String.class).isEqualTo(result.getUsername())
                .path("user.description").entity(String.class).isEqualTo("")
                .path("user.active").entity(Boolean.class).isEqualTo(Boolean.TRUE)
                .path("user.role").entity(Role.class).isEqualTo(Role.USER)
                .path("user.location").entity(String.class).isEqualTo("")
                .path("user.websiteUrl").entity(String.class).isEqualTo("");
    }

    private String queryUsers(String after, UserFilter.By filterBy, UserOrder orderBy, List<String> ids) {
        GraphQlTester.Response response = query("users")
                .variable("first", ids.size())
                .variable("after", after)
                .variable("filterBy", filterBy)
                .variable("orderBy", orderBy)
                .execute();
        response.path("users.edges").entityList(Object.class).hasSize(ids.size());
        if (ids.isEmpty()) return "";

        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("users.edges[%d].node.id", i)).entity(String.class).isEqualTo(ids.get(i));
        }

        return response.path("users.pageInfo.endCursor").entity(String.class).get();
    }
}
