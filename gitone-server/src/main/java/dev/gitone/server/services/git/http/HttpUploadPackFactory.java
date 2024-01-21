package dev.gitone.server.services.git.http;

import jakarta.servlet.http.HttpServletRequest;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.transport.UploadPack;
import org.eclipse.jgit.transport.resolver.ServiceNotAuthorizedException;
import org.eclipse.jgit.transport.resolver.ServiceNotEnabledException;
import org.eclipse.jgit.transport.resolver.UploadPackFactory;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class HttpUploadPackFactory implements UploadPackFactory<HttpServletRequest> {

    @Override
    public UploadPack create(HttpServletRequest req, Repository db)
            throws ServiceNotEnabledException, ServiceNotAuthorizedException {

        UploadPack up = new UploadPack(db);
        String header = req.getHeader("Git-Protocol"); //$NON-NLS-1$
        if (header != null) {
            String[] params = header.split(":"); //$NON-NLS-1$
            up.setExtraParameters(Arrays.asList(params));
        }
        return up;
    }
}
