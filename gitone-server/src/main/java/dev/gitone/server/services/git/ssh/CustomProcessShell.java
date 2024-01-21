package dev.gitone.server.services.git.ssh;

import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.SshKeyEntity;
import org.apache.sshd.server.command.AbstractCommandSupport;
import org.apache.sshd.server.session.ServerSession;

import java.io.IOException;
import java.io.OutputStream;

public class CustomProcessShell extends AbstractCommandSupport {

    protected CustomProcessShell(String command) {
        super(command, null);
    }

    @Override
    public void run() {
        OutputStream out = getOutputStream();
        ServerSession session = getSession();
        SshKeyEntity sshKeyEntity = session.getAttribute(CustomPublickeyAuthenticator.SSH_KEY);
        NamespaceEntity viewerNamespace = session.getAttribute(CustomPublickeyAuthenticator.NAMESPACE_KEY);
        StringBuilder sb = new StringBuilder();
        sb.append("Hello, ").append(viewerNamespace.getFullName())
                .append(" (@").append(viewerNamespace.getFullPath()).append(")!");
        if (sshKeyEntity.isExpired()) {
            sb.append(" The key has expired.");
        }
        sb.append("\n");
        try {
            out.write(sb.toString().getBytes());
            onExit(0);
        } catch (IOException e) {
            onExit(-1, e.getMessage());
        }
    }
}
