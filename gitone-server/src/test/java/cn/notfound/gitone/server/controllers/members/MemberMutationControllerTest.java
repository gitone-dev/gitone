package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.controllers.members.inputs.CreateMemberInput;
import cn.notfound.gitone.server.controllers.members.inputs.DeleteMemberInput;
import cn.notfound.gitone.server.controllers.members.inputs.UpdateMemberInput;
import cn.notfound.gitone.server.entities.Access;
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
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class MemberMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final MemberFactory memberFactory;

    @Autowired
    public MemberMutationControllerTest(
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
    void createMember() {
        SessionResult session = userFactory.viewer();
        GroupResult group = groupFactory.create(session);

        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first", 20)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(1);

        CreateMemberInput createMemberInput = memberFactory.createMemberInput(group);
        createMemberInput.setAccess(Access.MAINTAINER);

        mutate("createMember", createMemberInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));
        mutate("createMember", session, createMemberInput)
                .path("payload.member.access").entity(Access.class).isEqualTo(createMemberInput.getAccess())
                .path("payload.member.user.id").entity(String.class).isEqualTo(createMemberInput.getUserId());
        mutate("createMember", session, createMemberInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.INTERNAL_ERROR));

        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first", 20)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(2);
    }

    @Test
    void updateMember() {
        SessionResult session = userFactory.viewer();
        GroupResult group = groupFactory.create(session);
        MemberResult member = memberFactory.create(session, group);

        UpdateMemberInput updateMemberInput = new UpdateMemberInput();
        updateMemberInput.setId(member.getId());
        updateMemberInput.setAccess(Access.REPORTER);

        mutate("updateMember", updateMemberInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        mutate("updateMember", session, updateMemberInput)
                .path("payload.member.id").entity(String.class).isEqualTo(updateMemberInput.getId())
                .path("payload.member.access").entity(Access.class).isEqualTo(updateMemberInput.getAccess())
                .path("payload.member.user.id").entity(String.class).isEqualTo(member.getUser().getId());
    }

    @Test
    void deleteMember() {
        SessionResult session = userFactory.viewer();
        GroupResult group = groupFactory.create(session);
        MemberResult member = memberFactory.create(session, group);

        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first", 20)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(2);

        DeleteMemberInput deleteMemberInput = new DeleteMemberInput();
        deleteMemberInput.setId(member.getId());

        mutate("deleteMember", deleteMemberInput)
                .errors().expect(e -> e.getErrorType().equals(ErrorType.UNAUTHORIZED));

        mutate("deleteMember", session, deleteMemberInput)
                .path("payload.member.id").entity(String.class).isEqualTo(deleteMemberInput.getId())
                .path("payload.member.user.id").entity(String.class).isEqualTo(member.getUser().getId());

        query("groupMembers", session)
                .variable("fullPath", group.getFullPath())
                .variable("first", 20)
                .execute()
                .path("group.members.edges").entityList(Object.class).hasSize(1);
    }
}
