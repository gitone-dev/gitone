package dev.gitone.server.services;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.controllers.branches.inputs.CreateBranchInput;
import dev.gitone.server.controllers.branches.inputs.DeleteBranchInput;
import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.models.git.GitBranch;
import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.io.IOException;

@AllArgsConstructor
@Service
public class BranchService extends ViewerContext {

    private final ProjectDao projectDao;

    private final NamespacePolicy namespacePolicy;

    public GitBranch create(CreateBranchInput input) throws IOException {
        ProjectEntity projectEntity = projectDao.findByFullPath(input.getFullPath());
        NotFound.notNull(projectEntity, input.getFullPath());
        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        GitRepository gitRepository = new GitRepository(projectEntity);
        GitBranch branch = GitBranch.find(gitRepository, input.getName());
        Assert.isNull(branch, String.format("%s 已存在", input.getName()));

        return GitBranch.create(gitRepository, input.getName(), input.getRevision());
    }

    public GitBranch delete(DeleteBranchInput input) throws IOException {
        ProjectEntity projectEntity = projectDao.findByFullPath(input.getFullPath());
        NotFound.notNull(projectEntity, input.getFullPath());
        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        GitRepository gitRepository = new GitRepository(projectEntity);
        GitBranch branch = GitBranch.find(gitRepository, input.getName());
        NotFound.notNull(branch, String.format("%s 不存在", input.getName()));

        GitBranch.delete(gitRepository, branch);
        return branch;
    }
}
