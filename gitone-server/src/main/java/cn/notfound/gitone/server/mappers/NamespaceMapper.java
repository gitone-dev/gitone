package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.entities.NamespaceEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NamespaceMapper extends NodeMapper<Integer, NamespaceEntity> {

    NamespaceEntity findByFullPath(String fullPath);

}
