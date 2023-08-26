package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.mappers.NamespaceMapper;
import org.springframework.stereotype.Repository;

@Repository
public class NamespaceDao extends TimestampDao<Integer, NamespaceEntity, NamespaceMapper> {

    public NamespaceDao(NamespaceMapper mapper) {
        super(mapper);
    }

    public NamespaceEntity findByFullPath(String fullPath) {
        return mapper.findByFullPath(fullPath);
    }
}
