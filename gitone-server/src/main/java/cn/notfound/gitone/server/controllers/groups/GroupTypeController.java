package cn.notfound.gitone.server.controllers.groups;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.controllers.members.MemberConnection;
import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberOrder;
import cn.notfound.gitone.server.controllers.members.MemberPage;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.entities.MemberEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = GroupEntity.TYPE)
public class GroupTypeController {

    private MemberDao memberDao;

    @SchemaMapping
    public String id(GroupEntity groupEntity) {
        return Relay.toGlobalId(GroupEntity.TYPE, groupEntity.getId());
    }

    @SchemaMapping
    public MemberConnection members(
            GroupEntity groupEntity,
            @Argument Integer first,
            @Argument String after,
            @Argument MemberFilter.By filterBy,
            @Argument MemberOrder orderBy) {

        MemberFilter filter = Objects.requireNonNullElse(filterBy, new MemberFilter.By()).filter();
        filter.setNamespaceId(groupEntity.getId());
        MemberPage page = new MemberPage(first, after, orderBy).validate();
        List<MemberEntity> members = memberDao.findAll(filter, page);
        return new MemberConnection(members, page);
    }
}
