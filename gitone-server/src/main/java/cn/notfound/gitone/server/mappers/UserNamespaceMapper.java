package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.entities.UserNamespaceEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserNamespaceMapper extends NodeMapper<Integer, UserNamespaceEntity> {
}
