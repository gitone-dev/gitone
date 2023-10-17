package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.groups.GroupFilter;
import cn.notfound.gitone.server.controllers.groups.GroupPage;
import cn.notfound.gitone.server.controllers.groups.inputs.CreateGroupInput;
import cn.notfound.gitone.server.controllers.groups.inputs.DeleteGroupInput;
import cn.notfound.gitone.server.controllers.groups.inputs.UpdateGroupInput;
import cn.notfound.gitone.server.daos.GroupDao;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@AllArgsConstructor
@Service
public class GroupService extends ViewerContext {

    private GroupDao groupDao;

    private NamespacePolicy namespacePolicy;

    private MemberDao memberDao;

    public GroupEntity create(CreateGroupInput input) {
        GroupEntity groupEntity = input.entity();
        if (groupEntity.getParentId() != 0) {
            GroupEntity parent = groupDao.find(groupEntity.getParentId());
            NotFound.notNull(parent, input.getParentId());
            Assert.isTrue(parent.isPublic() || groupEntity.isPrivate(), "私有组织下无法创建公开子组");
            namespacePolicy.assertPermission(parent, Action.UPDATE);

            groupEntity.setFullName(String.join("/", parent.getFullName(), groupEntity.getName()));
            groupEntity.setFullPath(String.join("/", parent.getFullPath(), groupEntity.getPath()));
            groupEntity.setTraversalIds(parent.getTraversalIds());
        }
        groupDao.create(groupEntity);

        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setNamespaceId(groupEntity.getId());
        memberEntity.setUserId(viewerId());
        memberEntity.setAccess(Access.OWNER);
        memberEntity.setCreatedById(viewerId());
        memberDao.create(memberEntity);

        return groupEntity;
    }

    public GroupEntity delete(DeleteGroupInput input) {
        GroupEntity groupEntity = groupDao.find(input.id());
        namespacePolicy.assertPermission(groupEntity, Action.DELETE);

        GroupPage page = new GroupPage(1);
        GroupFilter filter = new GroupFilter();
        filter.setParentId(groupEntity.getId());
        List<GroupEntity> groupEntities = groupDao.findAll(filter ,page);
        Assert.isTrue(groupEntities.isEmpty(), "有子组织");

        memberDao.deleteByNamespaceId(groupEntity.getId());

        return groupDao.delete(groupEntity);
    }

    public GroupEntity update(UpdateGroupInput input) {
        GroupEntity groupEntity = groupDao.find(input.id());
        namespacePolicy.assertPermission(groupEntity, Action.UPDATE);

        groupEntity.setDescription(input.getDescription());
        if (groupEntity.getName().equals(input.getName())) {
            return groupDao.update(groupEntity);
        } else {
            String oldFullName = groupEntity.getFullName();

            groupEntity.setName(input.getName());
            if (groupEntity.getParentId() == 0) {
                groupEntity.setFullName(input.getName());
            } else {
                GroupEntity parent = groupDao.find(groupEntity.getParentId());
                groupEntity.setFullName(String.join("/", parent.getFullName(), groupEntity.getName()));
            }
            return groupDao.updateName(groupEntity, oldFullName);
        }
    }
}
