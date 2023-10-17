package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.*;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import cn.notfound.gitone.server.results.*;
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
class NamespaceQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    private final MemberFactory memberFactory;

    @Autowired
    public NamespaceQueryControllerTest(
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
    void existFullPath() {
        SessionResult session = userFactory.session();
        UserResult user = userFactory.viewer(session);
        GroupResult group1 = groupFactory.create(session);
        GroupResult group2 = groupFactory.create(session, group1);
        ProjectResult project = projectFactory.create(session);

        queryExistFullPath("notfound", Boolean.FALSE);
        queryExistFullPath("notfound/notfound", Boolean.FALSE);
        queryExistFullPath("notfound/notfound/notfound", Boolean.FALSE);
        queryExistFullPath(user.getUsername(), Boolean.TRUE);
        queryExistFullPath(group1.getFullPath(), Boolean.TRUE);
        queryExistFullPath(group2.getFullPath(), Boolean.TRUE);
        queryExistFullPath(project.getFullPath(), Boolean.TRUE);
    }

    @Test
    void namespace() {
        SessionResult session = userFactory.session();
        NamespaceResult user = userFactory.viewer(session).namespace();
        GroupResult group1 = groupFactory.create(session);
        GroupResult group2 = groupFactory.create(session, group1);
        ProjectResult project = projectFactory.create(session);

        queryNamespace(null, "notfound", null, ErrorType.NOT_FOUND);
        queryNamespace(null, "notfound/notfound", null, ErrorType.NOT_FOUND);
        queryNamespace(null, "notfound/notfound/notfound", null, ErrorType.NOT_FOUND);

        queryNamespace(session, user.getFullPath(), user, null);
        queryNamespace(session, group1.getFullPath(), group1, null);
        queryNamespace(session, group2.getFullPath(), group2, null);
        queryNamespace(session, project.getFullPath(), project, null);

        group1.reset(); group2.reset(); project.reset();

        queryNamespace(null, user.getFullPath(), user, null);
        queryNamespace(null, group1.getFullPath(), group1, null);
        queryNamespace(null, group2.getFullPath(), group2, null);
        queryNamespace(null, project.getFullPath(), project, null);
    }

    @Test
    void rootNamespaces() {
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

        NamespaceFilter.By filterBy = new NamespaceFilter.By();
        NamespaceOrder order = new NamespaceOrder();
        order.setField(NamespaceOrderField.CREATED_AT);
        order.setDirection(OrderDirection.DESC);

        filterBy.setUsername(u1.getUsername());
        List<String> v1_u1 = List.of(
                a14.getId(), a13.getId(), a12.getId(), a11.getId(),
                a10.getId(), a9.getId(), a8.getId(), a7.getId(),
                a3.getId(),
                u1u.getId()
        );
        queryNamespaces(v1, v1_u1.size(), filterBy, order, v1_u1);
        filterBy.setRecursive(true);
        List<String> v1_u1_r = List.of(
                a14pj.getId(), a14.getId(),
                a13pj.getId(), a13.getId(),
                a12pj.getId(), a12.getId(),
                a11pj.getId(), a11.getId(),
                a10b1.getId(), a10.getId(),
                a9b1.getId(), a9.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId()
        );
        queryNamespaces(v1, v1_u1_r.size(), filterBy, order, v1_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v1_u = List.of(
                a14.getId(), a13.getId(), a12.getId(), a11.getId(),
                a10.getId(), a9.getId(), a8.getId(), a7.getId(),
                a5.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryNamespaces(v1, v1_u.size(), filterBy, order, v1_u);
        filterBy.setRecursive(true);
        List<String> v1_u_r = List.of(
                a14pj.getId(), a14.getId(),
                a13pj.getId(), a13.getId(),
                a12pj.getId(), a12.getId(),
                a11pj.getId(), a11.getId(),
                a10b1.getId(), a10.getId(),
                a9b1.getId(), a9.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a5.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryNamespaces(v1, v1_u_r.size(), filterBy, order, v1_u_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1.getUsername());
        List<String> v_u1 = List.of(
                a12.getId(), a11.getId(),
                a8.getId(), a7.getId(),
                a3.getId(),
                u1u.getId()
        );
        queryNamespaces(null, v_u1.size(), filterBy, order, v_u1);
        filterBy.setRecursive(true);
        List<String> v_u1_r = List.of(
                a12pj.getId(), a12.getId(),
                a11pj.getId(), a11.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId()
        );
        queryNamespaces(null, v_u1_r.size(), filterBy, order, v_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v_u = List.of(
                a12.getId(), a11.getId(),
                a8.getId(), a7.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryNamespaces(null, v_u.size(), filterBy, order, v_u);
        filterBy.setRecursive(true);
        List<String> v_u_r = List.of(
                a12pj.getId(), a12.getId(),
                a11pj.getId(), a11.getId(),
                a8b1.getId(), a8.getId(),
                a7b1.getId(), a7.getId(),
                a3.getId(), a2.getId(), a1.getId()
        );
        queryNamespaces(null, v_u_r.size(), filterBy, order, v_u_r);
    }

    @Test
    void namespacesByParent() {
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

        NamespaceFilter.By filterBy = new NamespaceFilter.By();
        filterBy.setParentId(a1.getId());
        NamespaceOrder order = new NamespaceOrder();
        order.setField(NamespaceOrderField.CREATED_AT);
        order.setDirection(OrderDirection.ASC);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v1_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryNamespaces(v1, v1_u1.size() + 1, filterBy, order, v1_u1);
        filterBy.setRecursive(true);
        List<String> v1_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId(),
                a1b13.getId(), a1b13pj.getId(),
                a1b14.getId(), a1b14pj.getId()
        );
        queryNamespaces(v1, v1_u1_r.size() + 1, filterBy, order, v1_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v1_u2 = List.of(
                a1b3.getId(),
                a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryNamespaces(v1, v1_u2.size() + 1, filterBy, order, v1_u2);
        filterBy.setRecursive(true);
        List<String> v1_u2_r = List.of(
                a1b3.getId(),
                a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId(),
                a1b13.getId(), a1b13pj.getId(),
                a1b14.getId(), a1b14pj.getId()
        );
        queryNamespaces(v1, v1_u2_r.size() + 1, filterBy, order, v1_u2_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v2_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryNamespaces(v2, v2_u1.size() + 1, filterBy, order, v2_u1);
        filterBy.setRecursive(true);
        filterBy.setUsername(u1u.getUsername());
        List<String> v2_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId(),
                a1b13.getId(), a1b13pj.getId(),
                a1b14.getId(), a1b14pj.getId()
        );
        queryNamespaces(v2, v2_u1_r.size() + 1, filterBy, order, v2_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v2_u2 = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryNamespaces(v2, v2_u2.size() + 1, filterBy, order, v2_u2);
        filterBy.setRecursive(true);
        List<String> v2_u2_r = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId(),
                a1b13.getId(), a1b13pj.getId(),
                a1b14.getId(), a1b14pj.getId()
        );
        queryNamespaces(v2, v2_u2_r.size() + 1, filterBy, order, v2_u2_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v1_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryNamespaces(v1, v1_u.size() + 1, filterBy, order, v1_u);
        filterBy.setRecursive(true);
        List<String> v1_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b4.getId(), a1b5.getId(), a1b6.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId(),
                a1b13.getId(), a1b13pj.getId(),
                a1b14.getId(), a1b14pj.getId()
        );
        queryNamespaces(v1, v1_u_r.size() + 1, filterBy, order, v1_u_r);

        filterBy.setRecursive(false);
        List<String> v2_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b8.getId(), a1b9.getId(), a1b10.getId(),
                a1b11.getId(), a1b12.getId(), a1b13.getId(), a1b14.getId()
        );
        queryNamespaces(v2, v2_u.size() + 1, filterBy, order, v2_u);
        filterBy.setRecursive(true);
        List<String> v2_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b5.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b9.getId(), a1b9c1.getId(),
                a1b10.getId(), a1b10c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId(),
                a1b13.getId(), a1b13pj.getId(),
                a1b14.getId(), a1b14pj.getId()
        );
        queryNamespaces(v2, v2_u_r.size() + 1, filterBy, order, v2_u_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u1u.getUsername());
        List<String> v_u1 = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b8.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryNamespaces(null, v_u1.size() + 1, filterBy, order, v_u1);
        filterBy.setRecursive(true);
        List<String> v_u1_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId()
        );
        queryNamespaces(null, v_u1_r.size() + 1, filterBy, order, v_u1_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(u2u.getUsername());
        List<String> v_u2 = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b8.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryNamespaces(null, v_u2.size() + 1, filterBy, order, v_u2);
        filterBy.setRecursive(true);
        List<String> v_u2_r = List.of(
                a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId()
        );
        queryNamespaces(null, v_u2_r.size() + 1, filterBy, order, v_u2_r);

        filterBy.setRecursive(false);
        filterBy.setUsername(null);
        List<String> v_u = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b8.getId(),
                a1b11.getId(), a1b12.getId()
        );
        queryNamespaces(null, v_u.size() + 1, filterBy, order, v_u);
        filterBy.setRecursive(true);
        List<String> v_u_r = List.of(
                a1b1.getId(), a1b2.getId(), a1b3.getId(),
                a1b7.getId(), a1b7c1.getId(),
                a1b8.getId(), a1b8c1.getId(),
                a1b11.getId(), a1b11pj.getId(),
                a1b12.getId(), a1b12pj.getId()
        );
        queryNamespaces(null, v_u_r.size() + 1, filterBy, order, v_u_r);
    }

    @Test
    void namespacePolicy() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        GroupResult group1 = groupFactory.create(session1);
        GroupResult group2 = groupFactory.create(session1, group1);
        ProjectResult project = projectFactory.create(session1);

        queryNamespacePolicy(null, session1.getUsername(), Access.MIN_ACCESS);
        queryNamespacePolicy(null, group1.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(null, group2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(null, project.getFullPath(), Access.NO_ACCESS);

        queryNamespacePolicy(session1, session1.getUsername(), Access.OWNER);
        queryNamespacePolicy(session1, group1.getFullPath(), Access.OWNER);
        queryNamespacePolicy(session1, group2.getFullPath(), Access.OWNER);
        queryNamespacePolicy(session1, project.getFullPath(), Access.OWNER);

        queryNamespacePolicy(session2, session1.getUsername(), Access.MIN_ACCESS);
        queryNamespacePolicy(session2, group1.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session2, group2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session2, project.getFullPath(), Access.NO_ACCESS);
    }

    private void queryExistFullPath(String fullPath, Boolean exist) {
        query("existFullPath")
                .variable("fullPath", fullPath)
                .execute()
                .path("existFullPath")
                .entity(Boolean.class).isEqualTo(exist);
    }

    private void queryNamespace(SessionResult session, String fullPath, NamespaceResult result, ErrorType errorType) {
        GraphQlTester.Response response = query("namespace", session)
                .variable("fullPath", fullPath)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("namespace.id").entity(String.class).isEqualTo(result.getId())
                .path("namespace.fullPath").entity(String.class).isEqualTo(result.getFullPath());
        if (result.getVisibility().equals(Visibility.PRIVATE) && result.getName() == null) {
            response.path("namespace.name").valueIsNull()
                    .path("namespace.fullName").valueIsNull()
                    .path("namespace.path").valueIsNull()
                    .path("namespace.description").entity(String.class).isEqualTo(result.getDescription());
        } else {
            response.path("namespace.name").entity(String.class).isEqualTo(result.getName())
                    .path("namespace.fullName").entity(String.class).isEqualTo(result.getFullName())
                    .path("namespace.path").entity(String.class).isEqualTo(result.getPath())
                    .path("namespace.description").entity(String.class).isEqualTo(result.getDescription());
        }
    }

    private void queryNamespaces(SessionResult session, Integer first, NamespaceFilter.By filterBy, NamespaceOrder order, List<String> ids) {
        GraphQlTester.Response response = query("namespaces", session)
                .variable("first", first)
                .variable("filterBy", filterBy)
                .variable("orderBy", order)
                .execute();
        response.path("namespaces.edges").entityList(Object.class).hasSize(ids.size());
        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("namespaces.edges[%d].node.id", i)).entity(String.class).isEqualTo(ids.get(i));
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
