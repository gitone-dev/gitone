package dev.gitone.server.daos;

import dev.gitone.server.entities.TimestampNode;
import dev.gitone.server.mappers.NodeMapper;

import java.time.OffsetDateTime;

public abstract class TimestampDao<ID, T extends TimestampNode<ID>, M extends NodeMapper<ID, T>> extends NodeDao<ID, T, M> {

    public TimestampDao(M mapper) {
        super(mapper);
    }

    public T create(T entity) {
        OffsetDateTime now = OffsetDateTime.now();
        entity.setCreatedAt(now);
        entity.setUpdatedAt(now);
        return super.create(entity);
    }

    public T update(T entity) {
        OffsetDateTime now = OffsetDateTime.now();
        entity.setUpdatedAt(now);
        return super.update(entity);
    }
}
