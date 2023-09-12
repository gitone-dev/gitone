package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.controllers.groups.GroupFilter;
import cn.notfound.gitone.server.controllers.groups.GroupPage;
import cn.notfound.gitone.server.entities.GroupEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GroupMapper extends NodeMapper<Integer, GroupEntity> {

    GroupEntity findByFullPath(String fullPath);

    GroupEntity findByParentIdAndPath(@Param("parentId") Integer parentId, @Param("path") String path);

    List<GroupEntity> findAll(@Param("filter") GroupFilter filter, @Param("page") GroupPage page);
}
