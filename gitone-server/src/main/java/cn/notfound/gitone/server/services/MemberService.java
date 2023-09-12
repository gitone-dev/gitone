package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.Forbidden;
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
import cn.notfound.gitone.server.policies.GroupPolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@AllArgsConstructor
@Service
public class MemberService extends ViewerContext {

    private MemberDao memberDao;

    private NamespaceDao namespaceDao;

    private GroupPolicy groupPolicy;

    public MemberEntity create(CreateMemberInput input) {
        MemberEntity memberEntity = input.entity(viewerId());

        NamespaceEntity namespaceEntity = namespaceDao.find(memberEntity.getNamespaceId());
        MemberEntity memberViewer = groupPolicy.assertPermission(namespaceEntity, Action.CREATE_MEMBER);
        Forbidden.isTrue(memberViewer.getAccess().ge(input.getAccess()), "无权限");

        return memberDao.create(memberEntity);
    }

    public MemberEntity update(UpdateMemberInput input) {
        MemberEntity memberEntity = memberDao.find(input.id());

        NamespaceEntity namespaceEntity = namespaceDao.find(memberEntity.getNamespaceId());
        MemberEntity memberViewer = groupPolicy.assertPermission(namespaceEntity, Action.UPDATE_MEMBER);

        Forbidden.isTrue(memberViewer.getAccess().ge(memberEntity.getAccess()), "无权限");
        Forbidden.isTrue(memberViewer.getAccess().ge(input.getAccess()), "无权限");

        if (memberEntity.getAccess().equals(Access.OWNER) && memberEntity.getId().equals(memberViewer.getId())) {
            MemberFilter filter = new MemberFilter().setAccess(Access.OWNER).setNamespaceId(namespaceEntity.getId());
            MemberPage page = new MemberPage(2);
            List<MemberEntity> members = memberDao.findAll(filter, page);
            Assert.isTrue(members.size() == 2, "至少保留一位所有者");
        }

        memberEntity.setAccess(input.getAccess());
        return memberDao.update(memberEntity);
    }

    public MemberEntity delete(DeleteMemberInput input) {
        MemberEntity memberEntity = memberDao.find(input.id());

        NamespaceEntity namespaceEntity = namespaceDao.find(memberEntity.getNamespaceId());
        MemberEntity memberViewer = groupPolicy.assertPermission(namespaceEntity, Action.DELETE_MEMBER);
        Forbidden.isTrue(memberViewer.getAccess().ge(memberEntity.getAccess()), "无权限");

        if (memberEntity.getAccess().equals(Access.OWNER) && memberEntity.getId().equals(memberViewer.getId())) {
            MemberFilter filter = new MemberFilter().setAccess(Access.OWNER).setNamespaceId(namespaceEntity.getId());
            MemberPage page = new MemberPage(2);
            List<MemberEntity> members = memberDao.findAll(filter, page);
            Assert.isTrue(members.size() == 2, "至少保留一位所有者");
        }

        return memberDao.delete(memberEntity);
    }
}
