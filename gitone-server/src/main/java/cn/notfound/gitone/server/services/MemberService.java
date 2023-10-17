package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberPage;
import cn.notfound.gitone.server.controllers.members.inputs.CreateMemberInput;
import cn.notfound.gitone.server.controllers.members.inputs.DeleteMemberInput;
import cn.notfound.gitone.server.controllers.members.inputs.UpdateMemberInput;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@AllArgsConstructor
@Service
public class MemberService extends ViewerContext {

    private MemberDao memberDao;

    private NamespaceDao namespaceDao;

    private NamespacePolicy namespacePolicy;

    public MemberEntity create(CreateMemberInput input) {
        MemberEntity memberEntity = new MemberEntity();
        memberEntity.setCreatedById(viewerId());

        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(input.getFullPath());
        NotFound.notNull(namespaceEntity, input.getFullPath());
        Assert.isTrue(MemberEntity.namespaceTypes.contains(namespaceEntity.getType()), "命名空间类型错误");
        MemberEntity memberViewer = namespacePolicy.assertPermission(namespaceEntity, Action.CREATE_MEMBER);
        memberEntity.setNamespaceId(namespaceEntity.getId());

        Forbidden.isTrue(memberViewer.getAccess().ge(input.getAccess()), "无权限");
        memberEntity.setAccess(input.getAccess());

        NamespaceEntity userEntity = namespaceDao.find(input.userId());
        NotFound.notNull(userEntity, input.getUserId());
        Assert.isTrue(userEntity.isUser(), "用户类型错误");
        memberEntity.setUserId(userEntity.getId());

        return memberDao.create(memberEntity);
    }

    public MemberEntity update(UpdateMemberInput input) {
        MemberEntity memberEntity = memberDao.find(input.id());
        NotFound.notNull(memberEntity, input.getId());

        NamespaceEntity namespaceEntity = namespaceDao.find(memberEntity.getNamespaceId());
        MemberEntity memberViewer = namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE_MEMBER);
        Assert.isTrue(!memberEntity.getUserId().equals(namespaceEntity.getParentId()), "项目在用户名下，无法修改");

        Forbidden.isTrue(memberViewer.getAccess().ge(memberEntity.getAccess()), "无权限");
        Forbidden.isTrue(memberViewer.getAccess().ge(input.getAccess()), "无权限");

        if (memberEntity.getAccess().equals(Access.OWNER) && memberEntity.getId().equals(memberViewer.getId())) {
            MemberFilter filter = new MemberFilter().setAccess(Access.OWNER);
            filter.getTraversalIds().add(namespaceEntity.getId());

            MemberPage page = new MemberPage(2);
            List<MemberEntity> members = memberDao.findAll(filter, page);
            Assert.isTrue(members.size() == 2, "至少保留一位所有者");
        }

        memberEntity.setAccess(input.getAccess());
        return memberDao.update(memberEntity);
    }

    public MemberEntity delete(DeleteMemberInput input) {
        MemberEntity memberEntity = memberDao.find(input.id());
        NotFound.notNull(memberEntity, input.getId());

        NamespaceEntity namespaceEntity = namespaceDao.find(memberEntity.getNamespaceId());
        MemberEntity memberViewer = namespacePolicy.assertPermission(namespaceEntity, Action.DELETE_MEMBER);
        Forbidden.isTrue(memberViewer.getAccess().ge(memberEntity.getAccess()), "无权限");

        if (memberEntity.getAccess().equals(Access.OWNER) && memberEntity.getId().equals(memberViewer.getId())) {
            MemberFilter filter = new MemberFilter().setAccess(Access.OWNER);
            filter.getTraversalIds().add(namespaceEntity.getId());

            MemberPage page = new MemberPage(2);
            List<MemberEntity> members = memberDao.findAll(filter, page);
            Assert.isTrue(members.size() == 2, "至少保留一位所有者");
        }

        return memberDao.delete(memberEntity);
    }
}
