package dev.gitone.server.services.git.ssh;

import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.daos.SshKeyDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.entities.SshKeyEntity;
import dev.gitone.server.entities.SshKeyUsage;
import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import dev.gitone.server.util.StoragePath;
import lombok.AllArgsConstructor;
import org.apache.sshd.common.util.ValidateUtils;
import org.apache.sshd.common.util.logging.AbstractLoggingBean;
import org.apache.sshd.git.GitLocationResolver;
import org.apache.sshd.server.session.ServerSession;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.transport.RemoteConfig;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.nio.file.FileSystem;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.OffsetDateTime;

@AllArgsConstructor
@Service
public class CustomGitLocationResolver extends AbstractLoggingBean implements GitLocationResolver {

    private final NamespacePolicy namespacePolicy;

    private final ProjectDao projectDao;

    private final SshKeyDao sshKeyDao;

    @Override
    public Path resolveRootDirectory(String command, String[] args, ServerSession session, FileSystem fs) {
        // FIXME: 2023/10/29 推送代码
        if (!RemoteConfig.DEFAULT_UPLOAD_PACK.equals(args[0])) return null;

        SshKeyEntity sshKeyEntity = session.getAttribute(CustomPublickeyAuthenticator.SSH_KEY);
        if (sshKeyEntity.isExpired()) return null;
        if (!sshKeyEntity.usages().contains(SshKeyUsage.READ)) return null;

        String fullPath = extractFullPath(args[1]);
        ProjectEntity projectEntity = projectDao.findByFullPath(fullPath);
        NotFound.notNull(projectEntity, fullPath);

        NamespaceEntity viewerNamespace = session.getAttribute(CustomPublickeyAuthenticator.NAMESPACE_KEY);
        if (!namespacePolicy.hasPermission(viewerNamespace, projectEntity, Action.READ)) {
            return null;
        }

        if (sshKeyEntity.getLastUsedAt() == null ||
                sshKeyEntity.getLastUsedAt().plusMinutes(1).isBefore(OffsetDateTime.now())) {
            sshKeyEntity.setLastUsedAt(OffsetDateTime.now());
            sshKeyDao.update(sshKeyEntity);
        }

        log.info("resolveRootDirectory({})[Id-{}]", command, viewerNamespace.getId());
        return Paths.get(GitRepository.getRootPath(), StoragePath.get(projectEntity));
    }

    private String extractFullPath(String pathArg) {
        Assert.hasText(pathArg, "path must not be empty");

        if (pathArg.charAt(0) == '/')
            pathArg = pathArg.substring(1);
        if (pathArg.endsWith(Constants.DOT_GIT_EXT))
            pathArg = pathArg.substring(0, pathArg.length() - Constants.DOT_GIT_EXT.length());

        ValidateUtils.checkNotNullAndNotEmpty(pathArg, "No %s command sub-path specified", pathArg);

        return pathArg;
    }
}
