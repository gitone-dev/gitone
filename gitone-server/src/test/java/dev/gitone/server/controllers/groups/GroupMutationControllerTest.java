package dev.gitone.server.controllers.groups;

import dev.gitone.server.controllers.groups.inputs.CreateGroupInput;
import dev.gitone.server.controllers.groups.inputs.DeleteGroupInput;
import dev.gitone.server.controllers.groups.inputs.UpdateGroupInput;
import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.Visibility;
import dev.gitone.server.factories.BaseFactory;
import dev.gitone.server.factories.GroupFactory;
import dev.gitone.server.factories.ProjectFactory;
import dev.gitone.server.factories.UserFactory;
import dev.gitone.server.faker.Faker;
import dev.gitone.server.results.GroupResult;
import dev.gitone.server.results.NamespaceResult;
import dev.gitone.server.results.ProjectResult;
import dev.gitone.server.results.SessionResult;
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
class GroupMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    @Autowired
    public GroupMutationControllerTest(
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
    void createGroup() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        // 一层
        CreateGroupInput input = groupFactory.createGroupInput();
        mutationCreateGroup(null, input, ErrorType.UNAUTHORIZED);
        GroupResult group1 = groupFactory.create(session1, input);
        queryMembers(session1, group1.getFullPath());

        // 二层
        input.setParentId(group1.getId());
        mutationCreateGroup(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateGroup(session2, input, ErrorType.FORBIDDEN);
        GroupResult group2 = groupFactory.create(session1, group1, input);
        queryMembers(session1, group2.getFullPath());
    }

    @Test
    void deleteGroup() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        GroupResult group1 = groupFactory.create(session1);
        GroupResult group2 = groupFactory.create(session1, group1);

        mutationDeleteGroup(session1, group1, ErrorType.BAD_REQUEST);

        // 二层
        mutationDeleteGroup(null, group2, ErrorType.UNAUTHORIZED);
        mutationDeleteGroup(session2, group2, ErrorType.FORBIDDEN);
        mutationDeleteGroup(session1, group2, null);
        mutationDeleteGroup(session1, group2, ErrorType.NOT_FOUND);

        // 一层
        mutationDeleteGroup(null, group1, ErrorType.UNAUTHORIZED);
        mutationDeleteGroup(session2, group1, ErrorType.FORBIDDEN);
        mutationDeleteGroup(session1, group1, null);
        mutationDeleteGroup(session1, group1, ErrorType.NOT_FOUND);
    }

    @Test
    void updateGroup() {
        /*
         * 组织 name, 项目 name
         * |                       | 1  | 2  | 3  |
         * +-------+-------+-------+----+----+----+
         * | A1(0)                 |    |    | AA |
         * |       +-------+-------+----+----+----+
         * |       | B1(0)         |    | BA |    |
         * |       |       +-------+----+----+----+
         * |       |       | C1(0) | CA |    |    |
         * |       |       +-------+----+----+----+
         * |       |       | PJ(0) |    |    |    |
         * +-------+-------+-------+----+----+----+
         * | A2(1)                 |    |    |    |
         * |       +-------+-------+----+----+----+
         * |       | B1(1)         |    |    |    |
         * +-------+-------+-------+----+----+----+
         */

        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        GroupResult a1 = groupFactory.create(session1, null, Visibility.PRIVATE);
        GroupResult a1b1 = groupFactory.create(session1, a1, "b1", Visibility.PRIVATE);
        GroupResult a1b1c1 = groupFactory.create(session1, a1b1, "c1", Visibility.PRIVATE);
        ProjectResult a1b1pj = projectFactory.create(session1, a1b1, "p1", Visibility.PRIVATE);
        GroupResult a2 = groupFactory.create(session1, null, Visibility.PUBLIC);
        GroupResult a2b1 = groupFactory.create(session1, a2, "b1", Visibility.PUBLIC);

        /*
         * 非 name 修改
         */

        UpdateGroupInput input = new UpdateGroupInput();
        input.setId(a1b1c1.getId());
        input.setName(a1b1c1.getName());
        input.setDescription(Faker.username() + " description");
        a1b1c1.setDescription(input.getDescription());
        mutationUpdateGroup(session1, input, a1b1c1, null);
        queryNamespace(session1, a1b1c1);

        /*
         * name 修改，层级
         */

        input.setId(a1b1c1.getId());
        input.setName("CA");
        input.setDescription(a1b1c1.getDescription());
        Assertions.assertNotEquals(a1b1c1.getName(), input.getName());

        a1b1c1.setName(input.getName());
        a1b1c1.setFullName(a1b1c1.getFullName().replaceFirst("C1", "CA"));
        mutationUpdateGroup(session1, input, a1b1c1, null);

        input.setId(a1b1.getId());
        input.setName("BA");
        input.setDescription(a1b1.getDescription());
        Assertions.assertNotEquals(a1b1.getName(), input.getName());

        a1b1.setName(input.getName());
        a1b1.setFullName(a1b1.getFullName().replaceFirst("B1", "BA"));
        a1b1c1.setFullName(a1b1c1.getFullName().replaceFirst("B1", "BA"));
        a1b1pj.setFullName(a1b1pj.getFullName().replaceFirst("B1", "BA"));
        mutationUpdateGroup(session1, input, a1b1, null);
        queryNamespace(session1, a1b1c1);
        queryNamespace(session1, a1b1pj);

        queryNamespace(session1, a2);
        queryNamespace(session1, a2b1);

        /*
         * 权限
         */

        mutationUpdateGroup(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateGroup(session2, input, null, ErrorType.FORBIDDEN);
    }

    private void mutationCreateGroup(SessionResult session, CreateGroupInput input, ErrorType errorType) {
        mutate("createGroup", session, input)
                .errors().expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateGroup(SessionResult session, UpdateGroupInput input, GroupResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updateGroup", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.group.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.group.name").entity(String.class).isEqualTo(result.getName())
                .path("payload.group.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("payload.group.path").entity(String.class).isEqualTo(result.getPath())
                .path("payload.group.fullPath").entity(String.class).isEqualTo(result.getFullPath())
                .path("payload.group.description").entity(String.class).isEqualTo(result.getDescription());
    }

    private void mutationDeleteGroup(SessionResult session, GroupResult group, ErrorType errorType) {
        DeleteGroupInput deleteGroupInput = new DeleteGroupInput();
        deleteGroupInput.setId(group.getId());

        GraphQlTester.Response response = mutate("deleteGroup", session, deleteGroupInput);
        if (errorType != null) {
            response.errors().expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.group.id").entity(String.class).isEqualTo(group.getId());
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

    private void queryMembers(SessionResult session, String fullPath) {
        query("members", session)
                .variable("fullPath", fullPath).variable("first", 10)
                .execute()
                .path("members.edges").entityList(Object.class).hasSize(1)
                .path("members.edges[0].node.access").entity(Access.class).isEqualTo(Access.OWNER)
                .path("members.edges[0].node.user.username").entity(String.class).isEqualTo(session.getUsername());
    }
}
