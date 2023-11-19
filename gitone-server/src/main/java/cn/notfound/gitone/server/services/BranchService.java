package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.branches.inputs.CreateBranchInput;
import cn.notfound.gitone.server.controllers.branches.inputs.DeleteBranchInput;
import cn.notfound.gitone.server.daos.ProjectDao;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.models.git.GitBranch;
import cn.notfound.gitone.server.models.git.GitRepository;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
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
