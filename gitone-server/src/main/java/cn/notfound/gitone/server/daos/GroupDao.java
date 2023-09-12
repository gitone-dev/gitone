package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.controllers.groups.GroupFilter;
import cn.notfound.gitone.server.controllers.groups.GroupPage;
import cn.notfound.gitone.server.entities.GroupEntity;
import cn.notfound.gitone.server.mappers.GroupMapper;
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

    public GroupEntity findByParentIdAndPath(Integer parentId, String path) {
        return mapper.findByParentIdAndPath(parentId, path);
    }
}
