package dev.gitone.server.daos;

import dev.gitone.server.controllers.members.MemberFilter;
import dev.gitone.server.controllers.members.MemberPage;
import dev.gitone.server.entities.MemberEntity;
import dev.gitone.server.mappers.MemberMapper;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public class MemberDao extends TimestampDao<Integer, MemberEntity, MemberMapper> {

    public MemberDao(MemberMapper mapper) {
        super(mapper);
    }

    public List<MemberEntity> findAll(MemberFilter filter, MemberPage page) {
        return mapper.findAll(filter, page);
    }

    public MemberEntity findByAncestors(Collection<Integer> traversalIds, Integer userId) {
        return mapper.findByAncestors(traversalIds, userId);
    }

    public MemberEntity findByDescendants(Integer namespaceId, Integer userId) {
        return mapper.findByDescendants(namespaceId, userId);
    }

    public void deleteByNamespaceId(Integer namespaceId) {
        mapper.deleteByNamespaceId(namespaceId);
    }
}
