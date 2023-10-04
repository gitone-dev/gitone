package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.controllers.groups.inputs.CreateGroupInput;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.MemberFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.GroupPolicy;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.UserResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.util.List;
import java.util.Set;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class GroupQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final MemberFactory memberFactory;

    @Autowired
    public GroupQueryControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory,
            MemberFactory memberFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
        this.memberFactory = memberFactory;
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

        /*
         * 用户加入的组织
         * |                       | u1 | u2 | u3 |
         * +-------+-------+-------+ ---+----+----+
         * | a1(0)                 | Y  | N  | N  |
         * |       +-------+-------+----+----+----+
         * |       | b1(0)         | N  | Y  | N  |
         * |       |       +-------+----+----+----+
         * |       |       | c1(0) | N  | N  | Y  |
         * |       +-------+-------+----+----+----+
         * |       | b2(0)         | N  | N  | N  |
         * +-------+-------+-------+----+----+----+
         * | a2(0)                 | N  | N  | N  |
         * +-------+-------+-------+----+----+----+
         */
        SessionResult u1 = userFactory.viewer();
        SessionResult u2 = userFactory.viewer();
        SessionResult u3 = userFactory.viewer();

        UserResult u1u = queryViewer(u1);
        UserResult u2u = queryViewer(u2);
        UserResult u3u = queryViewer(u3);

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        memberFactory.create(session, a1.getId(), u1u.getId());

        GroupResult a1b1 = groupFactory.create(session, a1.getId(), "b1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1.getId(), u2u.getId());
        GroupResult a1b2 = groupFactory.create(session, a1.getId(), "b2", Visibility.PRIVATE);

        GroupResult a1b1c1 = groupFactory.create(session, a1b1.getId(), "c1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1c1.getId(), u3u.getId());

        GroupResult a2 = groupFactory.create(session, null, Visibility.PRIVATE);

        queryGroup(u1, a1.getFullPath(), null);
        queryGroup(u1, a2.getFullPath(), ErrorType.FORBIDDEN);
        queryGroup(u1, a1b1.getFullPath(), null);

        queryGroup(u2, a1.getFullPath(), null);
        queryGroup(u2, a1b1.getFullPath(), null);
        queryGroup(u2, a1b2.getFullPath(), ErrorType.FORBIDDEN);
        queryGroup(u2, a1b1c1.getFullPath(), null);
    }

    @Test
    void rootGroups() {
        /*
         * 组织成员二种情形：
         * 1. 直接加入组织
         * 3. 只加入了子组织
         *
         * 登录用户： v1
         * 被查询用户： u1
         * |               | v1 | u1 |
         * |-------+-------+----+----+
         * | a1(1)         |    |    |
         * |-------+-------+----+----+
         * | a2(1)         | Y  |    |
         * |-------+-------+----+----+
         * | a3(1)         |    | Y  |
         * |-------+-------+----+----+
         * | a4(0)         |    |    |
         * |-------+-------+----+----+
         * | a5(0)         | Y  |    |
         * |-------+-------+----+----+
         * | a6(0)         |    | Y  |
         * |-------+-------+----+----+
         * | a7(1)         | Y  |    |
         * |       +-------+----+----+
         * |       | b1(1) |    | Y  |
         * |-------+-------+----+----+
         * | a8(1)         |    | Y  |
         * |       +-------+----+----+
         * |       | b1(1) | Y  |    |
         * |-------+-------+----+----+
         * | a9(0)         | Y  |    |
         * |       +-------+----+----+
         * |       | b1(0) |    | Y  |
         * |-------+-------+----+----+
         * | a10(0)        |    | Y  |
         * |       +-------+----+----+
         * |       | b1(0) | Y  |    |
         * +-------+-------+----+----+
         */
        SessionResult session = userFactory.viewer();
        SessionResult v1 = userFactory.viewer();
        SessionResult u1 = userFactory.viewer();
        UserResult v1u = queryViewer(v1);
        UserResult u1u = queryViewer(u1);

        GroupResult a1 = groupFactory.create(session, Visibility.PUBLIC);
        GroupResult a2 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a2.getId(), v1u.getId());
        GroupResult a3 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a3.getId(), u1u.getId());

        GroupResult a4 = groupFactory.create(session, Visibility.PRIVATE);
        GroupResult a5 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a5.getId(), v1u.getId());
        GroupResult a6 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a6.getId(), u1u.getId());

        GroupResult a7 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a7.getId(), v1u.getId());
        GroupResult a7b1 = groupFactory.create(session, a7.getId(), "b1", Visibility.PUBLIC);
        memberFactory.create(session, a7b1.getId(), u1u.getId());

        GroupResult a8 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a8.getId(), u1u.getId());
        GroupResult a8b1 = groupFactory.create(session, a8.getId(), "b1", Visibility.PUBLIC);
        memberFactory.create(session, a8b1.getId(), v1u.getId());

        GroupResult a9 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a9.getId(), v1u.getId());
        GroupResult a9b1 = groupFactory.create(session, a9.getId(), "b1", Visibility.PRIVATE);
        memberFactory.create(session, a9b1.getId(), u1u.getId());

        GroupResult a10 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a10.getId(), u1u.getId());
        GroupResult a10b1 = groupFactory.create(session, a10.getId(), "b1", Visibility.PRIVATE);
        memberFactory.create(session, a10b1.getId(), v1u.getId());

        GroupFilter.By filterBy = new GroupFilter.By();
        GroupOrder order = new GroupOrder();
        order.setField(GroupOrderField.CREATED_AT);
        order.setDirection(OrderDirection.DESC);

        filterBy.setUsername(u1.getUsername());
        List<String> v1_u1 = List.of(
                a10.getId(), a9.getId(), a8.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(v1, v1_u1.size(), filterBy, order, v1_u1);
        filterBy.setRecursive(true);
        List<String> v1_u1_r = List.of(
                a10b1.getId(), a10.getId(),
                a9b1.getId(), a9.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(v1, v1_u1_r.size(), filterBy, order, v1_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v1_u = List.of(
                a10.getId(), a9.getId(), a8.getId(), a7.getId(),
                a5.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(v1, v1_u.size(), filterBy, order, v1_u);
        filterBy.setRecursive(true);
        List<String> v1_u_r = List.of(
                a10b1.getId(), a10.getId(),
                a9b1.getId(), a9.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a5.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(v1, v1_u_r.size(), filterBy, order, v1_u_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1.getUsername());
        List<String> v_u1 = List.of(
                a8.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(null, v_u1.size(), filterBy, order, v_u1);
        filterBy.setRecursive(true);
        List<String> v_u1_r = List.of(
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(null, v_u1_r.size(), filterBy, order, v_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v_u = List.of(
                a8.getId(), a7.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(null, v_u.size(), filterBy, order, v_u);
        filterBy.setRecursive(true);
        List<String> v_u_r = List.of(
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(null, v_u_r.size(), filterBy, order, v_u_r);
    }

    @Test
    void groupsByParent() {
        /*
         * 组织成员三种情形：
         * 1. 直接加入组织
         * 2. 只加入了父组织
         * 3. 只加入了子组织
         *
         * 登录用户： v1、v2
         * 被查询用户： u1、u2
         * |                       | v1 | u1 | v2 | u2 |
         * +-------+-------+-------+ ---+----+----+----+
         * | a1(1) |               | Y  | Y  |    |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b1(1)         |    |    |    |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b2(1)         |    |    | Y  |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b3(1)         |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b4(0)         |    |    |    |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b5(0)         |    |    | Y  |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b6(0)         |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b7(1)         |    |    | Y  |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | c1(1) |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b8(1)         |    |    |    | Y  |
         * |       |       +-------+----+----+----+----+
         * |       |       | c1(1) |    |    | Y  |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b9(0)         |    |    | Y  |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | c1(0) |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b10(0)        |    |    |    | Y  |
         * |       |       +-------+----+----+----+----+
         * |       |       | c1(0) |    |    | Y  |    |
         * +-------+-------+-------+----+----+----+----+
         * | a2(1)                 | Y  | Y  | Y  | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b1(1)         | Y  | Y  | Y  | Y  |
         * +-------+-------+-------+----+----+----+----+
         * | a3(0)                 |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         * | a4(0)                 |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         */
        SessionResult user = userFactory.viewer();

        SessionResult v1 = userFactory.viewer();
        SessionResult u1 = userFactory.viewer();
        SessionResult v2 = userFactory.viewer();
        SessionResult u2 = userFactory.viewer();

        UserResult v1u = queryViewer(v1);
        UserResult u1u = queryViewer(u1);
        UserResult v2u = queryViewer(v2);
        UserResult u2u = queryViewer(u2);

        GroupResult a1 = groupFactory.create(user, null, Visibility.PUBLIC);
        memberFactory.create(user, a1.getId(), v1u.getId());
        memberFactory.create(user, a1.getId(), u1u.getId());

        GroupResult a1b1 = groupFactory.create(user, a1.getId(), "b1", Visibility.PUBLIC);
        GroupResult a1b2 = groupFactory.create(user, a1.getId(), "b2", Visibility.PUBLIC);
        memberFactory.create(user, a1b2.getId(), v2u.getId());
        GroupResult a1b3 = groupFactory.create(user, a1.getId(), "b3", Visibility.PUBLIC);
        memberFactory.create(user, a1b3.getId(), u2u.getId());

        GroupResult a1b4 = groupFactory.create(user, a1.getId(), "b4", Visibility.PRIVATE);
        GroupResult a1b5 = groupFactory.create(user, a1.getId(), "b5", Visibility.PRIVATE);
        memberFactory.create(user, a1b5.getId(), v2u.getId());
        GroupResult a1b6 = groupFactory.create(user, a1.getId(), "b6", Visibility.PRIVATE);
        memberFactory.create(user, a1b6.getId(), u2u.getId());

        GroupResult a1b7 = groupFactory.create(user, a1.getId(), "b7", Visibility.PUBLIC);
        memberFactory.create(user, a1b7.getId(), v2u.getId());
        GroupResult a1b7c1 = groupFactory.create(user, a1b7.getId(), "c1", Visibility.PUBLIC);
        memberFactory.create(user, a1b7c1.getId(), u2u.getId());

        GroupResult a1b8 = groupFactory.create(user, a1.getId(), "b8", Visibility.PUBLIC);
        memberFactory.create(user, a1b8.getId(), u2u.getId());
        GroupResult a1b8c1 = groupFactory.create(user, a1b8.getId(), "c1", Visibility.PUBLIC);
        memberFactory.create(user, a1b8c1.getId(), v2u.getId());

        GroupResult a1b9 = groupFactory.create(user, a1.getId(), "b9", Visibility.PRIVATE);
        memberFactory.create(user, a1b9.getId(), v2u.getId());
        GroupResult a1b9c1 = groupFactory.create(user, a1b9.getId(), "c1", Visibility.PRIVATE);
        memberFactory.create(user, a1b9c1.getId(), u2u.getId());

        GroupResult a1b10 = groupFactory.create(user, a1.getId(), "b10", Visibility.PRIVATE);
        memberFactory.create(user, a1b10.getId(), u2u.getId());
        GroupResult a1b10c1 = groupFactory.create(user, a1b10.getId(), "c1", Visibility.PRIVATE);
        memberFactory.create(user, a1b10c1.getId(), v2u.getId());

        GroupResult a2 = groupFactory.create(user, null, Visibility.PUBLIC);
        memberFactory.create(user, a2.getId(), v1u.getId());
        memberFactory.create(user, a2.getId(), u1u.getId());
        memberFactory.create(user, a2.getId(), v2u.getId());
        memberFactory.create(user, a2.getId(), u2u.getId());
        GroupResult a2b1 = groupFactory.create(user, a2.getId(), "b1", Visibility.PUBLIC);
        memberFactory.create(user, a2b1.getId(), v1u.getId());
        memberFactory.create(user, a2b1.getId(), u1u.getId());
        memberFactory.create(user, a2b1.getId(), v2u.getId());
        memberFactory.create(user, a2b1.getId(), u2u.getId());

        GroupResult a3 = groupFactory.create(user, null, Visibility.PUBLIC);
        GroupResult a4 = groupFactory.create(user, null, Visibility.PRIVATE);

        GroupFilter.By filterBy = new GroupFilter.By();
        filterBy.setParentId(a1.getId());
        GroupOrder order = new GroupOrder();
        order.setField(GroupOrderField.CREATED_AT);
        order.setDirection(OrderDirection.ASC);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v1_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId());
        queryGroups(v1, v1_u1.size() + 1, filterBy, order, v1_u1);
        filterBy.setRecursive(true);
        List<String> v1_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId());
        queryGroups(v1, v1_u1_r.size() + 1, filterBy, order, v1_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v1_u2 = List.of(
                a1b3.getId(),
                a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId());
        queryGroups(v1, v1_u2.size() + 1, filterBy, order, v1_u2);
        filterBy.setRecursive(true);
        List<String> v1_u2_r = List.of(
                a1b3.getId(),
                a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId());
        queryGroups(v1, v1_u2_r.size() + 1, filterBy, order, v1_u2_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v2_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId());
        queryGroups(v2, v2_u1.size() + 1, filterBy, order, v2_u1);
        filterBy.setRecursive(true);
        filterBy.setUsername(u1u.getUsername());
        List<String> v2_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId()
        );
        queryGroups(v2, v2_u1_r.size() + 1, filterBy, order, v2_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v2_u2 = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId());
        queryGroups(v2, v2_u2.size() + 1, filterBy, order, v2_u2);
        filterBy.setRecursive(true);
        List<String> v2_u2_r = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId()
        );
        queryGroups(v2, v2_u2_r.size() + 1, filterBy, order, v2_u2_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v1_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId());
        queryGroups(v1, v1_u.size() + 1, filterBy, order, v1_u);
        filterBy.setRecursive(true);
        List<String> v1_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId()
        );
        queryGroups(v1, v1_u_r.size() + 1, filterBy, order, v1_u_r);

        filterBy.setRecursive(false);
        List<String> v2_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId());
        queryGroups(v2, v2_u.size() + 1, filterBy, order, v2_u);
        filterBy.setRecursive(true);
        List<String> v2_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId()
        );
        queryGroups(v2, v2_u_r.size() + 1, filterBy, order, v2_u_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b8.getId());
        queryGroups(null, v_u1.size() + 1, filterBy, order, v_u1);
        filterBy.setRecursive(true);
        List<String> v_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId()
        );
        queryGroups(null, v_u1_r.size() + 1, filterBy, order, v_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v_u2 = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b8.getId());
        queryGroups(null, v_u2.size() + 1, filterBy, order, v_u2);
        filterBy.setRecursive(true);
        List<String> v_u2_r = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId()
        );
        queryGroups(null, v_u2_r.size() + 1, filterBy, order, v_u2_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b8.getId());
        queryGroups(null, v_u.size() + 1, filterBy, order, v_u);
        filterBy.setRecursive(true);
        List<String> v_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId()
        );
        queryGroups(null, v_u_r.size() + 1, filterBy, order, v_u_r);
    }

    @Test
    void groupPolicy() {
        /*
         * 用户加入的组织
         * |                       | u1 | u2 | u3 |
         * +-------+-------+-------+----+----+----+
         * | a1(0)                 | Y  | N  | N  |
         * |       +-------+-------+----+----+----+
         * |       | b1(0)         | N  | Y  | N  |
         * |       |       +-------+----+----+----+
         * |       |       | c1(0) | N  | N  | Y  |
         * |       +-------+-------+----+----+----+
         * |       | b2(0)         | N  | N  | N  |
         * +-------+-------+-------+----+----+----+
         * | a2(0)                 | N  | N  | N  |
         * +-------+-------+-------+----+----+----+
         * | a3(1)                 | N  | N  | N  |
         * +-------+-------+-------+----+----+----+
         */
        SessionResult session = userFactory.viewer();
        SessionResult u1 = userFactory.viewer();
        SessionResult u2 = userFactory.viewer();
        SessionResult u3 = userFactory.viewer();
        UserResult u1u = queryViewer(u1);
        UserResult u2u = queryViewer(u2);
        UserResult u3u = queryViewer(u3);

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        memberFactory.create(session, a1.getId(), u1u.getId());

        GroupResult a1b1 = groupFactory.create(session, a1.getId(), "b1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1.getId(), u2u.getId());
        GroupResult a1b2 = groupFactory.create(session, a1.getId(), "b2", Visibility.PRIVATE);

        GroupResult a1b1c1 = groupFactory.create(session, a1b1.getId(), "c1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1c1.getId(), u3u.getId());

        GroupResult a2 = groupFactory.create(session, null, Visibility.PRIVATE);
        GroupResult a3 = groupFactory.create(session, null, Visibility.PUBLIC);

        queryGroupPolicy(u1, a1.getFullPath(), Access.MAINTAINER);
        queryGroupPolicy(u1, a2.getFullPath(), Access.NO_ACCESS);
        queryGroupPolicy(u1, a1b1.getFullPath(), Access.MAINTAINER);

        queryGroupPolicy(u2, a1.getFullPath(), Access.MIN_ACCESS);
        queryGroupPolicy(u2, a1b1.getFullPath(), Access.MAINTAINER);
        queryGroupPolicy(u2, a1b2.getFullPath(), Access.NO_ACCESS);
        queryGroupPolicy(u2, a1b1c1.getFullPath(), Access.MAINTAINER);

        queryGroupPolicy(null, a2.getFullPath(), Access.NO_ACCESS);
        queryGroupPolicy(null, a3.getFullPath(), Access.MIN_ACCESS);
    }

    void seed() {
        SessionResult user = userFactory.viewer("user");

        SessionResult v1 = userFactory.viewer("v1");
        SessionResult u1 = userFactory.viewer("u1");
        SessionResult v2 = userFactory.viewer("v2");
        SessionResult u2 = userFactory.viewer("u2");

        UserResult v1u = queryViewer(v1);
        UserResult u1u = queryViewer(u1);
        UserResult v2u = queryViewer(v2);
        UserResult u2u = queryViewer(u2);

        GroupResult a1 = groupFactory.create(user, null, "a1", Visibility.PUBLIC);
        memberFactory.create(user, a1.getId(), v1u.getId());
        memberFactory.create(user, a1.getId(), u1u.getId());

        GroupResult a1b1 = groupFactory.create(user, a1.getId(), "b1", Visibility.PUBLIC);
        GroupResult a1b2 = groupFactory.create(user, a1.getId(), "b2", Visibility.PUBLIC);
        memberFactory.create(user, a1b2.getId(), v2u.getId());
        GroupResult a1b3 = groupFactory.create(user, a1.getId(), "b3", Visibility.PUBLIC);
        memberFactory.create(user, a1b3.getId(), u2u.getId());

        GroupResult a1b4 = groupFactory.create(user, a1.getId(), "b4", Visibility.PRIVATE);
        GroupResult a1b5 = groupFactory.create(user, a1.getId(), "b5", Visibility.PRIVATE);
        memberFactory.create(user, a1b5.getId(), v2u.getId());
        GroupResult a1b6 = groupFactory.create(user, a1.getId(), "b6", Visibility.PRIVATE);
        memberFactory.create(user, a1b6.getId(), u2u.getId());

        GroupResult a1b7 = groupFactory.create(user, a1.getId(), "b7", Visibility.PUBLIC);
        memberFactory.create(user, a1b7.getId(), v2u.getId());
        GroupResult a1b7c1 = groupFactory.create(user, a1b7.getId(), "c1", Visibility.PUBLIC);
        memberFactory.create(user, a1b7c1.getId(), u2u.getId());

        GroupResult a1b8 = groupFactory.create(user, a1.getId(), "b8", Visibility.PUBLIC);
        memberFactory.create(user, a1b8.getId(), u2u.getId());
        GroupResult a1b8c1 = groupFactory.create(user, a1b8.getId(), "c1", Visibility.PUBLIC);
        memberFactory.create(user, a1b8c1.getId(), v2u.getId());

        GroupResult a1b9 = groupFactory.create(user, a1.getId(), "b9", Visibility.PRIVATE);
        memberFactory.create(user, a1b9.getId(), v2u.getId());
        GroupResult a1b9c1 = groupFactory.create(user, a1b9.getId(), "c1", Visibility.PRIVATE);
        memberFactory.create(user, a1b9c1.getId(), u2u.getId());

        GroupResult a1b10 = groupFactory.create(user, a1.getId(), "b10", Visibility.PRIVATE);
        memberFactory.create(user, a1b10.getId(), u2u.getId());
        GroupResult a1b10c1 = groupFactory.create(user, a1b10.getId(), "c1", Visibility.PRIVATE);
        memberFactory.create(user, a1b10c1.getId(), v2u.getId());

        GroupResult a2 = groupFactory.create(user, null, "a2", Visibility.PUBLIC);
        memberFactory.create(user, a2.getId(), v1u.getId());
        memberFactory.create(user, a2.getId(), u1u.getId());
        memberFactory.create(user, a2.getId(), v2u.getId());
        memberFactory.create(user, a2.getId(), u2u.getId());
        GroupResult a2b1 = groupFactory.create(user, a2.getId(), "b1", Visibility.PUBLIC);
        memberFactory.create(user, a2b1.getId(), v1u.getId());
        memberFactory.create(user, a2b1.getId(), u1u.getId());
        memberFactory.create(user, a2b1.getId(), v2u.getId());
        memberFactory.create(user, a2b1.getId(), u2u.getId());

        GroupResult a3 = groupFactory.create(user, null, "a3", Visibility.PUBLIC);
        GroupResult a4 = groupFactory.create(user, null, "a4", Visibility.PRIVATE);
    }

    private void queryGroup(SessionResult session, String fullPath, ErrorType errorType) {
        GraphQlTester.Response response = query("group", session)
                .variable("fullPath", fullPath)
                .execute();
        if (errorType == null) {
            response.path("group.fullPath").entity(String.class).isEqualTo(fullPath);
        } else {
            response.errors().expect(e -> e.getErrorType().equals(errorType));
        }
    }

    private void queryGroups(SessionResult session, Integer first, GroupFilter.By filterBy, GroupOrder order, List<String> ids) {
        GraphQlTester.Response response = query("groups", session)
                .variable("first", first)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute();
        response.path("groups.edges").entityList(Object.class).hasSize(ids.size());
        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("groups.edges[%d].node.id", i)).entity(String.class).isEqualTo(ids.get(i));
        }
    }

    private void queryGroupPolicy(SessionResult session, String fullPath, Access access) {
        GraphQlTester.Response response = query("groupPolicy", session)
                .variable("fullPath", fullPath)
                .execute();
        response.path("groupPolicy.access").entity(Access.class).isEqualTo(access);

        Set<Action> actions = GroupPolicy.forAccess(access);
        GraphQlTester.EntityList<Action> entityList = response.path("groupPolicy.actions").entityList(Action.class);
        entityList.hasSize(actions.size());
        for (Action action : actions) {
            entityList.contains(action);
        }
    }
}
