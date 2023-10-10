package cn.notfound.gitone.server.policies;

import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.config.exception.Unauthorized;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

import static cn.notfound.gitone.server.policies.Action.*;

@Component
public class GroupPolicy extends NamespacePolicy {

    private static final Map<Access, Set<Action>> accessActionsMap = new HashMap<>();

    static {
        for (Access value : Access.values()) {
            accessActionsMap.put(value, GroupPolicy.forAccess(value));
        }
    }

    public static Set<Action> forAccess(Access access) {
        Set<Action> actions = switch (access) {
            case OWNER, MAINTAINER -> Set.of(
                    READ_MEMBER, CREATE_MEMBER, UPDATE_MEMBER, DELETE_MEMBER
            );
            case REPORTER, MIN_ACCESS -> Set.of(
                    READ_MEMBER
            );
            default -> Set.of();
        };
        actions = new HashSet<>(actions);
        actions.addAll(NamespacePolicy.forAccess(access));
        return Collections.unmodifiableSet(actions);
    }

    @Autowired
    public GroupPolicy(MemberDao memberDao) {
        super(memberDao);
    }

    @Override
    public Map<Access, Set<Action>> accessActions() {
        return GroupPolicy.accessActionsMap;
    }

    public MemberEntity assertPermission(NamespaceEntity namespaceEntity, Action action) {
        NotFound.notNull(namespaceEntity, "命名空间不存在");

        MemberEntity memberEntity = null;
        if (isAuthenticated()) {
            memberEntity = memberDao.findByAncestors(namespaceEntity.traversalIds(), viewerId());
        }

        if (namespaceEntity.isPublic()) {
            if (action.equals(READ)) return memberEntity;
            if (action.equals(Action.READ_MEMBER)) return memberEntity;
        } else if (memberEntity == null && isAuthenticated()) {
            Forbidden.isTrue(accessActionsMap.get(Access.MIN_ACCESS).contains(action), "无权限");
            Forbidden.notNull(memberDao.findByDescendants(namespaceEntity.getId(), viewerId()), "无权限");
            return null;
        }

        Unauthorized.isTrue(isAuthenticated(), "未登录");
        Forbidden.notNull(memberEntity, "无权限");
        Forbidden.isTrue(accessActionsMap.get(memberEntity.getAccess()).contains(action), "无权限");

        return memberEntity;
    }
}
