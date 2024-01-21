package dev.gitone.server.mappers;

import dev.gitone.server.controllers.groups.GroupFilter;
import dev.gitone.server.controllers.groups.GroupPage;
import dev.gitone.server.entities.GroupEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GroupMapper extends NodeMapper<Integer, GroupEntity> {

    GroupEntity findByFullPath(String fullPath);

    List<GroupEntity> findByDescendants(Integer namespaceId);

    List<GroupEntity> findAll(@Param("filter") GroupFilter filter, @Param("page") GroupPage page);
}
