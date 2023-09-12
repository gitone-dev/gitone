package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.controllers.groups.GroupFilter;
import cn.notfound.gitone.server.controllers.groups.GroupPage;
import cn.notfound.gitone.server.controllers.groups.inputs.*;
import cn.notfound.gitone.server.daos.GroupDao;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.GroupPolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@AllArgsConstructor
@Service
public class GroupService extends ViewerContext {

    private GroupDao groupDao;

    private GroupPolicy groupPolicy;

    private MemberDao memberDao;

    public GroupEntity create(CreateGroupInput input) {
        GroupEntity groupEntity = input.entity();
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
        groupPolicy.assertPermission(groupEntity, Action.DELETE);

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
        groupPolicy.assertPermission(groupEntity, Action.UPDATE);

        if (!groupEntity.getName().equals(input.getName())) {
            groupEntity.setName(input.getName());
            if (groupEntity.getParentId() == 0) {
                groupEntity.setFullName(input.getName());
            } else {
                GroupEntity parent = groupDao.find(groupEntity.getParentId());
                groupEntity.setFullName(String.join("/", parent.getFullName(), groupEntity.getName()));
            }
        }
        groupEntity.setDescription(input.getDescription());
        return groupDao.update(groupEntity);
    }

    public GroupEntity updatePath(UpdateGroupPathInput input) {
        GroupEntity groupEntity = groupDao.find(input.id());
        groupPolicy.assertPermission(groupEntity, Action.UPDATE);

        groupEntity.setPath(input.getPath());
        if (groupEntity.getParentId() == 0) {
            groupEntity.setFullPath(input.getPath());
        } else {
            GroupEntity parent = groupDao.find(groupEntity.getParentId());
            groupEntity.setFullPath(String.join("/", parent.getFullPath(), groupEntity.getPath()));
        }
        return groupDao.update(groupEntity);
    }

    public GroupEntity updateVisibility(UpdateGroupVisibilityInput input) {
        GroupEntity groupEntity = groupDao.find(input.id());
        groupPolicy.assertPermission(groupEntity, Action.UPDATE);

        if (groupEntity.getParentId() != 0) {
            GroupEntity parent = groupDao.find(groupEntity.getParentId());
            Assert.isTrue(input.getVisibility().le(parent.getVisibility()), "可见性不能超过父级");
        }

        groupEntity.setVisibility(input.getVisibility());
        return groupDao.update(groupEntity);
    }
}
