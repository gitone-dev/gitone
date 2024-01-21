package dev.gitone.server.services.git.http;

import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.models.CustomUserDetails;
import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import dev.gitone.server.util.StoragePath;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.eclipse.jgit.errors.RepositoryNotFoundException;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.lib.RepositoryCache;
import org.eclipse.jgit.lib.RepositoryCache.FileKey;
import org.eclipse.jgit.transport.ServiceMayNotContinueException;
import org.eclipse.jgit.transport.resolver.RepositoryResolver;
import org.eclipse.jgit.transport.resolver.ServiceNotAuthorizedException;
import org.eclipse.jgit.transport.resolver.ServiceNotEnabledException;
import org.eclipse.jgit.util.FS;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.security.Principal;

@AllArgsConstructor
@Component
public class HttpRepositoryResolver implements RepositoryResolver<HttpServletRequest> {

    public static final String PROJECT = "http.repository.resolver.project";

    private final ProjectDao projectDao;

    private final NamespacePolicy namespacePolicy;

    @Override
    public Repository open(HttpServletRequest req, String fullPath) throws RepositoryNotFoundException,
            ServiceNotAuthorizedException, ServiceNotEnabledException, ServiceMayNotContinueException {

        if (fullPath.endsWith(Constants.DOT_GIT_EXT))
            fullPath = fullPath.substring(0, fullPath.length() - Constants.DOT_GIT_EXT.length());

        if (isUnreasonableName(fullPath)) throw new RepositoryNotFoundException(fullPath);

        ProjectEntity projectEntity = projectDao.findByFullPath(fullPath);
        if (projectEntity == null) throw new RepositoryNotFoundException(fullPath);

        if (!projectEntity.isPublic()) {
            CustomUserDetails viewer = userDetails(req);
            if (viewer == null) throw new ServiceNotAuthorizedException();

            try {
                namespacePolicy.assertPermission(projectEntity, Action.READ);
            } catch (RuntimeException e) {
                throw new ServiceNotEnabledException();
            }
        }

        File dir = Paths.get(GitRepository.getRootPath(), StoragePath.get(projectEntity)).toFile();
        if (!FileKey.isGitRepository(dir, FS.DETECTED)) throw new RepositoryNotFoundException(fullPath);

        FileKey key = FileKey.exact(dir, FS.DETECTED);
        req.setAttribute(PROJECT, projectEntity);
        try {
            return RepositoryCache.open(key, true);
        } catch (IOException e) {
            throw new RepositoryNotFoundException(fullPath, e);
        }
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

    private static boolean isUnreasonableName(String name) {
        if (name.length() == 0)
            return true; // no empty paths

        if (name.indexOf('\\') >= 0)
            return true; // no windows/dos style paths
        if (new File(name).isAbsolute())
            return true; // no absolute paths

        if (name.startsWith("../")) //$NON-NLS-1$
            return true; // no "l../etc/passwd"
        if (name.contains("/../")) //$NON-NLS-1$
            return true; // no "foo/../etc/passwd"
        if (name.contains("/./")) //$NON-NLS-1$
            return true; // "foo/./foo" is insane to ask
        if (name.contains("//")) //$NON-NLS-1$
            return true; // double slashes is sloppy, don't use it

        return false; // is a reasonable name
    }
}
