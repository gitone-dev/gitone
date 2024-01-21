package dev.gitone.server.factories;

import dev.gitone.server.controllers.members.inputs.CreateMemberInput;
import dev.gitone.server.entities.Access;
import dev.gitone.server.results.MemberResult;
import dev.gitone.server.results.NamespaceResult;
import dev.gitone.server.results.SessionResult;
import dev.gitone.server.results.UserResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class MemberFactory extends BaseFactory {

    private final UserFactory userFactory;

    @Autowired
    public MemberFactory(WebGraphQlTester graphQlTester, UserFactory userFactory) {
        super(graphQlTester);
        this.userFactory = userFactory;
    }

    public CreateMemberInput createMemberInput(NamespaceResult namespace) {
        UserResult user = userFactory.create();

        CreateMemberInput createMemberInput = new CreateMemberInput();
        createMemberInput.setFullPath(namespace.getFullPath());
        createMemberInput.setUserId(user.getId());
        createMemberInput.setAccess(Access.MAINTAINER);
        return createMemberInput;
    }

    public MemberResult create(SessionResult session, NamespaceResult namespace) {
        return mutate("createMember", session, createMemberInput(namespace))
                .path("payload.member").entity(MemberResult.class).get();
    }

    public MemberResult create(SessionResult session, NamespaceResult namespace, String userId) {
        CreateMemberInput createMemberInput = new CreateMemberInput();
        createMemberInput.setFullPath(namespace.getFullPath());
        createMemberInput.setUserId(userId);
        createMemberInput.setAccess(Access.MAINTAINER);
        return mutate("createMember", session, createMemberInput)
                .path("payload.member").entity(MemberResult.class).get();
    }
}
