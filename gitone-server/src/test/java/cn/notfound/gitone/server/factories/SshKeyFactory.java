package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.sshKeys.inputs.CreateSshKeyInput;
import cn.notfound.gitone.server.entities.SshKeyUsage;
import cn.notfound.gitone.server.results.NamespaceResult;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.SshKeyResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

import java.time.OffsetDateTime;
import java.util.Set;

@Component
public class SshKeyFactory extends BaseFactory {

    public static final OffsetDateTime DATE_TIME_1 = OffsetDateTime.parse("2038-01-01T00:00:00Z");

    public static final OffsetDateTime DATE_TIME_2 = OffsetDateTime.parse("2039-01-01T00:00:00Z");

    @Autowired
    public SshKeyFactory(WebGraphQlTester graphQlTester) {
        super(graphQlTester);
    }

    public SshKeyResult create(SessionResult session, NamespaceResult namespace, String key) {
        CreateSshKeyInput input = new CreateSshKeyInput();
        input.setFullPath(namespace.getFullPath());
        input.setTitle("title");
        input.setKey(key);
        input.setUsages(Set.of(SshKeyUsage.READ, SshKeyUsage.WRITE));
        input.setExpiresAt(DATE_TIME_1);
        return mutate("createSshKey", session, input)
                .path("payload.sshKey.title").entity(String.class).isEqualTo(input.getTitle())
                .path("payload.sshKey.key").entity(String.class).isEqualTo(input.getKey())
                .path("payload.sshKey.expiresAt").entity(OffsetDateTime.class).isEqualTo(input.getExpiresAt())
                .path("payload.sshKey.namespace.fullPath").entity(String.class).isEqualTo(input.getFullPath())
                .path("payload.sshKey").entity(SshKeyResult.class).get();
    }
}
