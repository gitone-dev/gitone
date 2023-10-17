package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.projects.inputs.*;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.daos.ProjectDao;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@AllArgsConstructor
@Service
public class ProjectService extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final ProjectDao projectDao;

    private final MemberDao memberDao;

    public ProjectEntity create(CreateProjectInput input) {
        ProjectEntity projectEntity = input.entity();

        NamespaceEntity parent = namespaceDao.find(input.parentId());
        NotFound.notNull(parent, input.getParentId());
        Assert.isTrue(ProjectEntity.namespaceTypes.contains(parent.getType()), "上级命名空间类型不正确");
        Assert.isTrue(parent.isPublic() || projectEntity.isPrivate(), "无法在私有组织下创建公开项目");
        namespacePolicy.assertPermission(parent, Action.UPDATE);
        projectEntity.setParentId(parent.getId());

        projectEntity.setFullName(String.join("/", parent.getFullName(), projectEntity.getName()));
        projectEntity.setFullPath(String.join("/", parent.getFullPath(), projectEntity.getPath()));
        projectEntity.setTraversalIds(parent.getTraversalIds());
        projectDao.create(projectEntity);

        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setNamespaceId(projectEntity.getId());
        memberEntity.setUserId(viewerId());
        memberEntity.setAccess(Access.OWNER);
        memberEntity.setCreatedById(viewerId());
        memberDao.create(memberEntity);

        return projectEntity;
    }

    public ProjectEntity delete(DeleteProjectInput input) {
        ProjectEntity projectEntity = projectDao.find(input.id());
        namespacePolicy.assertPermission(projectEntity, Action.DELETE);

        memberDao.deleteByNamespaceId(projectEntity.getId());
        return projectDao.delete(projectEntity);
    }

    public ProjectEntity update(UpdateProjectInput input) {
        ProjectEntity projectEntity = projectDao.find(input.id());
        namespacePolicy.assertPermission(projectEntity, Action.UPDATE);

        NamespaceEntity parent = namespaceDao.find(projectEntity.getParentId());

        projectEntity.setDescription(input.getDescription());
        projectEntity.setName(input.getName());
        projectEntity.setFullName(String.join("/", parent.getFullName(), projectEntity.getName()));
        return projectDao.update(projectEntity);
    }
}
