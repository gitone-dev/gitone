package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberOrder;
import cn.notfound.gitone.server.controllers.members.MemberOrderField;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.MemberFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.MemberResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.WebGraphQlTester;

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
        SessionResult session = userFactory.viewer();
        GroupResult group = groupFactory.create(session);
        memberFactory.create(session, group);
        memberFactory.create(session, group);

        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first" ,3)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(3);

        MemberFilter.By filterBy = new MemberFilter.By();
        filterBy.setQuery(session.getUsername());
        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first" ,3)
                .variable("filterBy", filterBy)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(1);

        MemberOrder orderBy = new MemberOrder();
        orderBy.setField(MemberOrderField.USERNAME);
        orderBy.setDirection(OrderDirection.DESC);
        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first" ,3)
                .variable("orderBy", orderBy)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(3);
    }
}
