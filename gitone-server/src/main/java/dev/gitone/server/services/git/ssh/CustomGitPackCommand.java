package dev.gitone.server.services.git.ssh;

import org.apache.sshd.common.util.ValidateUtils;
import org.apache.sshd.common.util.threads.CloseableExecutorService;
import org.apache.sshd.git.GitLocationResolver;
import org.apache.sshd.git.pack.GitPackCommand;

import java.io.IOException;
import java.nio.file.Path;

public class CustomGitPackCommand extends GitPackCommand {

    public CustomGitPackCommand(GitLocationResolver rootDirResolver, String command, CloseableExecutorService executorService) {
        super(rootDirResolver, command, executorService);
    }

    @Override
    protected Path resolveRootDirectory(String command, String[] args) throws IOException {
        GitLocationResolver resolver = getGitLocationResolver();
        Path rootDir = resolver.resolveRootDirectory(command, args, getServerSession(), getFileSystem());
        ValidateUtils.checkState(rootDir != null, "No root directory provided for %s command", command);
        return rootDir;
    }
}
