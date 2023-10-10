package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.controllers.projects.ProjectFilter;
import cn.notfound.gitone.server.controllers.projects.ProjectPage;
import cn.notfound.gitone.server.entities.ProjectEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectMapper extends NodeMapper<Integer, ProjectEntity> {

    ProjectEntity findByFullPath(String fullPath);

    List<ProjectEntity> findAll(@Param("filter") ProjectFilter filter, @Param("page") ProjectPage page);
}
