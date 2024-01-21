package dev.gitone.server.mappers;

import dev.gitone.server.controllers.namespaces.NamespaceFilter;
import dev.gitone.server.controllers.namespaces.NamespacePage;
import dev.gitone.server.entities.NamespaceEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface NamespaceMapper extends NodeMapper<Integer, NamespaceEntity> {

    NamespaceEntity findByFullPath(String fullPath);

    List<NamespaceEntity> findAll(@Param("filter") NamespaceFilter filter, @Param("page") NamespacePage page);

    List<NamespaceEntity> findByDescendants(Integer id);
}
