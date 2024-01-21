package dev.gitone.server.mappers;

import dev.gitone.server.entities.Node;
import org.apache.ibatis.annotations.Param;

import java.util.Collection;
import java.util.List;

public interface NodeMapper<ID, T extends Node<ID>> {

    T find(ID id);

    List<T> findByIds(@Param("ids") Collection<ID> ids);

    int create(T record);

    int update(T record);

    int delete(ID id);
}
