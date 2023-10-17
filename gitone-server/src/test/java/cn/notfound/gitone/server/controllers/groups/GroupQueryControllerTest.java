package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.*;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.ProjectResult;
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

    private final ProjectFactory projectFactory;

    private final MemberFactory memberFactory;

    @Autowired
    public GroupQueryControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory,
            ProjectFactory projectFactory,
            MemberFactory memberFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
        this.projectFactory = projectFactory;
        this.memberFactory = memberFactory;
    }

    @Test
    void group() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        GroupResult group1 = groupFactory.create(session1, Visibility.PRIVATE);
        groupFactory.queryGroup(session1, group1.getFullPath(), group1);
        groupFactory.queryGroup(session2, group1.getFullPath(), ErrorType.FORBIDDEN);
        groupFactory.queryGroup(null, group1.getFullPath(), ErrorType.UNAUTHORIZED);

        GroupResult group2 = groupFactory.create(session1, Visibility.PUBLIC);
        groupFactory.queryGroup(session1, group2.getFullPath(), group2);
        groupFactory.queryGroup(session2, group2.getFullPath(), group2);
        groupFactory.queryGroup(null, group2.getFullPath(), group2);

        /*
         * 用户加入的组织和项目 pj
         * |                       | u1 | u2 | u3 | u4 |
         * +-------+-------+-------+ ---+----+----+----+
         * | a1(0)                 | Y  |    |    |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b1(0)         |    | Y  |    |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | c1(0) |    |    | Y  |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | pj(0) |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b2(0)         |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         * | a2(0)                 |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         */
        SessionResult u1 = userFactory.session();
        SessionResult u2 = userFactory.session();
        SessionResult u3 = userFactory.session();
        SessionResult u4 = userFactory.session();

        UserResult u1u = userFactory.viewer(u1);
        UserResult u2u = userFactory.viewer(u2);
        UserResult u3u = userFactory.viewer(u3);
        UserResult u4u = userFactory.viewer(u4);

        GroupResult a1 = groupFactory.create(session1, Visibility.PRIVATE);
        memberFactory.create(session1, a1, u1u.getId());

        GroupResult a1b1 = groupFactory.create(session1, a1, "b1", Visibility.PRIVATE);
        memberFactory.create(session1, a1b1, u2u.getId());
        GroupResult a1b2 = groupFactory.create(session1, a1, "b2", Visibility.PRIVATE);

        GroupResult a1b1c1 = groupFactory.create(session1, a1b1, "c1", Visibility.PRIVATE);
        memberFactory.create(session1, a1b1c1, u3u.getId());

        ProjectResult a1b1pj = projectFactory.create(session1, a1b1, "pj", Visibility.PRIVATE);
        memberFactory.create(session1, a1b1pj, u4u.getId());

        GroupResult a2 = groupFactory.create(session1, Visibility.PRIVATE);

        groupFactory.queryGroup(u1, a1.getFullPath(), a1);
        groupFactory.queryGroup(u1, a2.getFullPath(), ErrorType.FORBIDDEN);
        groupFactory.queryGroup(u1, a1b1.getFullPath(), a1b1);

        groupFactory.queryGroup(u2, a1.getFullPath(), a1);
        groupFactory.queryGroup(u2, a1b1.getFullPath(), a1b1);
        groupFactory.queryGroup(u2, a1b2.getFullPath(), ErrorType.FORBIDDEN);
        groupFactory.queryGroup(u2, a1b1c1.getFullPath(), a1b1c1);

        groupFactory.queryGroup(u4, a1.getFullPath(), a1);
        groupFactory.queryGroup(u4, a1b1.getFullPath(), a1b1);
        groupFactory.queryGroup(u4, a1b2.getFullPath(), ErrorType.FORBIDDEN);
        groupFactory.queryGroup(u4, a1b1c1.getFullPath(), ErrorType.FORBIDDEN);
    }

    @Test
    void rootGroups() {
        /*
         * 组织成员情形：
         * 1. 直接加入组织
         * 2. 只加入了子组织
         * 3. 只加入项目 pj
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
         * | a11(1)        | Y  |    |
         * |       +-------+----+----+
         * |       | pj(1) |    | Y  |
         * |-------+-------+----+----+
         * | a12(1)        |    | Y  |
         * |       +-------+----+----+
         * |       | pj(1) | Y  |    |
         * |-------+-------+----+----+
         * | a13(0)        | Y  |    |
         * |       +-------+----+----+
         * |       | pj(0) |    | Y  |
         * |-------+-------+----+----+
         * | a14(0)        |    | Y  |
         * |       +-------+----+----+
         * |       | pj(0) | Y  |    |
         * +-------+-------+----+----+
         */
        SessionResult session = userFactory.session();
        SessionResult v1 = userFactory.session();
        SessionResult u1 = userFactory.session();
        UserResult v1u = userFactory.viewer(v1);
        UserResult u1u = userFactory.viewer(u1);

        GroupResult a1 = groupFactory.create(session, Visibility.PUBLIC);
        GroupResult a2 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a2, v1u.getId());
        GroupResult a3 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a3, u1u.getId());

        GroupResult a4 = groupFactory.create(session, Visibility.PRIVATE);
        GroupResult a5 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a5, v1u.getId());
        GroupResult a6 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a6, u1u.getId());

        GroupResult a7 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a7, v1u.getId());
        GroupResult a7b1 = groupFactory.create(session, a7, "b1", Visibility.PUBLIC);
        memberFactory.create(session, a7b1, u1u.getId());

        GroupResult a8 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a8, u1u.getId());
        GroupResult a8b1 = groupFactory.create(session, a8, "b1", Visibility.PUBLIC);
        memberFactory.create(session, a8b1, v1u.getId());

        GroupResult a9 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a9, v1u.getId());
        GroupResult a9b1 = groupFactory.create(session, a9, "b1", Visibility.PRIVATE);
        memberFactory.create(session, a9b1, u1u.getId());

        GroupResult a10 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a10, u1u.getId());
        GroupResult a10b1 = groupFactory.create(session, a10, "b1", Visibility.PRIVATE);
        memberFactory.create(session, a10b1, v1u.getId());

        GroupResult a11 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a11, v1u.getId());
        ProjectResult a11pj = projectFactory.create(session, a11, "pj", Visibility.PUBLIC);
        memberFactory.create(session, a11pj, u1u.getId());

        GroupResult a12 = groupFactory.create(session, Visibility.PUBLIC);
        memberFactory.create(session, a12, u1u.getId());
        ProjectResult a12pj = projectFactory.create(session, a12, "pj", Visibility.PUBLIC);
        memberFactory.create(session, a12pj, v1u.getId());

        GroupResult a13 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a13, v1u.getId());
        ProjectResult a13pj = projectFactory.create(session, a13, "pj", Visibility.PRIVATE);
        memberFactory.create(session, a13pj, u1u.getId());

        GroupResult a14 = groupFactory.create(session, Visibility.PRIVATE);
        memberFactory.create(session, a14, u1u.getId());
        ProjectResult a14pj = projectFactory.create(session, a14, "pj", Visibility.PRIVATE);
        memberFactory.create(session, a14pj, v1u.getId());

        GroupFilter.By filterBy = new GroupFilter.By();
        GroupOrder order = new GroupOrder();
        order.setField(GroupOrderField.CREATED_AT);
        order.setDirection(OrderDirection.DESC);

        filterBy.setUsername(u1.getUsername());
        List<String> v1_u1 = List.of(
                a14.getId(), a13.getId(), a12.getId(), a11.getId(),
                a10.getId(), a9.getId(), a8.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(v1, v1_u1.size(), filterBy, order, v1_u1, null);
        filterBy.setRecursive(true);
        List<String> v1_u1_r = List.of(
                a14.getId(), a13.getId(), a12.getId(), a11.getId(),
                a10b1.getId(), a10.getId(),
                a9b1.getId(), a9.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(v1, v1_u1_r.size(), filterBy, order, v1_u1_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v1_u = List.of(
                a14.getId(), a13.getId(), a12.getId(), a11.getId(),
                a10.getId(), a9.getId(), a8.getId(), a7.getId(),
                a5.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(v1, v1_u.size(), filterBy, order, v1_u, null);
        filterBy.setRecursive(true);
        List<String> v1_u_r = List.of(
                a14.getId(), a13.getId(), a12.getId(), a11.getId(),
                a10b1.getId(), a10.getId(),
                a9b1.getId(), a9.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a5.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(v1, v1_u_r.size(), filterBy, order, v1_u_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1.getUsername());
        List<String> v_u1 = List.of(
                a12.getId(), a11.getId(),
                a8.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(null, v_u1.size(), filterBy, order, v_u1, null);
        filterBy.setRecursive(true);
        List<String> v_u1_r = List.of(
                a12.getId(), a11.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId()
        );
        queryGroups(null, v_u1_r.size(), filterBy, order, v_u1_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v_u = List.of(
                a12.getId(), a11.getId(),
                a8.getId(), a7.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(null, v_u.size(), filterBy, order, v_u, null);
        filterBy.setRecursive(true);
        List<String> v_u_r = List.of(
                a12.getId(), a11.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryGroups(null, v_u_r.size(), filterBy, order, v_u_r, null);
    }

    @Test
    void groupsByParent() {
        /*
         * 组织成员情形：
         * 1. 直接加入组织
         * 2. 只加入了父组织
         * 3. 只加入了子组织
         * 4. 只加入了项目
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
         * |       +-------+-------+----+----+----+----+
         * |       | b11(1)        |    |    | Y  |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | pj(1) |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b12(1)        |    |    |    | Y  |
         * |       |       +-------+----+----+----+----+
         * |       |       | pj(1) |    |    | Y  |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b13(0)        |    |    | Y  |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | pj(0) |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b14(0)        |    |    |    | Y  |
         * |       |       +-------+----+----+----+----+
         * |       |       | pj(0) |    |    | Y  |    |
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
        SessionResult user = userFactory.session();

        SessionResult v1 = userFactory.session();
        SessionResult u1 = userFactory.session();
        SessionResult v2 = userFactory.session();
        SessionResult u2 = userFactory.session();

        UserResult v1u = userFactory.viewer(v1);
        UserResult u1u = userFactory.viewer(u1);
        UserResult v2u = userFactory.viewer(v2);
        UserResult u2u = userFactory.viewer(u2);

        GroupResult a1 = groupFactory.create(user, null, Visibility.PUBLIC);
        memberFactory.create(user, a1, v1u.getId());
        memberFactory.create(user, a1, u1u.getId());

        GroupResult a1b1 = groupFactory.create(user, a1, "b1", Visibility.PUBLIC);
        GroupResult a1b2 = groupFactory.create(user, a1, "b2", Visibility.PUBLIC);
        memberFactory.create(user, a1b2, v2u.getId());
        GroupResult a1b3 = groupFactory.create(user, a1, "b3", Visibility.PUBLIC);
        memberFactory.create(user, a1b3, u2u.getId());

        GroupResult a1b4 = groupFactory.create(user, a1, "b4", Visibility.PRIVATE);
        GroupResult a1b5 = groupFactory.create(user, a1, "b5", Visibility.PRIVATE);
        memberFactory.create(user, a1b5, v2u.getId());
        GroupResult a1b6 = groupFactory.create(user, a1, "b6", Visibility.PRIVATE);
        memberFactory.create(user, a1b6, u2u.getId());

        GroupResult a1b7 = groupFactory.create(user, a1, "b7", Visibility.PUBLIC);
        memberFactory.create(user, a1b7, v2u.getId());
        GroupResult a1b7c1 = groupFactory.create(user, a1b7, "c1", Visibility.PUBLIC);
        memberFactory.create(user, a1b7c1, u2u.getId());

        GroupResult a1b8 = groupFactory.create(user, a1, "b8", Visibility.PUBLIC);
        memberFactory.create(user, a1b8, u2u.getId());
        GroupResult a1b8c1 = groupFactory.create(user, a1b8, "c1", Visibility.PUBLIC);
        memberFactory.create(user, a1b8c1, v2u.getId());

        GroupResult a1b9 = groupFactory.create(user, a1, "b9", Visibility.PRIVATE);
        memberFactory.create(user, a1b9, v2u.getId());
        GroupResult a1b9c1 = groupFactory.create(user, a1b9, "c1", Visibility.PRIVATE);
        memberFactory.create(user, a1b9c1, u2u.getId());

        GroupResult a1b10 = groupFactory.create(user, a1, "b10", Visibility.PRIVATE);
        memberFactory.create(user, a1b10, u2u.getId());
        GroupResult a1b10c1 = groupFactory.create(user, a1b10, "c1", Visibility.PRIVATE);
        memberFactory.create(user, a1b10c1, v2u.getId());

        GroupResult a1b11 = groupFactory.create(user, a1, "b11", Visibility.PUBLIC);
        memberFactory.create(user, a1b11, v2u.getId());
        ProjectResult a1b11pj = projectFactory.create(user, a1b11, "pj", Visibility.PUBLIC);
        memberFactory.create(user, a1b11pj, u2u.getId());

        GroupResult a1b12 = groupFactory.create(user, a1, "b12", Visibility.PUBLIC);
        memberFactory.create(user, a1b12, u2u.getId());
        ProjectResult a1b12pj = projectFactory.create(user, a1b12, "pj", Visibility.PUBLIC);
        memberFactory.create(user, a1b12pj, v2u.getId());

        GroupResult a1b13 = groupFactory.create(user, a1, "b13", Visibility.PRIVATE);
        memberFactory.create(user, a1b13, v2u.getId());
        ProjectResult a1b13pj = projectFactory.create(user, a1b13, "pj", Visibility.PRIVATE);
        memberFactory.create(user, a1b13pj, u2u.getId());

        GroupResult a1b14 = groupFactory.create(user, a1, "b14", Visibility.PRIVATE);
        memberFactory.create(user, a1b14, u2u.getId());
        ProjectResult a1b14pj = projectFactory.create(user, a1b14, "pj", Visibility.PRIVATE);
        memberFactory.create(user, a1b14pj, v2u.getId());

        GroupResult a2 = groupFactory.create(user, null, Visibility.PUBLIC);
        memberFactory.create(user, a2, v1u.getId());
        memberFactory.create(user, a2, u1u.getId());
        memberFactory.create(user, a2, v2u.getId());
        memberFactory.create(user, a2, u2u.getId());
        GroupResult a2b1 = groupFactory.create(user, a2, "b1", Visibility.PUBLIC);
        memberFactory.create(user, a2b1, v1u.getId());
        memberFactory.create(user, a2b1, u1u.getId());
        memberFactory.create(user, a2b1, v2u.getId());
        memberFactory.create(user, a2b1, u2u.getId());

        GroupResult a3 = groupFactory.create(user, null, Visibility.PUBLIC);
        GroupResult a4 = groupFactory.create(user, null, Visibility.PRIVATE);

        GroupFilter.By filterBy = new GroupFilter.By();
        GroupOrder order = new GroupOrder();
        order.setField(GroupOrderField.CREATED_AT);
        order.setDirection(OrderDirection.ASC);

        // user namespace

        filterBy.setParentId(u1u.getId());
        queryGroups(u1, 1, filterBy, order, null, ErrorType.BAD_REQUEST);
        filterBy.setParentId(u1u.getId().replaceFirst("User", "Group"));
        queryGroups(u1, 1, filterBy, order, null, ErrorType.NOT_FOUND);

        // group namespace

        filterBy.setParentId(a1.getId());
        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v1_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v1, v1_u1.size() + 1, filterBy, order, v1_u1, null);
        filterBy.setRecursive(true);
        List<String> v1_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v1, v1_u1_r.size() + 1, filterBy, order, v1_u1_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v1_u2 = List.of(
                a1b3.getId(),
                a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v1, v1_u2.size() + 1, filterBy, order, v1_u2, null);
        filterBy.setRecursive(true);
        List<String> v1_u2_r = List.of(
                a1b3.getId(),
                a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v1, v1_u2_r.size() + 1, filterBy, order, v1_u2_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v2_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v2, v2_u1.size() + 1, filterBy, order, v2_u1, null);
        filterBy.setRecursive(true);
        filterBy.setUsername(u1u.getUsername());
        List<String> v2_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v2, v2_u1_r.size() + 1, filterBy, order, v2_u1_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v2_u2 = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v2, v2_u2.size() + 1, filterBy, order, v2_u2, null);
        filterBy.setRecursive(true);
        List<String> v2_u2_r = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v2, v2_u2_r.size() + 1, filterBy, order, v2_u2_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v1_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v1, v1_u.size() + 1, filterBy, order, v1_u, null);
        filterBy.setRecursive(true);
        List<String> v1_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v1, v1_u_r.size() + 1, filterBy, order, v1_u_r, null);

        filterBy.setRecursive(false);
        List<String> v2_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v2, v2_u.size() + 1, filterBy, order, v2_u, null);
        filterBy.setRecursive(true);
        List<String> v2_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryGroups(v2, v2_u_r.size() + 1, filterBy, order, v2_u_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b8.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryGroups(null, v_u1.size() + 1, filterBy, order, v_u1, null);
        filterBy.setRecursive(true);
        List<String> v_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryGroups(null, v_u1_r.size() + 1, filterBy, order, v_u1_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v_u2 = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b8.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryGroups(null, v_u2.size() + 1, filterBy, order, v_u2, null);
        filterBy.setRecursive(true);
        List<String> v_u2_r = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryGroups(null, v_u2_r.size() + 1, filterBy, order, v_u2_r, null);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b8.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryGroups(null, v_u.size() + 1, filterBy, order, v_u, null);
        filterBy.setRecursive(true);
        List<String> v_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryGroups(null, v_u_r.size() + 1, filterBy, order, v_u_r, null);
    }

    @Test
    void groupPolicy() {
        /*
         * 用户加入的组织
         * |                       | u1 | u2 | u3 | u4 |
         * +-------+-------+-------+----+----+----+----+
         * | a1(0)                 | Y  |    |    |    |
         * |       +-------+-------+----+----+----+----+
         * |       | b1(0)         |    | Y  |    |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | c1(0) |    |    | Y  |    |
         * |       |       +-------+----+----+----+----+
         * |       |       | pj(0) |    |    |    | Y  |
         * |       +-------+-------+----+----+----+----+
         * |       | b2(0)         |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         * | a2(0)                 |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         * | a3(1)                 |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         */
        SessionResult session = userFactory.session();
        SessionResult u1 = userFactory.session();
        SessionResult u2 = userFactory.session();
        SessionResult u3 = userFactory.session();
        SessionResult u4 = userFactory.session();
        UserResult u1u = userFactory.viewer(u1);
        UserResult u2u = userFactory.viewer(u2);
        UserResult u3u = userFactory.viewer(u3);
        UserResult u4u = userFactory.viewer(u4);

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        memberFactory.create(session, a1, u1u.getId());

        GroupResult a1b1 = groupFactory.create(session, a1, "b1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1, u2u.getId());
        GroupResult a1b2 = groupFactory.create(session, a1, "b2", Visibility.PRIVATE);

        GroupResult a1b1c1 = groupFactory.create(session, a1b1, "c1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1c1, u3u.getId());

        ProjectResult a1b1pj = projectFactory.create(session, a1b1, "pj", Visibility.PRIVATE);
        memberFactory.create(session, a1b1pj, u4u.getId());

        GroupResult a2 = groupFactory.create(session, null, Visibility.PRIVATE);
        GroupResult a3 = groupFactory.create(session, null, Visibility.PUBLIC);

        queryNamespacePolicy(u1, a1.getFullPath(), Access.MAINTAINER);
        queryNamespacePolicy(u1, a2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(u1, a1b1.getFullPath(), Access.MAINTAINER);

        queryNamespacePolicy(u2, a1.getFullPath(), Access.MIN_ACCESS);
        queryNamespacePolicy(u2, a1b1.getFullPath(), Access.MAINTAINER);
        queryNamespacePolicy(u2, a1b2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(u2, a1b1c1.getFullPath(), Access.MAINTAINER);

        queryNamespacePolicy(u4, a1.getFullPath(), Access.MIN_ACCESS);
        queryNamespacePolicy(u4, a1b1.getFullPath(), Access.MIN_ACCESS);
        queryNamespacePolicy(u4, a1b1c1.getFullPath(), Access.NO_ACCESS);

        queryNamespacePolicy(null, a2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(null, a3.getFullPath(), Access.MIN_ACCESS);
    }

    private void queryGroups(SessionResult session, Integer first, GroupFilter.By filterBy, GroupOrder order, List<String> ids, ErrorType errorType) {
        GraphQlTester.Response response = query("groups", session)
                .variable("first", first)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("groups.edges").entityList(Object.class).hasSize(ids.size());
        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("groups.edges[%d].node.id", i)).entity(String.class).isEqualTo(ids.get(i));
        }
    }

    private void queryNamespacePolicy(SessionResult session, String fullPath, Access access) {
        GraphQlTester.Response response = query("namespacePolicy", session)
                .variable("fullPath", fullPath)
                .execute();
        response.path("namespacePolicy.access").entity(Access.class).isEqualTo(access);

        Set<Action> actions = NamespacePolicy.forAccess(access);
        GraphQlTester.EntityList<Action> entityList = response.path("namespacePolicy.actions").entityList(Action.class);
        entityList.hasSize(actions.size());
        for (Action action : actions) {
            entityList.contains(action);
        }
    }
}
