package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.projects.inputs.*;
import cn.notfound.gitone.server.daos.*;
import cn.notfound.gitone.server.entities.*;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.GroupPolicy;
import cn.notfound.gitone.server.policies.ProjectPolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

@AllArgsConstructor
@Service
public class ProjectService extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final UserNamespaceDao userNamespaceDao;

    private final GroupDao groupDao;

    private final GroupPolicy groupPolicy;

    private final ProjectDao projectDao;

    private final ProjectPolicy projectPolicy;

    private final MemberDao memberDao;

    public ProjectEntity create(CreateProjectInput input) {
        ProjectEntity projectEntity = input.entity();

        NamespaceEntity parent;
        switch (input.parentType()) {
            case GroupEntity.TYPE -> {
                parent = groupDao.find(projectEntity.getParentId());
                NotFound.notNull(parent, input.getParentId());
                Assert.isTrue(parent.isPublic() || projectEntity.isPrivate(), "无法在私有组织下创建公开项目");
                groupPolicy.assertPermission(parent, Action.UPDATE);
            }
            case UserNamespaceEntity.TYPE -> {
                Forbidden.isTrue(namespaceId().equals(projectEntity.getParentId()), "无法在其他用户名下创建项目");
                parent = userNamespaceDao.find(projectEntity.getParentId());
                NotFound.notNull(parent, input.getParentId());

            }
            default -> throw new IllegalArgumentException("parentId 格式错误");
        }

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
        projectPolicy.assertPermission(projectEntity, Action.DELETE);

        memberDao.deleteByNamespaceId(projectEntity.getId());
        return projectDao.delete(projectEntity);
    }

    public ProjectEntity update(UpdateProjectInput input) {
        ProjectEntity projectEntity = projectDao.find(input.id());
        projectPolicy.assertPermission(projectEntity, Action.UPDATE);

        NamespaceEntity parent = namespaceDao.find(projectEntity.getParentId());

        projectEntity.setDescription(input.getDescription());
        projectEntity.setName(input.getName());
        projectEntity.setFullName(String.join("/", parent.getFullName(), projectEntity.getName()));
        return projectDao.update(projectEntity);
    }

    public ProjectEntity updatePath(UpdateProjectPathInput input) {
        ProjectEntity projectEntity = projectDao.find(input.id());
        projectPolicy.assertPermission(projectEntity, Action.UPDATE);

        NamespaceEntity parent = namespaceDao.find(projectEntity.getParentId());

        projectEntity.setPath(input.getPath());
        projectEntity.setFullPath(String.join("/", parent.getFullPath(), projectEntity.getPath()));
        return projectDao.update(projectEntity);
    }

    public ProjectEntity updateVisibility(UpdateProjectVisibilityInput input) {
        ProjectEntity projectEntity = projectDao.find(input.id());
        projectPolicy.assertPermission(projectEntity, Action.UPDATE);

        if (input.toPublic(projectEntity)) {
            NamespaceEntity parent = namespaceDao.find(projectEntity.getParentId());
            Assert.isTrue(parent.isPublic(), "上一级组织私有，当前组织无法转换为公开");
        }

        projectEntity.setVisibility(input.getVisibility());
        return projectDao.update(projectEntity);
    }
}
