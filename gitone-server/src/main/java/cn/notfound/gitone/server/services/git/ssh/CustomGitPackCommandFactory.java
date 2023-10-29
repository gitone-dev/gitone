package cn.notfound.gitone.server.services.git.ssh;

import org.apache.sshd.common.util.threads.CloseableExecutorService;
import org.apache.sshd.git.AbstractGitCommandFactory;
import org.apache.sshd.git.GitLocationResolver;
import org.apache.sshd.server.command.CommandFactory;

import java.util.function.Supplier;

public class CustomGitPackCommandFactory extends AbstractGitCommandFactory {

    public static final String GIT_FACTORY_NAME = "git-pack";

    public static final String GIT_COMMAND_PREFIX = "git-";

    public CustomGitPackCommandFactory() {
        this(null);
    }

    public CustomGitPackCommandFactory(GitLocationResolver resolver) {
        super(GIT_FACTORY_NAME, GIT_COMMAND_PREFIX);
        withGitLocationResolver(resolver);
    }

    @Override
    public CustomGitPackCommandFactory withDelegate(CommandFactory delegate) {
        return (CustomGitPackCommandFactory) super.withDelegate(delegate);
    }

    @Override
    public CustomGitPackCommandFactory withExecutorServiceProvider(Supplier<? extends CloseableExecutorService> provider) {
        return (CustomGitPackCommandFactory) super.withExecutorServiceProvider(provider);
    }

    @Override
    protected CustomGitPackCommand createGitCommand(String command) {
        return new CustomGitPackCommand(getGitLocationResolver(), command, resolveExecutorService(command));
    }
}
