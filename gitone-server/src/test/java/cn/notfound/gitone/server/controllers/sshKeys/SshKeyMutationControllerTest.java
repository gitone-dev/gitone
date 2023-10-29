package cn.notfound.gitone.server.controllers.sshKeys;

import cn.notfound.gitone.server.controllers.sshKeys.inputs.CreateSshKeyInput;
import cn.notfound.gitone.server.controllers.sshKeys.inputs.DeleteSshKeyInput;
import cn.notfound.gitone.server.controllers.sshKeys.inputs.UpdateSshKeyInput;
import cn.notfound.gitone.server.entities.SshKeyUsage;
import cn.notfound.gitone.server.factories.*;
import cn.notfound.gitone.server.results.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.time.OffsetDateTime;
import java.util.Set;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class SshKeyMutationControllerTest extends BaseFactory {

    private static final String key1 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMQXSFVlTW1VbI3WJc4n1E46GVVXSREgvWfPpoh9wuNO";

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    private final SshKeyFactory sshKeyFactory;

    @Autowired
    public SshKeyMutationControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory,
            ProjectFactory projectFactory,
            SshKeyFactory sshKeyFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
        this.projectFactory = projectFactory;
        this.sshKeyFactory = sshKeyFactory;
    }

    @Test
    void createSshKey() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user1 = userFactory.viewer(session1);
        UserResult user2 = userFactory.viewer(session2);
        GroupResult group1 = groupFactory.create(session1);
        ProjectResult project1 = projectFactory.create(session1);

        // user namespace

        SshKeyResult result = sshKeyFactory.create(session1, user1.namespace(), key1);

        DeleteSshKeyInput deleteSshKeyInput = new DeleteSshKeyInput();
        deleteSshKeyInput.setId(result.getId());
        mutationDeleteSshKey(session1, deleteSshKeyInput, result, null);

        // group namespace

        result = sshKeyFactory.create(session1, group1, key1);
        deleteSshKeyInput.setId(result.getId());
        mutationDeleteSshKey(session1, deleteSshKeyInput, result, null);

        // project namespace

        result = sshKeyFactory.create(session1, project1, key1);
        deleteSshKeyInput.setId(result.getId());
        mutationDeleteSshKey(session1, deleteSshKeyInput, result, null);

        // 验证、权限

        CreateSshKeyInput input = new CreateSshKeyInput();
        input.setFullPath(user1.getUsername());
        input.setTitle("title " + user1.getUsername());
        input.setKey("ssh key");
        input.setUsages(Set.of(SshKeyUsage.READ, SshKeyUsage.WRITE));
        input.setExpiresAt(SshKeyFactory.DATE_TIME_2);

        mutationCreateSshKey(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateSshKey(session1, input, ErrorType.BAD_REQUEST);
        mutationCreateSshKey(session2, input, ErrorType.FORBIDDEN);

        input.setFullPath(user1.getUsername());
        input.setTitle("key1");
        input.setKey(key1);
        result = mutationCreateSshKey(session1, input, null);

        input.setFullPath(user2.getUsername());
        mutationCreateSshKey(session2, input, ErrorType.INTERNAL_ERROR);

        deleteSshKeyInput = new DeleteSshKeyInput();
        deleteSshKeyInput.setId(result.getId());
        mutationDeleteSshKey(session1, deleteSshKeyInput, result, null);
    }

    @Test
    void updateSshKey() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user1 = userFactory.viewer(session1);

        SshKeyResult result = sshKeyFactory.create(session1, user1.namespace(), key1);

        UpdateSshKeyInput input = new UpdateSshKeyInput();
        input.setId(result.getId());
        input.setTitle("new title");
        input.setUsages(Set.of(SshKeyUsage.READ, SshKeyUsage.WRITE));
        input.setExpiresAt(SshKeyFactory.DATE_TIME_2);
        result.setTitle(input.getTitle());
        result.setUsages(input.getUsages());
        result.setExpiresAt(input.getExpiresAt());

        mutationUpdateSshKey(null, input, null, ErrorType.UNAUTHORIZED);
        mutationUpdateSshKey(session1, input, result, null);
        mutationUpdateSshKey(session2, input, null, ErrorType.FORBIDDEN);

        DeleteSshKeyInput deleteSshKeyInput = new DeleteSshKeyInput();
        deleteSshKeyInput.setId(result.getId());
        mutationDeleteSshKey(session1, deleteSshKeyInput, result, null);

        mutationUpdateSshKey(session1, input, null, ErrorType.NOT_FOUND);
    }

    @Test
    void deleteSshKey() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user1 = userFactory.viewer(session1);
        SshKeyResult result = sshKeyFactory.create(session1, user1.namespace(), key1);

        DeleteSshKeyInput input = new DeleteSshKeyInput();
        input.setId(result.getId());
        mutationDeleteSshKey(null, input, null, ErrorType.UNAUTHORIZED);
        mutationDeleteSshKey(session2, input, null, ErrorType.FORBIDDEN);
        mutationDeleteSshKey(session1, input, result, null);
        mutationDeleteSshKey(session1, input, null, ErrorType.NOT_FOUND);
    }

    private SshKeyResult mutationCreateSshKey(SessionResult session, CreateSshKeyInput input, ErrorType errorType) {
        GraphQlTester.Response response = mutate("createSshKey", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return null;
        }

        return response.path("payload.sshKey.title").entity(String.class).isEqualTo(input.getTitle())
                .path("payload.sshKey.key").entity(String.class).isEqualTo(input.getKey())
                .path("payload.sshKey.expiresAt").entity(OffsetDateTime.class).isEqualTo(input.getExpiresAt())
                .path("payload.sshKey.namespace.fullPath").entity(String.class).isEqualTo(input.getFullPath())
                .path("payload.sshKey").entity(SshKeyResult.class).get();
    }

    private void mutationUpdateSshKey(SessionResult session, UpdateSshKeyInput input, SshKeyResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updateSshKey", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.sshKey.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.sshKey.title").entity(String.class).isEqualTo(result.getTitle())
                .path("payload.sshKey.key").entity(String.class).isEqualTo(result.getKey())
                .path("payload.sshKey.expiresAt").entity(OffsetDateTime.class).isEqualTo(result.getExpiresAt())
                .path("payload.sshKey.namespace.id").entity(String.class).isEqualTo(result.getNamespace().getId());
    }

    private void mutationDeleteSshKey(SessionResult session, DeleteSshKeyInput input, SshKeyResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("deleteSshKey", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.sshKey.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.sshKey.namespace.id").entity(String.class).isEqualTo(result.getNamespace().getId());
    }
}
