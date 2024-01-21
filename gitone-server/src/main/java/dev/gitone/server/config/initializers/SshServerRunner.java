package dev.gitone.server.config.initializers;

import dev.gitone.server.config.CustomProperties;
import dev.gitone.server.services.git.ssh.CustomGitLocationResolver;
import dev.gitone.server.services.git.ssh.CustomGitPackCommandFactory;
import dev.gitone.server.services.git.ssh.CustomProcessShellFactory;
import dev.gitone.server.services.git.ssh.CustomPublickeyAuthenticator;
import lombok.AllArgsConstructor;
import org.apache.sshd.common.io.nio2.Nio2ServiceFactoryFactory;
import org.apache.sshd.common.keyprovider.FileKeyPairProvider;
import org.apache.sshd.common.keyprovider.KeyPairProvider;
import org.apache.sshd.server.SshServer;
import org.apache.sshd.server.auth.pubkey.CachingPublicKeyAuthenticator;
import org.apache.sshd.server.auth.pubkey.PublickeyAuthenticator;
import org.apache.sshd.server.command.CommandFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.nio.file.Path;
import java.util.List;

@AllArgsConstructor
@Component
public class SshServerRunner implements ApplicationRunner {

    private CustomProperties properties;

    private CustomPublickeyAuthenticator publickeyAuthenticator;

    private CustomGitLocationResolver gitLocationResolver;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (!properties.getSsh().getEnabled()) return;

        SshServer sshServer = SshServer.setUpDefaultServer();
        sshServer.setHost(properties.getSsh().getHost());
        sshServer.setPort(properties.getSsh().getPort());
        sshServer.setKeyPairProvider(keyPairProvider());
        sshServer.setKeyboardInteractiveAuthenticator(null);
        sshServer.setPasswordAuthenticator(null);
        sshServer.setPublickeyAuthenticator(publickeyAuthenticator());
        sshServer.setCommandFactory(commandFactory());
        sshServer.setShellFactory(new CustomProcessShellFactory());
        sshServer.setIoServiceFactoryFactory(new Nio2ServiceFactoryFactory());
        sshServer.start();
    }

    private KeyPairProvider keyPairProvider() {
        List<Path> keyPaths = properties.getSsh().getKeys().stream().map(Path::of).toList();
        return new FileKeyPairProvider(keyPaths);
    }

    private PublickeyAuthenticator publickeyAuthenticator() {
        return new CachingPublicKeyAuthenticator(publickeyAuthenticator);
    }

    private CommandFactory commandFactory() {
        return new CustomGitPackCommandFactory().withGitLocationResolver(gitLocationResolver);
    }
}
