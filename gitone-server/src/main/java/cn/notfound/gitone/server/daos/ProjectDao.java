package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.controllers.projects.ProjectFilter;
import cn.notfound.gitone.server.controllers.projects.ProjectPage;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.mappers.ProjectMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProjectDao extends TimestampDao<Integer, ProjectEntity, ProjectMapper> {

    public ProjectDao(ProjectMapper mapper) {
        super(mapper);
    }

    public ProjectEntity findByFullPath(String fullPath) {
        return mapper.findByFullPath(fullPath);
    }

    public List<ProjectEntity> findAll(ProjectFilter filter, ProjectPage page) {
        return mapper.findAll(filter, page);
    }
}
