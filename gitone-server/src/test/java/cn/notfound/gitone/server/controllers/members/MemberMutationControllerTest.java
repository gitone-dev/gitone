package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.controllers.members.inputs.CreateMemberInput;
import cn.notfound.gitone.server.controllers.members.inputs.DeleteMemberInput;
import cn.notfound.gitone.server.controllers.members.inputs.UpdateMemberInput;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.factories.*;
import cn.notfound.gitone.server.results.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.util.ArrayList;
import java.util.List;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class MemberMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    private final MemberFactory memberFactory;

    @Autowired
    public MemberMutationControllerTest(
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
    void createMember() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user1 = userFactory.create();
        UserResult user2 = userFactory.create();
        GroupResult group1 = groupFactory.create(session1);
        GroupResult group2 = groupFactory.create(session1);
        ProjectResult project1 = projectFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1);

        // user namespace

        CreateMemberInput input = new CreateMemberInput();
        input.setAccess(Access.MAINTAINER);

        input.setFullPath(user1.getUsername());
        input.setUserId(user2.getId());
        mutationCreateMember(session1, input, ErrorType.BAD_REQUEST);

        // group namespace

        input.setFullPath(group1.getFullPath());
        input.setUserId(group2.getId());
        mutationCreateMember(session1, input, ErrorType.BAD_REQUEST);
        input.setUserId(group2.getId().replaceFirst("Group", "User"));
        mutationCreateMember(session1, input, ErrorType.BAD_REQUEST);

        input.setUserId(project1.getId());
        mutationCreateMember(session1, input, ErrorType.BAD_REQUEST);
        input.setUserId(project1.getId().replaceFirst("Project", "User"));
        mutationCreateMember(session1, input, ErrorType.BAD_REQUEST);

        List<MemberResult> members = queryMembers(session1, group1.getFullPath(), null);
        Assertions.assertEquals(1, members.size());
        input.setFullPath(group1.getFullPath());
        input.setUserId(user1.getId());
        mutationCreateMember(session1, input, null);

        MemberResult member1 = members.get(0);
        MemberResult member2 = new MemberResult();
        member2.setAccess(Access.MAINTAINER);
        member2.setUser(new UserResult());
        member2.getUser().setId(input.getUserId());
        queryMembers(session1, group1.getFullPath(), List.of(member2, member1));

        // project namespace

        members = queryMembers(session1, project1.getFullPath(), null);
        Assertions.assertEquals(1, members.size());

        input.setFullPath(project1.getFullPath());
        input.setUserId(user1.getId());
        input.setAccess(Access.MAINTAINER);
        mutationCreateMember(session1, input, null);

        member1 = members.get(0);
        member2 = new MemberResult();
        member2.setAccess(Access.MAINTAINER);
        member2.setUser(new UserResult());
        member2.getUser().setId(input.getUserId());
        queryMembers(session1, group1.getFullPath(), List.of(member2, member1));

        // 权限

        input.setFullPath(project2.getFullPath());
        input.setUserId(user2.getId());
        input.setAccess(Access.MAINTAINER);
        mutationCreateMember(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateMember(session2, input, ErrorType.FORBIDDEN);

        input.setFullPath(project2.getFullPath());
        input.setUserId(userFactory.viewer(session2).getId());
        input.setAccess(Access.MAINTAINER);
        mutationCreateMember(session1, input, null);

        input.setAccess(Access.OWNER);
        input.setUserId(user2.getId());
        mutationCreateMember(session2, input, ErrorType.FORBIDDEN);
    }

    @Test
    void updateMember() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        SessionResult session3 = userFactory.session();
        UserResult u2 = userFactory.viewer(session2);
        GroupResult g1 = groupFactory.create(session1);
        ProjectResult u1p1 = projectFactory.create(session1);
        ProjectResult g1p1 = projectFactory.create(session1, g1);

        MemberResult g1_m1 = queryMembers(session1, g1.getFullPath(), null).get(0);
        MemberResult u1p1_m1 = queryMembers(session1, u1p1.getFullPath(), null).get(0);
        MemberResult g1p1_m1 = queryMembers(session1, g1p1.getFullPath(), null).get(0);

        UpdateMemberInput input = new UpdateMemberInput();

        // user project

        input.setId(u1p1_m1.getId());
        input.setAccess(Access.MAINTAINER);
        mutationUpdateMember(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateMember(session1, input, null, ErrorType.BAD_REQUEST);

        MemberResult u1p1_m2 = memberFactory.create(session1, u1p1, u2.getId());

        input.setId(u1p1_m2.getId());
        input.setAccess(Access.OWNER);
        u1p1_m2.setAccess(input.getAccess());
        mutationUpdateMember(session1, input, u1p1_m2, null);

        input.setId(u1p1_m1.getId());
        input.setAccess(Access.MAINTAINER);
        mutationUpdateMember(session1, input, null, ErrorType.BAD_REQUEST);

        // group

        input.setId(g1_m1.getId());
        input.setAccess(Access.MAINTAINER);
        mutationUpdateMember(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateMember(session1, input, null, ErrorType.BAD_REQUEST);

        MemberResult g1_m2 = memberFactory.create(session1, g1, u2.getId());

        input.setId(g1_m2.getId());
        input.setAccess(Access.OWNER);
        mutationUpdateMember(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateMember(session2, input, null, ErrorType.FORBIDDEN);
        mutationUpdateMember(session3, input, null, ErrorType.FORBIDDEN);
        g1_m2.setAccess(Access.OWNER);
        mutationUpdateMember(session1, input, g1_m2, null);

        input.setId(g1_m1.getId());
        input.setAccess(Access.MAINTAINER);
        g1_m1.setAccess(input.getAccess());
        mutationUpdateMember(session1, input, g1_m1, null);

        // group project

        input.setId(g1p1_m1.getId());
        input.setAccess(Access.MAINTAINER);
        mutationUpdateMember(null, input, null, ErrorType.UNAUTHORIZED);
        g1p1_m1.setAccess(input.getAccess());
        mutationUpdateMember(session1, input, g1p1_m1, null);

        MemberResult g1p1_m2 = memberFactory.create(session1, g1p1, u2.getId());

        input.setId(g1p1_m2.getId());
        input.setAccess(Access.OWNER);
        mutationUpdateMember(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateMember(session3, input, null, ErrorType.FORBIDDEN);
        g1p1_m2.setAccess(Access.OWNER);
        mutationUpdateMember(session1, input, g1p1_m2, null);
    }

    @Test
    void deleteMember() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        GroupResult g1 = groupFactory.create(session1);
        ProjectResult u1p1 = projectFactory.create(session1);
        ProjectResult g1p1 = projectFactory.create(session1, g1);

        MemberResult g1_m1 = queryMembers(session1, g1.getFullPath(), null).get(0);
        MemberResult u1p1_m1 = queryMembers(session1, u1p1.getFullPath(), null).get(0);
        MemberResult g1p1_m1 = queryMembers(session1, g1p1.getFullPath(), null).get(0);

        DeleteMemberInput input = new DeleteMemberInput();

        // user project

        input.setId(u1p1_m1.getId());
        mutationDeleteMember(null, input, null, ErrorType.UNAUTHORIZED);
        mutationDeleteMember(session1, input, null, ErrorType.BAD_REQUEST);
        mutationDeleteMember(session2, input, null, ErrorType.FORBIDDEN);

        MemberResult u1p1_m2 = memberFactory.create(session1, u1p1);
        queryMembers(session1, u1p1.getFullPath(), List.of(u1p1_m2, u1p1_m1));

        input.setId(u1p1_m2.getId());
        mutationDeleteMember(session1, input, u1p1_m2, null);
        queryMembers(session1, u1p1.getFullPath(), List.of(u1p1_m1));

        // group

        input.setId(g1_m1.getId());
        mutationDeleteMember(session1, input, null, ErrorType.BAD_REQUEST);

        MemberResult g1_m2 = memberFactory.create(session1, g1);
        queryMembers(session1, g1.getFullPath(), List.of(g1_m2, g1_m1));

        input.setId(g1_m2.getId());
        mutationDeleteMember(session1, input, g1_m2, null);
        queryMembers(session1, u1p1.getFullPath(), List.of(g1_m1));

        // group project

        input.setId(g1p1_m1.getId());
        mutationDeleteMember(session1, input, null, ErrorType.BAD_REQUEST);

        MemberResult g1p1_m2 = memberFactory.create(session1, g1p1);
        queryMembers(session1, g1p1.getFullPath(), List.of(g1p1_m2, g1p1_m1));

        input.setId(g1p1_m2.getId());
        mutationDeleteMember(session1, input, g1p1_m2, null);
        queryMembers(session1, g1p1.getFullPath(), List.of(g1p1_m1));
    }

    private void mutationCreateMember(SessionResult session, CreateMemberInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("createMember", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.member.access").entity(Access.class).isEqualTo(input.getAccess())
                .path("payload.member.user.id").entity(String.class).isEqualTo(input.getUserId());
    }

    private void mutationUpdateMember(SessionResult session, UpdateMemberInput input, MemberResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updateMember", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.member.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.member.access").entity(Access.class).isEqualTo(result.getAccess())
                .path("payload.member.user.id").entity(String.class).isEqualTo(result.getUser().getId());
    }

    private void mutationDeleteMember(SessionResult session, DeleteMemberInput input, MemberResult member, ErrorType errorType) {
        GraphQlTester.Response response = mutate("deleteMember", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.member.id").entity(String.class).isEqualTo(member.getId())
                .path("payload.member.user.id").entity(String.class).isEqualTo(member.getUser().getId());
    }

    private List<MemberResult> queryMembers(SessionResult session, String fullPath, List<MemberResult> result) {
        GraphQlTester.Response response = query("members", session)
                .variable("fullPath", fullPath)
                .variable("first", 20)
                .execute();
        if (result == null) {
            result = new ArrayList<>();
            int size = response.path("members.edges").entityList(Object.class).get().size();
            for (int i = 0; i < size; i++) {
                MemberResult member = response.path(String.format("members.edges[%d].node", i)).entity(MemberResult.class).get();
                result.add(member);
            }
        } else {
            for (int i = 0; i < result.size(); i++) {
                response.path(String.format("members.edges[%d].node.access", i)).entity(Access.class).isEqualTo(result.get(i).getAccess())
                        .path(String.format("members.edges[%d].node.user.id", i)).entity(String.class).isEqualTo(result.get(i).getUser().getId());
            }
        }
        return result;
    }
}
