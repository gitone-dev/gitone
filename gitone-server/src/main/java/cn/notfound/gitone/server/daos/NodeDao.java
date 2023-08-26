package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.Node;
import cn.notfound.gitone.server.mappers.NodeMapper;

import java.util.Collection;
import java.util.List;

public abstract class NodeDao<ID, T extends Node<ID>, M extends NodeMapper<ID, T>>  {

    protected final M mapper;

    public NodeDao(M mapper) {
        this.mapper = mapper;
    }

    public T find(ID id) {
        return mapper.find(id);
    }

    public List<T> findByIds(Collection<ID> ids) {
        return mapper.findByIds(ids);
    }

    public T create(T entity) {
        mapper.create(entity);
        return entity;
    }

    public T update(T entity) {
        mapper.update(entity);
        return entity;
    }

    public int delete(ID id) {
        return mapper.delete(id);
    }

    public T delete(T entity) {
        delete(entity.getId());
        return entity;
    }
}
