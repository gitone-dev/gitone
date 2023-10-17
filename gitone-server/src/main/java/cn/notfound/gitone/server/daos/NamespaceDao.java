package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.controllers.namespaces.NamespaceFilter;
import cn.notfound.gitone.server.controllers.namespaces.NamespacePage;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.mappers.NamespaceMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NamespaceDao extends TimestampDao<Integer, NamespaceEntity, NamespaceMapper> {

    public NamespaceDao(NamespaceMapper mapper) {
        super(mapper);
    }

    public NamespaceEntity findByFullPath(String fullPath) {
        return mapper.findByFullPath(fullPath);
    }

    public List<NamespaceEntity> findAll(NamespaceFilter filter, NamespacePage page) {
        return mapper.findAll(filter, page);
    }

    public NamespaceEntity updatePath(NamespaceEntity namespaceEntity, String oldFullPath) {
        super.update(namespaceEntity);
        renameDescendants(namespaceEntity, oldFullPath, namespaceEntity.getFullName());
        return namespaceEntity;
    }

    // TODO N+1
    private void renameDescendants(NamespaceEntity namespaceEntity, String oldFullPath, String oldFullName) {
        List<NamespaceEntity> entities = mapper.findByDescendants(namespaceEntity.getId());
        for (NamespaceEntity entity : entities) {
            if (entity.getId().equals(namespaceEntity.getId())) continue;

            entity.setFullPath(entity.getFullPath().replaceFirst(oldFullPath, namespaceEntity.getFullPath()));
            entity.setFullName(entity.getFullName().replaceFirst(oldFullName, namespaceEntity.getFullName()));
            mapper.update(entity);
        }
    }
}
