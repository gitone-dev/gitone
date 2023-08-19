package cn.notfound.gitone.server.entities;

import java.io.Serializable;
import java.time.OffsetDateTime;

public interface BaseEntity<ID> extends Node<ID>, Serializable {

    void setCreatedAt(OffsetDateTime createdAt);

    void setUpdatedAt(OffsetDateTime updatedAt);
}
