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
            case REPORTER -> Set.of(
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
        Policy policy = new Policy(this.getClass(), namespaceEntity.getId());
        if (isAuthenticated()) {
            MemberEntity memberEntity = memberDao.findByNamespaceIdAndUserId(namespaceEntity.getId(), viewerId());
            if (memberEntity != null) {
                policy.setAccess(memberEntity.getAccess());
            }
        }
        if (policy.getAccess().lt(Access.REPORTER) && namespaceEntity.isPublic()) {
            policy.setAccess(Access.REPORTER);
        }

        policy.setActions(accessActions().get(policy.getAccess()));

        return policy;
    }

    public Map<Access, Set<Action>> accessActions() {
        return NamespacePolicy.accessActionsMap;
    }

    public MemberEntity assertPermission(NamespaceEntity namespaceEntity, Action action) {
        NotFound.notNull(namespaceEntity, "命名空间不存在");

        if (namespaceEntity.isPublic()) {
            if (action.equals(READ)) return null;
            if (action.equals(READ_MEMBER)) return null;
        }
        Forbidden.isTrue(isAuthenticated(), "无权限");

        MemberEntity memberEntity = memberDao.findByNamespaceIdAndUserId(namespaceEntity.getId(), viewerId());
        Forbidden.notNull(memberEntity, "无权限");
        Forbidden.isTrue(accessActionsMap.get(memberEntity.getAccess()).contains(action), "无权限");

        return memberEntity;
    }
}
