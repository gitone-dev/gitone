package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.entities.BaseEntity;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;
import java.util.List;

public interface BaseMapper<ID, T extends BaseEntity<ID>> {

    T find(ID id);

    List<T> findByIds(@Param("ids") Collection<ID> ids);

    int create(T record);

    int update(T record);

    int delete(ID id);
}
