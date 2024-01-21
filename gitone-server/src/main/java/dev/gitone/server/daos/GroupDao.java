package dev.gitone.server.daos;

import dev.gitone.server.controllers.groups.GroupFilter;
import dev.gitone.server.controllers.groups.GroupPage;
import dev.gitone.server.entities.GroupEntity;
import dev.gitone.server.mappers.GroupMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GroupDao extends TimestampDao<Integer, GroupEntity, GroupMapper> {

    public GroupDao(GroupMapper mapper) {
        super(mapper);
    }

    public List<GroupEntity> findAll(GroupFilter filter, GroupPage page) {
        return mapper.findAll(filter, page);
    }

    public GroupEntity findByFullPath(String fullPath) {
        return mapper.findByFullPath(fullPath);
    }

    public GroupEntity updateName(GroupEntity groupEntity, String oldFullName) {
        super.update(groupEntity);
        renameDescendants(groupEntity, groupEntity.getFullPath(), oldFullName);
        return groupEntity;
    }

    // FIXME: 2023/10/29 N+1
    private void renameDescendants(GroupEntity groupEntity, String oldFullPath, String oldFullName) {
        List<GroupEntity> entities = mapper.findByDescendants(groupEntity.getId());
        for (GroupEntity entity : entities) {
            if (entity.getId().equals(groupEntity.getId())) continue;

            entity.setFullPath(entity.getFullPath().replaceFirst(oldFullPath, groupEntity.getFullPath()));
            entity.setFullName(entity.getFullName().replaceFirst(oldFullName, groupEntity.getFullName()));
            mapper.update(entity);
        }
    }
}
