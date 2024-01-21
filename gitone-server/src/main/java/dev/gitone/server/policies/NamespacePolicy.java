package dev.gitone.server.policies;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.exception.Forbidden;
import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.config.exception.Unauthorized;
import dev.gitone.server.daos.MemberDao;
import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.MemberEntity;
import dev.gitone.server.entities.NamespaceEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

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
                    Action.READ, Action.UPDATE, Action.DELETE,
                    Action.READ_MEMBER, Action.CREATE_MEMBER, Action.UPDATE_MEMBER, Action.DELETE_MEMBER
            );
            case MAINTAINER -> Set.of(
                    Action.READ, Action.UPDATE,
                    Action.READ_MEMBER, Action.CREATE_MEMBER, Action.UPDATE_MEMBER, Action.DELETE_MEMBER
            );
            case REPORTER, MIN_ACCESS -> Set.of(
                    Action.READ,
                    Action.READ_MEMBER
            );
            default -> Set.of();
        };
    }

    private final MemberDao memberDao;

    @Autowired
    public NamespacePolicy(MemberDao memberDao) {
        this.memberDao = memberDao;
    }

    public Policy policy(NamespaceEntity targetNamespace) {
        return policy(viewerId(), targetNamespace);
    }

    private Policy policy(Integer userId, NamespaceEntity targetNamespace) {
        NotFound.notNull(targetNamespace, "命名空间不存在");

        Policy policy = new Policy(this.getClass(), targetNamespace.getId());
        if (userId != null && targetNamespace.isUser()) {
            if (targetNamespace.getId().equals(userId)) {
                policy.setAccess(Access.OWNER);
            } else {
                policy.setAccess(Access.MIN_ACCESS);
            }
        } else if (userId != null) {
            MemberEntity memberEntity = memberDao.findByAncestors(targetNamespace.traversalIds(), userId);
            if (memberEntity != null) {
                policy.setAccess(memberEntity.getAccess());
                policy.setMemberEntity(memberEntity);
            } else if (memberDao.findByDescendants(targetNamespace.getId(), userId) != null) {
                policy.setAccess(Access.MIN_ACCESS);
            }
        }
        if (policy.getAccess().lt(Access.MIN_ACCESS) && targetNamespace.isPublic()) {
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
        Policy policy = policy(namespaceEntity);
        if (!policy.getActions().contains(action)) {
            Unauthorized.isTrue(isAuthenticated(), "未登录");
            throw new Forbidden("无权限");
        }

        return policy.getMemberEntity();
    }

    public boolean hasPermission(NamespaceEntity viewerNamespace, NamespaceEntity targetNamespace, Action action) {
        if (viewerNamespace.isUser()) {
            return policy(viewerNamespace.getId(), targetNamespace).getActions().contains(action);
        } else {
            return targetNamespace.isPublic() || targetNamespace.traversalIds().contains(viewerNamespace.getId());
        }
    }
}
