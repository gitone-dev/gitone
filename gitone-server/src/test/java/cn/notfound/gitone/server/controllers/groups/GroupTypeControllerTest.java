package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberOrder;
import cn.notfound.gitone.server.controllers.members.MemberOrderField;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.MemberFactory;
import cn.notfound.gitone.server.factories.UserFactory;
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

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class GroupTypeControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final MemberFactory memberFactory;

    @Autowired
    public GroupTypeControllerTest(
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
    void members() {
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
         * | a3(1)                 | N  | N  | N  |
         * +-------+-------+-------+----+----+----+
         */
        SessionResult session = userFactory.viewer();
        SessionResult u1 = userFactory.viewer();
        SessionResult u2 = userFactory.viewer();
        SessionResult u3 = userFactory.viewer();
        UserResult user = userFactory.queryViewer(session);
        UserResult u1u = userFactory.queryViewer(u1);
        UserResult u2u = userFactory.queryViewer(u2);
        UserResult u3u = userFactory.queryViewer(u3);

        /*
         * 成员继承
         */

        GroupResult a1 = groupFactory.create(session, null, Visibility.PRIVATE);
        memberFactory.create(session, a1.getId(), u1u.getId());

        GroupResult a1b1 = groupFactory.create(session, a1, "b1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1.getId(), u2u.getId());
        GroupResult a1b2 = groupFactory.create(session, a1, "b2", Visibility.PRIVATE);

        GroupResult a1b1c1 = groupFactory.create(session, a1b1, "c1", Visibility.PRIVATE);
        memberFactory.create(session, a1b1c1.getId(), u3u.getId());

        GroupResult a2 = groupFactory.create(session, null, Visibility.PRIVATE);
        GroupResult a3 = groupFactory.create(session, null, Visibility.PUBLIC);

        MemberFilter.By filterBy = new MemberFilter.By();
        MemberOrder orderBy = new MemberOrder();
        orderBy.setField(MemberOrderField.CREATED_AT);
        orderBy.setDirection(OrderDirection.ASC);

        List<String> a1_m = List.of(user.getId(), u1u.getId());
        queryMembers(session, a1.getFullPath(), filterBy, orderBy, a1_m);

        List<String> a1b1_m = List.of(user.getId(), u1u.getId(), u2u.getId());
        queryMembers(session, a1b1.getFullPath(), filterBy, orderBy, a1b1_m);

        List<String> a1b1c1_m = List.of(user.getId(), u1u.getId(), u2u.getId(), u3u.getId());
        queryMembers(session, a1b1c1.getFullPath(), filterBy, orderBy, a1b1c1_m);

        List<String> a1b2_m = List.of(user.getId(), u1u.getId());
        queryMembers(session, a1b2.getFullPath(), filterBy, orderBy, a1b2_m);

        /*
         * 成员权限
         */

        queryMembers(null, a2.getFullPath(), filterBy, orderBy, null, 1)
                .errors()
                .expect((e) -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        queryMembers(u1, a2.getFullPath(), filterBy, orderBy, null, 1)
                .errors()
                .expect((e) -> e.getErrorType().equals(ErrorType.FORBIDDEN));

        queryMembers(session, a3.getFullPath(), filterBy, orderBy, null, List.of(user.getId()));

        /*
         * 成员过滤
         */

        filterBy.setQuery(u2u.getUsername());
        queryMembers(session, a1b1c1.getFullPath(), filterBy, orderBy, null, List.of(u2u.getId()));
        filterBy.setQuery(null);

        filterBy.setAccess(Access.MAINTAINER);
        queryMembers(session, a1.getFullPath(), filterBy, orderBy, null, List.of(u1u.getId()));
        filterBy.setAccess(null);

        /*
         * 成员分页
         */

        String after = "";
        after = queryMembers(session, a1b1c1.getFullPath(), filterBy, orderBy, after, List.of(user.getId(), u1u.getId()));
        queryMembers(session, a1b1c1.getFullPath(), filterBy, orderBy, after, List.of(u2u.getId(), u3u.getId()));
    }

    private void queryMembers(
            SessionResult session, String fullPath,
            MemberFilter.By filterBy, MemberOrder orderBy, List<String> ids) {
        queryMembers(session, fullPath, filterBy, orderBy, null, ids);
    }

    private String queryMembers(
            SessionResult session, String fullPath,
            MemberFilter.By filterBy, MemberOrder orderBy, String after, List<String> ids) {

        Integer first = after == null ? ids.size() + 1 : ids.size();
        if ("".equals(after)) after = null;

        GraphQlTester.Response response = queryMembers(session, fullPath, filterBy, orderBy, after, first);
        response.path("group.members.edges").entityList(Object.class).hasSize(ids.size());
        for (int i = 0; i < ids.size(); i++) {
            response.path(String.format("group.members.edges[%d].node.user.id", i)).entity(String.class).isEqualTo(ids.get(i));
        }

        return response.path("group.members.pageInfo.endCursor").entity(String.class).get();
    }


    private GraphQlTester.Response queryMembers(
            SessionResult session, String fullPath,
            MemberFilter.By filterBy, MemberOrder orderBy, String after, Integer first) {

        return query("groupMembers", session)
                .variable("fullPath", fullPath)
                .variable("first", first)
                .variable("after", after)
                .variable("filterBy", filterBy)
                .variable("orderBy", orderBy)
                .execute();
    }
}
