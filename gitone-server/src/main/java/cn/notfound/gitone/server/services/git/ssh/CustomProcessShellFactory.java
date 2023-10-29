package cn.notfound.gitone.server.services.git.ssh;

import org.apache.sshd.common.util.logging.AbstractLoggingBean;
import org.apache.sshd.server.channel.ChannelSession;
import org.apache.sshd.server.command.Command;
import org.apache.sshd.server.shell.ShellFactory;

import java.io.IOException;

public class CustomProcessShellFactory extends AbstractLoggingBean implements ShellFactory {

    public static final String FACTORY_NAME = "shell-command";

    @Override
    public Command createShell(ChannelSession channel) throws IOException {
        return new CustomProcessShell(FACTORY_NAME);
    }
}
