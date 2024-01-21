package dev.gitone.server.services.git.http;

import dev.gitone.jgit.http.server.HttpServerText;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.models.CustomUserDetails;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import jakarta.servlet.http.HttpServletRequest;
import org.eclipse.jgit.lib.PersonIdent;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.ReceivePack;
import org.eclipse.jgit.transport.resolver.ReceivePackFactory;
import org.eclipse.jgit.transport.resolver.ServiceNotAuthorizedException;
import org.eclipse.jgit.transport.resolver.ServiceNotEnabledException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class HttpReceivePackFactory implements ReceivePackFactory<HttpServletRequest> {

    private final NamespacePolicy namespacePolicy;

    private boolean enabled;

    public HttpReceivePackFactory(NamespacePolicy namespacePolicy) {
        this.namespacePolicy = namespacePolicy;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public ReceivePack create(HttpServletRequest req, Repository db)
            throws ServiceNotEnabledException, ServiceNotAuthorizedException {

        if (!enabled) throw new ServiceNotEnabledException();

        CustomUserDetails viewer = userDetails(req);
        if (viewer == null) throw new ServiceNotAuthorizedException();

        ProjectEntity project = (ProjectEntity) req.getAttribute(HttpRepositoryResolver.PROJECT);
        if (project == null) throw new ServiceNotEnabledException();

        try {
            namespacePolicy.assertPermission(project, Action.UPDATE);
        } catch (RuntimeException e) {
            throw new ServiceNotEnabledException(HttpServerText.get().repositoryAccessForbidden);
        }

        return createFor(db, viewer);
    }

    private CustomUserDetails userDetails(HttpServletRequest req) {
        Principal principal = req.getUserPrincipal();
        if (!(principal instanceof Authentication authentication))
            return null;

        if (authentication.getPrincipal() instanceof CustomUserDetails) {
            return (CustomUserDetails) authentication.getPrincipal();
        }

        return null;
    }

    private static ReceivePack createFor(final Repository db, final CustomUserDetails viewer) {
        final ReceivePack rp = new ReceivePack(db);
        rp.setRefLogIdent(toPersonIdent(viewer));
        return rp;
    }

    private static PersonIdent toPersonIdent(CustomUserDetails user) {
        String email = String.format("%d@server", user.getId());
        return new PersonIdent(user.getUsername(), email);
    }
}
