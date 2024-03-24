package dev.gitone.server.daos;

import dev.gitone.server.controllers.releases.ReleaseFilter;
import dev.gitone.server.controllers.releases.ReleasePage;
import dev.gitone.server.entities.ReleaseEntity;
import dev.gitone.server.mappers.ReleaseMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReleaseDao extends TimestampDao<Integer, ReleaseEntity, ReleaseMapper> {

    public ReleaseDao(ReleaseMapper mapper) {
        super(mapper);
    }

    public ReleaseEntity findByProjectIdAndTagName(Integer projectId, String tagName) {
        return mapper.findByProjectIdAndTagName(projectId, tagName);
    }

    public List<ReleaseEntity> findByProjectIdAndTagNames(Integer projectId, List<String> tagNames) {
        return mapper.findByProjectIdAndTagNames(projectId, tagNames) ;
    }

    public List<ReleaseEntity> findAll(ReleaseFilter filter, ReleasePage page) {
        return mapper.findAll(filter, page);
    }
}
