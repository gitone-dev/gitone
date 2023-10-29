package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
public class MemberQueryController extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    private final MemberDao memberDao;

    @QueryMapping
    public MemberConnection members(
            @Argument String fullPath,
            @Argument Integer first,
            @Argument String after,
            @Argument MemberFilter.By filterBy,
            @Argument MemberOrder orderBy) {

        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(fullPath);
        NotFound.notNull(namespaceEntity, fullPath);
        Assert.isTrue(MemberEntity.namespaceTypes.contains(namespaceEntity.getType()), "非成员命名空间");

        namespacePolicy.assertPermission(namespaceEntity, Action.READ_MEMBER);

        MemberFilter filter = Objects.requireNonNullElse(filterBy, new MemberFilter.By()).filter();
        filter.setTraversalIds(namespaceEntity.traversalIds());

        MemberPage page = new MemberPage(first, after, orderBy).validate();
        List<MemberEntity> members = memberDao.findAll(filter, page);
        return new MemberConnection(members, page);
    }
}
