package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.controllers.groups.inputs.*;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.SessionResult;
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

    @Autowired
    public GroupMutationControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory, GroupFactory groupFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
    }

    @Test
    void createGroup() {
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();

        // 一层
        CreateGroupInput input = groupFactory.createGroupInput();
        mutationCreateGroup(null, input, ErrorType.UNAUTHORIZED);
        GroupResult group1 = groupFactory.create(session1, input);
        queryGroupMembers(session1, group1);

        // 二层
        input.setParentId(group1.getId());
        mutationCreateGroup(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateGroup(session2, input, ErrorType.FORBIDDEN);
        GroupResult group2 = groupFactory.create(session1, group1, input);
        queryGroupMembers(session1, group2);
    }

    @Test
    void deleteGroup() {
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();

        GroupResult group1 = groupFactory.create(session1);
        GroupResult group2 = groupFactory.create(session1, group1);

        mutationDeleteGroup(session1, group1, ErrorType.BAD_REQUEST);

        // 二层
        CreateGroupInput input = groupFactory.createGroupInput();
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
         * 组织 name
         * |                       | 1  | 2  | 3  |
         * +-------+-------+-------+----+----+----+
         * | A1(0)                 |    |    | AA |
         * |       +-------+-------+----+----+----+
         * |       | B1(0)         |    | BA |    |
         * |       |       +-------+----+----+----+
         * |       |       | C1(0) | CA |    |    |
         * +-------+-------+-------+----+----+----+
         * | A2(1)                 |    |    |    |
         * +-------+-------+-------+----+----+----+
         */

        SessionResult session = userFactory.viewer();
        SessionResult user = userFactory.viewer();

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        GroupResult a1b1 = groupFactory.create(session, a1, "b1", Visibility.PRIVATE);
        GroupResult a1b1c1 = groupFactory.create(session, a1b1, "c1", Visibility.PRIVATE);
        GroupResult a2 = groupFactory.create(session, null, Visibility.PUBLIC);

        /*
         * 非 name 修改
         */

        UpdateGroupInput updateGroupInput = new UpdateGroupInput();
        updateGroupInput.setId(a1b1c1.getId());
        updateGroupInput.setName(a1b1c1.getName());
        updateGroupInput.setDescription(Faker.username() + " description");
        a1b1c1.setDescription(updateGroupInput.getDescription());
        mutationUpdateGroup(session, updateGroupInput, a1b1c1);
        queryNamespace(session, a1b1c1);

        /*
         * name 修改，层级
         */

        updateGroupInput.setId(a1b1c1.getId());
        updateGroupInput.setName("CA");
        updateGroupInput.setDescription(a1b1c1.getDescription());
        Assertions.assertNotEquals(a1b1c1.getName(), updateGroupInput.getName());

        a1b1c1.setName(updateGroupInput.getName());
        a1b1c1.setFullName(a1b1c1.getFullName().replaceFirst("C1", "CA"));
        mutationUpdateGroup(session, updateGroupInput, a1b1c1);
        queryNamespace(session, a1b1c1);

        updateGroupInput.setId(a1b1.getId());
        updateGroupInput.setName("BA");
        updateGroupInput.setDescription(a1b1.getDescription());
        Assertions.assertNotEquals(a1b1.getName(), updateGroupInput.getName());

        a1b1.setName(updateGroupInput.getName());
        a1b1.setFullName(a1b1.getFullName().replaceFirst("B1", "BA"));
        a1b1c1.setFullName(a1b1c1.getFullName().replaceFirst("B1", "BA"));
        mutationUpdateGroup(session, updateGroupInput, a1b1);
        queryNamespace(session, a1b1);
        queryNamespace(session, a1b1c1);

        /*
         * 权限
         */

        mutate("updateGroup", updateGroupInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        mutate("updateGroup", user, updateGroupInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.FORBIDDEN));
    }

    @Test
    void updateGroupPath() {
        /*
         * 组织
         * |                       | 1  | 2  | 3  |
         * +-------+-------+-------+----+----+----+
         * | a1(0)                 |    |    | aa |
         * |       +-------+-------+----+----+----+
         * |       | b1(0)         |    | ba |    |
         * |       |       +-------+----+----+----+
         * |       |       | c1(0) | ca |    |    |
         * +-------+-------+-------+----+----+----+
         * | a2(1)                 |    |    |    |
         * +-------+-------+-------+----+----+----+
         */

        SessionResult session = userFactory.viewer();
        SessionResult user = userFactory.viewer();

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        GroupResult a1b1 = groupFactory.create(session, a1, "b1", Visibility.PRIVATE);
        GroupResult a1b1c1 = groupFactory.create(session, a1b1, "c1", Visibility.PRIVATE);
        GroupResult a2 = groupFactory.create(session, null, Visibility.PUBLIC);

        /*
         * 层级修改
         */

        UpdateGroupPathInput updateGroupPathInput = new UpdateGroupPathInput();
        updateGroupPathInput.setId(a1b1c1.getId());
        updateGroupPathInput.setPath("ca");
        Assertions.assertNotEquals(a1b1c1.getPath(), updateGroupPathInput.getPath());

        a1b1c1.setPath(updateGroupPathInput.getPath());
        a1b1c1.setFullPath(a1b1c1.getFullPath().replaceFirst("c1", "ca"));
        mutationUpdateGroupPath(session, updateGroupPathInput, a1b1c1);
        queryNamespace(session, a1b1c1);

        updateGroupPathInput.setId(a1b1.getId());
        updateGroupPathInput.setPath("ba");
        Assertions.assertNotEquals(a1b1.getPath(), updateGroupPathInput.getPath());

        a1b1.setPath(updateGroupPathInput.getPath());
        a1b1.setFullPath(a1b1.getFullPath().replaceFirst("b1", "ba"));
        a1b1c1.setFullPath(a1b1c1.getFullPath().replaceFirst("b1", "ba"));
        mutationUpdateGroupPath(session, updateGroupPathInput, a1b1);
        queryNamespace(session, a1b1);
        queryNamespace(session, a1b1c1);

        /*
         * 权限
         */

        mutationUpdateGroupPath(null, updateGroupPathInput, ErrorType.UNAUTHORIZED);
        mutationUpdateGroupPath(user, updateGroupPathInput, ErrorType.FORBIDDEN);
    }

    @Test
    void updateGroupVisibility() {
        /*
         * 组织可见性，0 私有，1 公开
         * +-------+-------+-------+----+----+
         * |                       | 0  | 1  |
         * +-------+-------+-------+----+----+
         * | a1(0)                 |    | Y  |
         * |       +-------+-------+----+----+
         * |       | b1(0)         |    | N  |
         * |       |       +-------+----+----+
         * |       |       | c1(0) |    | N  |
         * +-------+-------+-------+----+----+
         * | a2(1)                 | N  |    |
         * |       +-------+-------+----+----+
         * |       | b1(1)         | N  |    |
         * |       |       +-------+----+----+
         * |       |       | c1(1) | Y  |    |
         * +-------+-------+-------+----+----+
         */

        SessionResult session = userFactory.viewer();
        SessionResult user = userFactory.viewer();

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        GroupResult a1b1 = groupFactory.create(session, a1, "b1", Visibility.PRIVATE);
        GroupResult a1b1c1 = groupFactory.create(session, a1b1, "c1", Visibility.PRIVATE);

        GroupResult a2 = groupFactory.create(session, null, Visibility.PUBLIC);
        GroupResult a2b1 = groupFactory.create(session, a2, "b1", Visibility.PUBLIC);
        GroupResult a2b1c1 = groupFactory.create(session, a2b1, "c1", Visibility.PUBLIC);

        /*
         * 层级
         */

        UpdateGroupVisibilityInput input = new UpdateGroupVisibilityInput();
        input.setVisibility(Visibility.PUBLIC);

        input.setId(a1b1c1.getId());
        mutationUpdateGroupVisibility(session, input, ErrorType.BAD_REQUEST);
        input.setId(a1b1.getId());
        mutationUpdateGroupVisibility(session, input, ErrorType.BAD_REQUEST);
        input.setId(a1.getId());
        mutationUpdateGroupVisibility(session, input, null);

        input.setVisibility(Visibility.PRIVATE);

        input.setId(a2.getId());
        mutationUpdateGroupVisibility(session, input, ErrorType.BAD_REQUEST);
        input.setId(a2b1.getId());
        mutationUpdateGroupVisibility(session, input, ErrorType.BAD_REQUEST);
        input.setId(a2b1c1.getId());

        /*
         * 权限
         */

        mutationUpdateGroupVisibility(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateGroupVisibility(user, input, ErrorType.FORBIDDEN);
    }

    private void mutationCreateGroup(SessionResult session, CreateGroupInput input, ErrorType errorType) {
        mutate("createGroup", session, input)
                .errors().expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateGroupVisibility(SessionResult session, UpdateGroupVisibilityInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updateGroupVisibility", session, input);
        if (errorType != null) {
            response.errors().expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.group.id").entity(String.class).isEqualTo(input.getId())
                .path("payload.group.visibility").entity(Visibility.class).isEqualTo(input.getVisibility());
    }

    private void mutationUpdateGroup(SessionResult session, UpdateGroupInput input, GroupResult result) {
        mutate("updateGroup", session, input)
                .path("payload.group.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.group.name").entity(String.class).isEqualTo(result.getName())
                .path("payload.group.fullName").entity(String.class).isEqualTo(result.getFullName())
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

    private void mutationUpdateGroupPath(SessionResult session, UpdateGroupPathInput input, ErrorType errorType) {
        mutate("updateGroupPath", session, input)
                .errors().expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateGroupPath(SessionResult session, UpdateGroupPathInput input, GroupResult result) {
        mutate("updateGroupPath", session, input)
                .path("payload.group.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.group.path").entity(String.class).isEqualTo(result.getPath())
                .path("payload.group.fullPath").entity(String.class).isEqualTo(result.getFullPath());
    }

    private void queryNamespace(SessionResult session, GroupResult group) {
        GraphQlTester.Response response = query("namespace", session)
                .variable("fullPath", group.getFullPath())
                .execute();

        response.path("namespace.path").entity(String.class).isEqualTo(group.getPath())
                .path("namespace.fullPath").entity(String.class).isEqualTo(group.getFullPath());
    }

    private void queryGroupMembers(SessionResult session, GroupResult group) {
        query("groupMembers", session)
                .variable("fullPath", group.getFullPath()).variable("first", 10)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(1)
                .path("group.members.edges[0].node.access").entity(Access.class).isEqualTo(Access.OWNER)
                .path("group.members.edges[0].node.user.username").entity(String.class).isEqualTo(session.getUsername());
    }
}
