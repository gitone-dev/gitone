package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.controllers.namespaces.NamespaceFilter;
import cn.notfound.gitone.server.controllers.namespaces.NamespacePage;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NamespaceMapper extends NodeMapper<Integer, NamespaceEntity> {

    NamespaceEntity findByFullPath(String fullPath);

    List<NamespaceEntity> findAll(@Param("filter") NamespaceFilter filter, @Param("page") NamespacePage page);

    List<NamespaceEntity> findByDescendants(Integer id);
}
