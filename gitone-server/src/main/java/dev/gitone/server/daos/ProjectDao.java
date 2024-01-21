package dev.gitone.server.daos;

import dev.gitone.server.controllers.projects.ProjectFilter;
import dev.gitone.server.controllers.projects.ProjectPage;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.mappers.ProjectMapper;
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
