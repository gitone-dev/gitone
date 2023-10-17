package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberOrder;
import cn.notfound.gitone.server.controllers.members.MemberOrderField;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.*;
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

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class GroupTypeControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final MemberFactory memberFactory;

    private final ProjectFactory projectFactory;

    @Autowired
    public GroupTypeControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory,
            MemberFactory memberFactory,
            ProjectFactory projectFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
        this.memberFactory = memberFactory;
        this.projectFactory = projectFactory;
    }

    @Test
    void members() {
        /*
         * 用户加入的组织和项目
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
         * | a3(1)                 |    |    |    |    |
         * +-------+-------+-------+----+----+----+----+
         */
        SessionResult session = userFactory.session();
        SessionResult u1 = userFactory.session();
        SessionResult u2 = userFactory.session();
        SessionResult u3 = userFactory.session();
        SessionResult u4 = userFactory.session();
        UserResult user = userFactory.viewer(session);
        UserResult u1u = userFactory.viewer(u1);
        UserResult u2u = userFactory.viewer(u2);
        UserResult u3u = userFactory.viewer(u3);
        UserResult u4u = userFactory.viewer(u4);

        /*
         * 成员继承
         */

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

        MemberFilter.By filterBy = new MemberFilter.By();

        List<String> a1_m = List.of(user.getId(), u1u.getId());
        queryMembers(session, a1.getFullPath(), filterBy, null, a1_m, null);

        List<String> a1b1_m = List.of(user.getId(), u1u.getId(), u2u.getId());
        queryMembers(session, a1b1.getFullPath(), filterBy, null, a1b1_m, null);

        List<String> a1b1c1_m = List.of(user.getId(), u1u.getId(), u2u.getId(), u3u.getId());
        queryMembers(session, a1b1c1.getFullPath(), filterBy, null, a1b1c1_m, null);

        List<String> a1b2_m = List.of(user.getId(), u1u.getId());
        queryMembers(session, a1b2.getFullPath(), filterBy, null, a1b2_m, null);

        /*
         * 成员权限
         */

        queryMembers(null, a2.getFullPath(), filterBy, null, List.of(), ErrorType.UNAUTHORIZED);
        queryMembers(u1, a2.getFullPath(), filterBy, null, List.of(), ErrorType.FORBIDDEN);
        queryMembers(session, a3.getFullPath(), filterBy, null, List.of(user.getId()), null);

        /*
         * 成员过滤
         */

        filterBy.setQuery(u2u.getUsername());
        queryMembers(session, a1b1c1.getFullPath(), filterBy, null, List.of(u2u.getId()), null);
        filterBy.setQuery(null);

        filterBy.setAccess(Access.MAINTAINER);
        queryMembers(session, a1.getFullPath(), filterBy, null, List.of(u1u.getId()), null);
        filterBy.setAccess(null);

        /*
         * 成员分页
         */

        String after = "";
        after = queryMembers(session, a1b1c1.getFullPath(), filterBy, after, List.of(user.getId(), u1u.getId()), null);
        queryMembers(session, a1b1c1.getFullPath(), filterBy, after, List.of(u2u.getId(), u3u.getId()), null);
    }

    private String queryMembers(
            SessionResult session, String fullPath,
            MemberFilter.By filterBy, String after, List<String> ids, ErrorType errorType) {

        Integer first = after == null ? ids.size() + 1 : ids.size();
        if ("".equals(after)) after = null;

        MemberOrder orderBy = new MemberOrder();
        orderBy.setField(MemberOrderField.CREATED_AT);
        orderBy.setDirection(OrderDirection.ASC);
        GraphQlTester.Response response = query("members", session)
                .variable("fullPath", fullPath)
                .variable("first", first)
                .variable("after", after)
                .variable("filterBy", filterBy)
                .variable("orderBy", orderBy)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return null;
        }

        response.path("members.edges").entityList(Object.class).hasSize(ids.size());
        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("members.edges[%d].node.user.id", i)).entity(String.class).isEqualTo(ids.get(i));
        }

        return response.path("members.pageInfo.endCursor").entity(String.class).get();
    }
}
