package dev.gitone.server.controllers.namespaces;

import dev.gitone.server.controllers.namespaces.inputs.UpdatePathInput;
import dev.gitone.server.controllers.namespaces.inputs.UpdateVisibilityInput;
import dev.gitone.server.entities.Visibility;
import dev.gitone.server.factories.BaseFactory;
import dev.gitone.server.factories.GroupFactory;
import dev.gitone.server.factories.ProjectFactory;
import dev.gitone.server.factories.UserFactory;
import dev.gitone.server.faker.Faker;
import dev.gitone.server.results.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class NamespaceMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    @Autowired
    public NamespaceMutationControllerTest(
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
    void updateVisibility() {
        /*
         * 层级：用户和项目
         * 用户、项目可见性，0 私有，1 公开
         * +-------+-------+-------+----+----+
         * |                       | 0  | 1  |
         * +-------+-------+-------+----+----+
         * | u1(1)                 | N  |    |
         * |       +-------+-------+----+----+
         * |       | pj(1)         | Y  | Y  |
         * +-------+-------+-------+----+----+
         */
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult u1 = userFactory.viewer(session1);
        ProjectResult u1pj = projectFactory.create(session1);

        UpdateVisibilityInput input = new UpdateVisibilityInput();
        input.setFullPath(u1.getUsername());
        input.setVisibility(Visibility.PRIVATE);
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, null, ErrorType.BAD_REQUEST);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);

        input.setFullPath(u1pj.getFullPath());
        input.setVisibility(Visibility.PUBLIC);
        u1pj.setVisibility(input.getVisibility());
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, u1pj, null);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);

        input.setFullPath(u1pj.getFullPath());
        input.setVisibility(Visibility.PRIVATE);
        u1pj.setVisibility(input.getVisibility());
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, u1pj, null);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);

        /*
         * 层级：组织和项目
         * 组织、项目可见性，0 私有，1 公开
         * +-------+-------+-------+----+----+
         * |                       | 0  | 1  |
         * +-------+-------+-------+----+----+
         * | a1(0)                 |    | Y  |
         * |       +-------+-------+----+----+
         * |       | b1(0)         |    | N  |
         * +-------+-------+-------+----+----+
         * | a2(1)                 | N  |    |
         * |       +-------+-------+----+----+
         * |       | b1(1)         | Y  |    |
         * +-------+-------+-------+----+----+
         * | a3(0)                 |    | Y  |
         * |       +-------+-------+----+----+
         * |       | pj(0)         |    | N  |
         * +-------+-------+-------+----+----+
         * | a4(1)                 | N  |    |
         * |       +-------+-------+----+----+
         * |       | pj(1)         | Y  |    |
         * +-------+-------+-------+----+----+
         */

        GroupResult a1 = groupFactory.create(session1, null, Visibility.PRIVATE);
        GroupResult a1b1 = groupFactory.create(session1, a1, "b1", Visibility.PRIVATE);
        GroupResult a2 = groupFactory.create(session1, null, Visibility.PUBLIC);
        GroupResult a2b1 = groupFactory.create(session1, a2, "b1", Visibility.PUBLIC);
        GroupResult a3 = groupFactory.create(session1, null, Visibility.PRIVATE);
        ProjectResult a3pj = projectFactory.create(session1, a3, "pj", Visibility.PRIVATE);
        GroupResult a4 = groupFactory.create(session1, null, Visibility.PUBLIC);
        ProjectResult a4pj = projectFactory.create(session1, a4, "pj", Visibility.PUBLIC);

        input.setVisibility(Visibility.PUBLIC);
        input.setFullPath(a1b1.getFullPath());
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, null, ErrorType.BAD_REQUEST);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);
        input.setFullPath(a1.getFullPath());
        a1.setVisibility(input.getVisibility());
        mutationUpdateVisibility(session1, input, a1, null);

        input.setVisibility(Visibility.PRIVATE);
        input.setFullPath(a2.getFullPath());
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, null, ErrorType.BAD_REQUEST);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);
        input.setFullPath(a2b1.getFullPath());
        a2b1.setVisibility(input.getVisibility());
        mutationUpdateVisibility(session1, input, a2b1, null);

        input.setVisibility(Visibility.PUBLIC);
        input.setFullPath(a3pj.getFullPath());
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, null, ErrorType.BAD_REQUEST);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);
        input.setFullPath(a3.getFullPath());
        a3.setVisibility(input.getVisibility());
        mutationUpdateVisibility(session1, input, a3, null);

        input.setVisibility(Visibility.PRIVATE);
        input.setFullPath(a4.getFullPath());
        mutationUpdateVisibility(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateVisibility(session1, input, null, ErrorType.BAD_REQUEST);
        mutationUpdateVisibility(session2, input, null, ErrorType.FORBIDDEN);
        input.setFullPath(a4pj.getFullPath());
        a4pj.setVisibility(input.getVisibility());
        mutationUpdateVisibility(session1, input, a4pj, null);
    }

    @Test
    void updatePath() {
        /*
         * 层级：用户，项目
         * |                       | 1  | 2  | 3  |
         * +-------+-------+-------+----+----+----+
         * | u1(1)                 |    | u* |    |
         * |       +-------+-------+----+----+----+
         * |       | p1(0)         | pj |    |    |
         * |       +-------+-------+----+----+----+
         * |       | p2(1)         |    |    |    |
         * +-------+-------+-------+----+----+----+
         */
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        UserResult u1 = userFactory.viewer(session1);
        UserResult u2 = userFactory.viewer(session2);
        ProjectResult u1p1 = projectFactory.create(session1, u1.namespace(), "p1", Visibility.PRIVATE);
        ProjectResult u1p2 = projectFactory.create(session1, u1.namespace(), "p2", Visibility.PUBLIC);

        UpdatePathInput input = new UpdatePathInput();
        input.setFullPath(u1p1.getFullPath());
        input.setPath("pj");
        Assertions.assertNotEquals(u1p1.getPath(), input.getPath());
        u1p1.setPath(input.getPath());
        u1p1.setFullPath(u1p1.getFullPath().replaceFirst("p1", "pj"));
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);
        mutationUpdatePath(session1, input, u1p1, null);
        mutationUpdatePath(session2, input, null, ErrorType.NOT_FOUND);

        input.setFullPath(u1.getUsername());
        input.setPath(Faker.username());
        Assertions.assertNotEquals(u1.getUsername(), input.getPath());
        u1p1.setFullPath(u1p1.getFullPath().replaceFirst(u1.getUsername(), input.getPath()));
        u1p2.setFullPath(u1p2.getFullPath().replaceFirst(u1.getUsername(), input.getPath()));
        u1.setUsername(input.getPath());
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);
        mutationUpdatePath(session1, input, u1.namespace(), null);
        mutationUpdatePath(session2, input, null, ErrorType.NOT_FOUND);
        session1.setUsername(u1.getUsername());
        queryNamespace(session1, u1p1);
        queryNamespace(session1, u1p2);

        input.setFullPath(u1.getUsername());
        input.setPath(u2.getUsername());
        mutationUpdatePath(session1, input, null, ErrorType.INTERNAL_ERROR);

        /*
         * 层级：组织，项目
         * |                       | 1  | 2  | 3  |
         * +-------+-------+-------+----+----+----+
         * | a1(0)                 |    |    | aa |
         * |       +-------+-------+----+----+----+
         * |       | b1(0)         |    | bb |    |
         * |       |       +-------+----+----+----+
         * |       |       | c1(0) | cc |    |    |
         * |       |       +-------+----+----+----+
         * |       |       | p1(0) | pj |    |    |
         * +-------+-------+-------+----+----+----+
         * | a2(1)                 |    |    |    |
         * |       +-------+-------+----+----+----+
         * |       | b1(1)         |    |    |    |
         * +-------+-------+-------+----+----+----+
         */

        GroupResult a1 = groupFactory.create(session1, null, Visibility.PRIVATE);
        GroupResult a1b1 = groupFactory.create(session1, a1, "b1", Visibility.PRIVATE);
        GroupResult a1b1c1 = groupFactory.create(session1, a1b1, "c1", Visibility.PRIVATE);
        ProjectResult a1b1p1 = projectFactory.create(session1, a1b1, "p1", Visibility.PRIVATE);
        GroupResult a2 = groupFactory.create(session1, null, Visibility.PUBLIC);
        GroupResult a2b1 = groupFactory.create(session1, a2, "b1", Visibility.PUBLIC);

        input.setFullPath(a1b1p1.getFullPath());
        input.setPath("pj");
        Assertions.assertNotEquals(a1b1p1.getPath(), input.getPath());
        a1b1p1.setPath(input.getPath());
        a1b1p1.setFullPath(a1b1p1.getFullPath().replaceFirst("p1", "pj"));
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);
        mutationUpdatePath(session1, input, a1b1p1, null);
        mutationUpdatePath(session2, input, null, ErrorType.NOT_FOUND);

        input.setFullPath(a1b1c1.getFullPath());
        input.setPath("cc");
        Assertions.assertNotEquals(a1b1c1.getPath(), input.getPath());
        a1b1c1.setPath(input.getPath());
        a1b1c1.setFullPath(a1b1c1.getFullPath().replaceFirst("c1", "cc"));
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);
        mutationUpdatePath(session1, input, a1b1c1, null);
        mutationUpdatePath(session2, input, null, ErrorType.NOT_FOUND);

        input.setFullPath(a1b1.getFullPath());
        input.setPath("bb");
        Assertions.assertNotEquals(a1b1.getPath(), input.getPath());
        a1b1.setPath(input.getPath());
        a1b1.setFullPath(a1b1.getFullPath().replaceFirst("b1", "bb"));
        a1b1c1.setFullPath(a1b1c1.getFullPath().replaceFirst("b1", "bb"));
        a1b1p1.setFullPath(a1b1p1.getFullPath().replaceFirst("b1", "bb"));
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);
        mutationUpdatePath(session1, input, a1b1, null);
        mutationUpdatePath(session2, input, null, ErrorType.NOT_FOUND);
        queryNamespace(session1, a1b1c1);
        queryNamespace(session1, a1b1p1);

        queryNamespace(session1, a1);
        queryNamespace(session1, a2);
        queryNamespace(session1, a2b1);
    }

    private void mutationUpdateVisibility(SessionResult session, UpdateVisibilityInput input, NamespaceResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updateVisibility", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.namespace.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.namespace.name").entity(String.class).isEqualTo(result.getName())
                .path("payload.namespace.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("payload.namespace.path").entity(String.class).isEqualTo(result.getPath())
                .path("payload.namespace.fullPath").entity(String.class).isEqualTo(result.getFullPath())
                .path("payload.namespace.visibility").entity(Visibility.class).isEqualTo(result.getVisibility())
                .path("payload.namespace.description").entity(String.class).isEqualTo(result.getDescription());
    }

    private void mutationUpdatePath(SessionResult session, UpdatePathInput input, NamespaceResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updatePath", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.namespace.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.namespace.path").entity(String.class).isEqualTo(result.getPath())
                .path("payload.namespace.fullPath").entity(String.class).isEqualTo(result.getFullPath());
    }

    private void queryNamespace(SessionResult session, NamespaceResult result) {
        GraphQlTester.Response response = query("namespace", session)
                .variable("fullPath", result.getFullPath())
                .execute();

        response.path("namespace.name").entity(String.class).isEqualTo(result.getName())
                .path("namespace.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("namespace.path").entity(String.class).isEqualTo(result.getPath())
                .path("namespace.fullPath").entity(String.class).isEqualTo(result.getFullPath());
    }
}
