package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.BaseEntity;
import cn.notfound.gitone.server.mappers.BaseMapper;

import java.time.OffsetDateTime;
import java.util.Collection;
import java.util.List;

public abstract class BaseDao<ID, T extends BaseEntity<ID>, M extends BaseMapper<ID, T>> {

    protected final M mapper;

    public BaseDao(M mapper) {
        this.mapper = mapper;
    }

    public T find(ID id) {
        return mapper.find(id);
    }

    public List<T> findByIds(Collection<ID> ids) {
        return mapper.findByIds(ids);
    }

    public T create(T entity) {
        OffsetDateTime now = OffsetDateTime.now();
        entity.setCreatedAt(now);
        entity.setUpdatedAt(now);
        mapper.create(entity);
        return entity;
    };

    public T update(T entity) {
        OffsetDateTime now = OffsetDateTime.now();
        entity.setUpdatedAt(now);
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
