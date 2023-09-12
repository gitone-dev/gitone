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
        SessionResult session = userFactory.viewer();

        CreateGroupInput createGroupInput = groupFactory.createGroupInput();

        mutate("createGroup", createGroupInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        mutate("createGroup", session, createGroupInput)
                .path("payload.group.name").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("payload.group.path").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("payload.group.fullName").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("payload.group.fullPath").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("payload.group.description").entity(String.class).isEqualTo(createGroupInput.getDescription())
                .path("payload.group.visibility").entity(Visibility.class).isEqualTo(createGroupInput.getVisibility());

        query("groupMembers", session)
                .variable("fullPath", createGroupInput.getPath()).variable("first", 10)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(1)
                .path("group.members.edges[0].node.access").entity(Access.class).isEqualTo(Access.OWNER)
                .path("group.members.edges[0].node.user.username").entity(String.class).isEqualTo(session.getUsername());

        query("namespace", session)
                .variable("fullPath", createGroupInput.getPath())
                .execute()
                .path("namespace.name").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("namespace.path").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("namespace.fullName").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("namespace.fullPath").entity(String.class).isEqualTo(createGroupInput.getPath());
    }

    @Test
    void deleteGroup() {
        SessionResult session = userFactory.viewer();
        GroupResult groupResult = groupFactory.create(session);

        DeleteGroupInput deleteGroupInput = new DeleteGroupInput();
        deleteGroupInput.setId(groupResult.getId());

        mutate("deleteGroup", deleteGroupInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("deleteGroup", session, deleteGroupInput)
                .errors().verify();
        mutate("deleteGroup", session, deleteGroupInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));

        query("namespace")
                .variable("fullPath", groupResult.getFullPath())
                .execute()
                .errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));
    }

    @Test
    void updateGroup() {
        SessionResult session = userFactory.viewer();
        GroupResult groupResult = groupFactory.create(session);

        UpdateGroupInput updateGroupInput = new UpdateGroupInput();
        updateGroupInput.setId(groupResult.getId());
        updateGroupInput.setName(Faker.username().toUpperCase());
        updateGroupInput.setDescription(Faker.username() + " description");

        mutate("updateGroup", updateGroupInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("updateGroup", session, updateGroupInput)
                .path("payload.group.id").entity(String.class).isEqualTo(updateGroupInput.getId())
                .path("payload.group.name").entity(String.class).isEqualTo(updateGroupInput.getName())
                .path("payload.group.fullName").entity(String.class).isEqualTo(updateGroupInput.getName())
                .path("payload.group.description").entity(String.class).isEqualTo(updateGroupInput.getDescription());

        query("namespace", session)
                .variable("fullPath", groupResult.getPath())
                .execute()
                .path("namespace.name").entity(String.class).isEqualTo(updateGroupInput.getName())
                .path("namespace.fullName").entity(String.class).isEqualTo(updateGroupInput.getName());
    }

    @Test
    void updateGroupPath() {
        SessionResult session = userFactory.viewer();
        GroupResult groupResult = groupFactory.create(session);

        UpdateGroupPathInput updateGroupPathInput = new UpdateGroupPathInput();
        updateGroupPathInput.setId(groupResult.getId());
        updateGroupPathInput.setPath(Faker.path());

        Assertions.assertNotEquals(groupResult.getPath(), updateGroupPathInput.getPath());

        mutate("updateGroupPath", updateGroupPathInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("updateGroupPath", session, updateGroupPathInput)
                .path("payload.group.id").entity(String.class).isEqualTo(updateGroupPathInput.getId())
                .path("payload.group.path").entity(String.class).isEqualTo(updateGroupPathInput.getPath())
                .path("payload.group.fullPath").entity(String.class).isEqualTo(updateGroupPathInput.getPath());

        query("namespace", session)
                .variable("fullPath", groupResult.getPath())
                .execute()
                .errors().expect(e -> e.getErrorType().equals(ErrorType.NOT_FOUND));

        query("namespace", session)
                .variable("fullPath", updateGroupPathInput.getPath())
                .execute()
                .path("namespace.path").entity(String.class).isEqualTo(updateGroupPathInput.getPath())
                .path("namespace.fullPath").entity(String.class).isEqualTo(updateGroupPathInput.getPath());
    }

    @Test
    void updateGroupVisibility() {
        SessionResult session = userFactory.viewer();
        GroupResult groupResult = groupFactory.create(session);

        UpdateGroupVisibilityInput updateGroupVisibilityInput = new UpdateGroupVisibilityInput();
        updateGroupVisibilityInput.setId(groupResult.getId());
        updateGroupVisibilityInput.setVisibility(Visibility.PUBLIC);

        Assertions.assertNotEquals(groupResult.getVisibility(), updateGroupVisibilityInput.getVisibility());

        mutate("updateGroupVisibility", updateGroupVisibilityInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("updateGroupVisibility", session, updateGroupVisibilityInput)
                .path("payload.group.id").entity(String.class).isEqualTo(updateGroupVisibilityInput.getId())
                .path("payload.group.visibility").entity(Visibility.class).isEqualTo(updateGroupVisibilityInput.getVisibility());
    }
}
