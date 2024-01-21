package dev.gitone.server.mappers;

import dev.gitone.server.controllers.projects.ProjectFilter;
import dev.gitone.server.controllers.projects.ProjectPage;
import dev.gitone.server.entities.ProjectEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectMapper extends NodeMapper<Integer, ProjectEntity> {

    ProjectEntity findByFullPath(String fullPath);

    List<ProjectEntity> findAll(@Param("filter") ProjectFilter filter, @Param("page") ProjectPage page);
}
