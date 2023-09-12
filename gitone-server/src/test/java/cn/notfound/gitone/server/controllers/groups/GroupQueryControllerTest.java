package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.controllers.groups.inputs.CreateGroupInput;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
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

import java.util.List;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class GroupQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    @Autowired
    public GroupQueryControllerTest(WebGraphQlTester graphQlTester, UserFactory userFactory, GroupFactory groupFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
    }

    @Test
    void group() {
        SessionResult session = userFactory.viewer();

        CreateGroupInput createGroupInput = groupFactory.createGroupInput();
        createGroupInput.setVisibility(Visibility.PRIVATE);
        groupFactory.create(session, createGroupInput);

        query("group")
                .variable("fullPath", createGroupInput.getPath())
                .execute()
                .errors().expect(e -> e.getErrorType().equals(ErrorType.FORBIDDEN));

        query("group", session)
                .variable("fullPath", createGroupInput.getPath())
                .execute()
                .path("group.name").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("group.path").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("group.fullName").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("group.fullPath").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("group.description").entity(String.class).isEqualTo(createGroupInput.getDescription())
                .path("group.visibility").entity(Visibility.class).isEqualTo(createGroupInput.getVisibility());

        createGroupInput = groupFactory.createGroupInput();
        createGroupInput.setVisibility(Visibility.PUBLIC);
        groupFactory.create(session, createGroupInput);

        query("group")
                .variable("fullPath", createGroupInput.getPath())
                .execute()
                .path("group.name").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("group.path").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("group.fullName").entity(String.class).isEqualTo(createGroupInput.getName())
                .path("group.fullPath").entity(String.class).isEqualTo(createGroupInput.getPath())
                .path("group.description").entity(String.class).isEqualTo(createGroupInput.getDescription())
                .path("group.visibility").entity(Visibility.class).isEqualTo(createGroupInput.getVisibility());
    }

    @Test
    void groups() {
        SessionResult session1 = userFactory.viewer();
        GroupResult group11 = groupFactory.create(session1, Visibility.PUBLIC);
        GroupResult group12 = groupFactory.create(session1, Visibility.PUBLIC);
        GroupResult group13 = groupFactory.create(session1, Visibility.PUBLIC);

        GroupFilter.By filterBy = new GroupFilter.By();
        filterBy.setVisibility(Visibility.PUBLIC);

        GroupOrder order = new GroupOrder();
        order.setField(GroupOrderField.CREATED_AT);
        order.setDirection(OrderDirection.DESC);

        String endCursor = query("groups")
                .variable("first", 2)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(2)
                .path("groups.edges[0].node.id").entity(String.class).isEqualTo(group13.getId())
                .path("groups.edges[1].node.id").entity(String.class).isEqualTo(group12.getId())
                .path("groups.pageInfo.endCursor").entity(String.class).get();
        endCursor = query("groups")
                .variable("first", 1)
                .variable("after", endCursor)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(1)
                .path("groups.edges[0].node.id").entity(String.class).isEqualTo(group11.getId())
                .path("groups.pageInfo.endCursor").entity(String.class).get();

        order.setDirection(OrderDirection.ASC);
        endCursor= query("groups")
                .variable("first", 1)
                .variable("after", endCursor)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(1)
                .path("groups.edges[0].node.id").entity(String.class).isEqualTo(group12.getId())
                .path("groups.pageInfo.endCursor").entity(String.class).get();
        query("groups")
                .variable("first", 1)
                .variable("after", endCursor)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(1)
                .path("groups.edges[0].node.id").entity(String.class).isEqualTo(group13.getId());

        SessionResult session2 = userFactory.viewer();
        GroupResult group21 = groupFactory.create(session2, Visibility.PUBLIC);
        GroupResult group22 = groupFactory.create(session2, Visibility.PRIVATE);

        filterBy.setUsername(session2.getUsername());
        query("groups")
                .variable("first", 10)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(1)
                .path("groups.edges[0].node.id").entity(String.class).isEqualTo(group21.getId());
        query("groups", session1)
                .variable("first", 10)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(1)
                .path("groups.edges[0].node.id").entity(String.class).isEqualTo(group21.getId());

        filterBy.setVisibility(null);
        query("groups")
                .variable("first", 10)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .errors()
                .expect((e) -> e.getErrorType().equals(ErrorType.BAD_REQUEST));
        query("groups", session1)
                .variable("first", 10)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .errors()
                .expect((e) -> e.getErrorType().equals(ErrorType.BAD_REQUEST));
        query("groups", session2)
                .variable("first", 10)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute()
                .path("groups.edges").entityList(Object.class).hasSize(2);
    }

    @Test
    void groupPolicy() {
        SessionResult session = userFactory.viewer();
        GroupResult group1 = groupFactory.create(session, Visibility.PUBLIC);
        GroupResult group2 = groupFactory.create(session, Visibility.PRIVATE);

        query("groupPolicy")
                .variable("fullPath", group1.getFullPath())
                .execute()
                .path("groupPolicy.access").entity(Access.class).isEqualTo(Access.REPORTER)
                .path("groupPolicy.actions").entityList(Action.class).hasSize(2)
                .contains(Action.READ, Action.READ_MEMBER);
        query("groupPolicy")
                .variable("fullPath", group2.getFullPath())
                .execute()
                .path("groupPolicy.access").entity(Access.class).isEqualTo(Access.NO_ACCESS)
                .path("groupPolicy.actions").entityList(Action.class).hasSize(0);
        query("groupPolicy", session)
                .variable("fullPath", group2.getFullPath())
                .execute()
                .path("groupPolicy.access").entity(Access.class).isEqualTo(Access.OWNER)
                .path("groupPolicy.actions").entityList(Action.class).hasSize(7);
    }
}
