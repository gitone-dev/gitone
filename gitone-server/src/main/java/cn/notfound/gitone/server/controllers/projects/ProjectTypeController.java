package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.controllers.members.MemberConnection;
import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberOrder;
import cn.notfound.gitone.server.controllers.members.MemberPage;
import cn.notfound.gitone.server.daos.MemberDao;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.ProjectEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = ProjectEntity.TYPE)
public class ProjectTypeController {

    private MemberDao memberDao;

    @SchemaMapping
    public String id(ProjectEntity projectEntity) {
        return Relay.toGlobalId(ProjectEntity.TYPE, projectEntity.getId());
    }

    @SchemaMapping
    public MemberConnection members(
            ProjectEntity projectEntity,
            @Argument Integer first,
            @Argument String after,
            @Argument MemberFilter.By filterBy,
            @Argument MemberOrder orderBy) {

        MemberFilter filter = Objects.requireNonNullElse(filterBy, new MemberFilter.By()).filter();
        filter.setTraversalIds(projectEntity.traversalIds());

        MemberPage page = new MemberPage(first, after, orderBy).validate();
        List<MemberEntity> members = memberDao.findAll(filter, page);
        return new MemberConnection(members, page);
    }
}
