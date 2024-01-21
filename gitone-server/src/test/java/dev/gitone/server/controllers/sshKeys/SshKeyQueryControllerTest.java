package dev.gitone.server.controllers.sshKeys;

import dev.gitone.server.controllers.sshKeys.inputs.DeleteSshKeyInput;
import dev.gitone.server.factories.*;
import dev.gitone.server.results.*;
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
class SshKeyQueryControllerTest extends BaseFactory {

    public static final String key1 = "ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBJXK84" +
            "aVfRZkKaM+VMPVCHV9PwMJ8L4pnJFWsUkVV1PdUjMSN2W/XuII4ZxLT+XGRw7a26adZP+TgA9+HUd1ekU=";
    public static final String key2 = "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIDfzGI89ENR4Hr2rZpijp+D4VcLGpXsbwpIQCTvJTWVx";
    public static final String key3 = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC+6VDZd0XDr13xEV4hB/QchIeQgT3yDp+d8kry+8" +
            "wyHVTpI6cF+llqxRrcPpSQqugN+NezxrMAyZ1RLVb5nXz/gZflPnY+MHCN6dKhElvWBlEpYWRcdZx+rCmzBU0TUacSbYjGvjO9wAOu0p" +
            "PR09SnMEIsUEntfBBqpXyPvoyuspNe0t+LYP8GYjMlc1SQduESHSItvBHR/dSzyY+Okyb1G3wjBtI7JPitAzdTuuBxX1+Q5tJv+BTGRU" +
            "Z/v3XyTGP+yjDvHjQlzHHPKyhnpc9xFGaBeHZ8LvJE/8Na4a342hYa21SXCH8E0Cuj6kMLw9ErghZFoZU+WqAhxwD5RSvWW8hvhzXSLa" +
            "586nrlu0WjphgBffaK8K9OycZJguHMpORm/qYtf9FsA+eYBuo2IxBxkXgzyy3GkHgsz1QS9k9kCzCnE17/06EJO8XB4pNdZwfK6o8pqo" +
            "Wl5mwsYenCRuos683HohwrmU/Iq14u7S1po9H7L9cTEWcz90doVsT4070";

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    private final SshKeyFactory sshKeyFactory;

    @Autowired
    public SshKeyQueryControllerTest(
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
    void sshKeys() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult u1 = userFactory.viewer(session1);
        UserResult user2 = userFactory.viewer(session2);
        ProjectResult u1p1 = projectFactory.create(session1);
        GroupResult g1 = groupFactory.create(session1);
        GroupResult g1g2 = groupFactory.create(session1, g1);
        ProjectResult g1g2p1 = projectFactory.create(session1, g1g2);

        SshKeyResult result1, result2, result3;

        // user and project

        result1 = sshKeyFactory.create(session1, u1.namespace(), key1);
        result2 = sshKeyFactory.create(session1, u1p1, key2);
        querySshKeys(session1, u1.getUsername(), List.of(result1), null);
        querySshKeys(session1, u1p1.getFullPath(), List.of(result2), null);

        mutationDeleteSshKey(session1, result1);
        mutationDeleteSshKey(session1, result2);

        // group and project

        result1 = sshKeyFactory.create(session1, g1, key1);
        result2 = sshKeyFactory.create(session1, g1g2, key2);
        result3 = sshKeyFactory.create(session1, g1g2p1, key3);
        querySshKeys(session1, g1.getFullPath(), List.of(result1), null);
        querySshKeys(session1, g1g2.getFullPath(), List.of(result2, result1), null);
        querySshKeys(session1, g1g2p1.getFullPath(), List.of(result3, result2, result1), null);

        mutationDeleteSshKey(session1, result1);
        mutationDeleteSshKey(session1, result2);
        mutationDeleteSshKey(session1, result3);

        // 权限

        querySshKeys(null, g1.getFullPath(), null, ErrorType.UNAUTHORIZED);
        querySshKeys(session2, g1.getFullPath(), null, ErrorType.FORBIDDEN);
        querySshKeys(session1, g1.getFullPath(), List.of(), null);
    }

    private void querySshKeys(SessionResult session, String fullPath, List<SshKeyResult> result, ErrorType errorType) {
        GraphQlTester.Response response = query("sshKeys", session)
                .variable("fullPath", fullPath)
                .variable("first", 20)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        for (int i = 0; i < result.size(); i++) {
            response.path(String.format("sshKeys.edges[%d].node.title", i)).entity(String.class).isEqualTo(result.get(i).getTitle())
                    .path(String.format("sshKeys.edges[%d].node.key", i)).entity(String.class).isEqualTo(result.get(i).getKey())
                    .path(String.format("sshKeys.edges[%d].node.namespace.id", i)).entity(String.class).isEqualTo(result.get(i).getNamespace().getId());
        }
    }

    private void mutationDeleteSshKey(SessionResult session, SshKeyResult result) {
        DeleteSshKeyInput input = new DeleteSshKeyInput();
        input.setId(result.getId());

        mutate("deleteSshKey", session, input)
                .path("payload.sshKey.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.sshKey.namespace.id").entity(String.class).isEqualTo(result.getNamespace().getId());
    }
}
