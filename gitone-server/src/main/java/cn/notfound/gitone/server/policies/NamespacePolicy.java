package cn.notfound.gitone.server.policies;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import static cn.notfound.gitone.server.policies.Action.*;

@Component
public class NamespacePolicy extends ViewerContext {

    private static final Map<Access, Set<Action>> accessActionsMap = new HashMap<>();

    static {
        for (Access value : Access.values()) {
            accessActionsMap.put(value, NamespacePolicy.forAccess(value));
        }
    }

    public static Set<Action> forAccess(Access access) {
        return switch (access) {
            case OWNER -> Set.of(
                    READ, UPDATE, DELETE
            );
            case MAINTAINER -> Set.of(
                    READ, UPDATE
            );
            case REPORTER, MIN_ACCESS -> Set.of(
                    READ
            );
            default -> Set.of();
        };
    }

    protected final MemberDao memberDao;

    @Autowired
    public NamespacePolicy(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public Policy policy(NamespaceEntity namespaceEntity) {
        NotFound.notNull(namespaceEntity, "命名空间不存在");

        Policy policy = new Policy(this.getClass(), namespaceEntity.getId());
        if (isAuthenticated() && namespaceEntity.isUser()) {
            if (namespaceEntity.getId().equals(userDetails().getNamespaceId())) {
                policy.setAccess(Access.OWNER);
            } else {
                policy.setAccess(Access.MIN_ACCESS);
            }
        } else if (isAuthenticated()) {
            MemberEntity memberEntity = memberDao.findByAncestors(namespaceEntity.traversalIds(), viewerId());
            if (memberEntity != null) {
                policy.setAccess(memberEntity.getAccess());
            } else if (memberDao.findByDescendants(namespaceEntity.getId(), viewerId()) != null) {
                policy.setAccess(Access.MIN_ACCESS);
            }
        }
        if (policy.getAccess().lt(Access.MIN_ACCESS) && namespaceEntity.isPublic()) {
            policy.setAccess(Access.MIN_ACCESS);
        }

        policy.setActions(accessActions().get(policy.getAccess()));

        return policy;
    }

    public Map<Access, Set<Action>> accessActions() {
        return NamespacePolicy.accessActionsMap;
    }

    public MemberEntity assertPermission(NamespaceEntity namespaceEntity, Action action) {
        NotFound.notNull(namespaceEntity, "命名空间不存在");

        MemberEntity memberEntity = null;
        if (isAuthenticated() && namespaceEntity.isUser()) {
            if (namespaceEntity.getId().equals(userDetails().getNamespaceId())) {
                return null;
            }
        } else if (isAuthenticated()) {
            memberEntity = memberDao.findByAncestors(namespaceEntity.traversalIds(), viewerId());
        }

        if (namespaceEntity.isPublic()) {
            if (action.equals(READ)) return memberEntity;
            if (action.equals(READ_MEMBER)) return memberEntity;
        } else if (memberEntity == null && isAuthenticated() && !namespaceEntity.isUser()) {
            Forbidden.isTrue(accessActionsMap.get(Access.MIN_ACCESS).contains(action), "无权限");
            Forbidden.notNull(memberDao.findByDescendants(namespaceEntity.getId(), viewerId()), "无权限");
            return null;
        }

        Forbidden.notNull(memberEntity, "无权限");
        Forbidden.isTrue(accessActionsMap.get(memberEntity.getAccess()).contains(action), "无权限");

        return memberEntity;
    }
}
