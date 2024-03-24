package dev.gitone.server.mappers;

import dev.gitone.server.controllers.releases.ReleaseFilter;
import dev.gitone.server.controllers.releases.ReleasePage;
import dev.gitone.server.entities.ReleaseEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ReleaseMapper extends NodeMapper<Integer, ReleaseEntity> {

    ReleaseEntity findByProjectIdAndTagName(
            @Param("projectId") Integer projectId, @Param("tagName") String tagName);

    List<ReleaseEntity> findByProjectIdAndTagNames(
            @Param("projectId") Integer projectId, @Param("tagNames") List<String> tagNames);

    List<ReleaseEntity> findAll(@Param("filter") ReleaseFilter filter, @Param("page") ReleasePage page);
}
