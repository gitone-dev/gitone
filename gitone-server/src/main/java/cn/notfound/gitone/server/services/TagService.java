package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.tags.inputs.CreateTagInput;
import cn.notfound.gitone.server.controllers.tags.inputs.DeleteTagInput;
import cn.notfound.gitone.server.daos.ProjectDao;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.models.git.GitBranch;
import cn.notfound.gitone.server.models.git.GitRepository;
import cn.notfound.gitone.server.models.git.GitTag;
import cn.notfound.gitone.server.models.git.GitUser;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.io.IOException;

@AllArgsConstructor
@Service
public class TagService extends ViewerContext {

    private final ProjectDao projectDao;

    private final NamespacePolicy namespacePolicy;

    public GitTag create(CreateTagInput input) throws IOException {
        ProjectEntity projectEntity = projectDao.findByFullPath(input.getFullPath());
        NotFound.notNull(projectEntity, input.getFullPath());
        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        GitRepository gitRepository = new GitRepository(projectEntity);
        GitTag tag = GitTag.find(gitRepository, input.getName());
        Assert.isNull(tag, String.format("%s 已存在", input.getName()));

        GitUser user = new GitUser(userDetails().getName(), userDetails().getEmail());
        return GitTag.create(gitRepository, user, input.getName(), input.getRevision(), input.getMessage());
    }

    public GitTag delete(DeleteTagInput input) throws IOException {
        ProjectEntity projectEntity = projectDao.findByFullPath(input.getFullPath());
        NotFound.notNull(projectEntity, input.getFullPath());
        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        GitRepository gitRepository = new GitRepository(projectEntity);
        GitTag tag = GitTag.find(gitRepository, input.getName());
        NotFound.notNull(tag, String.format("%s 不存在", input.getName()));

        GitTag.delete(gitRepository, tag);
        return tag;
    }
}
