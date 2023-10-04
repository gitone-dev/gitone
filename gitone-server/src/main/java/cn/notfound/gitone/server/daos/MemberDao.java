package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberPage;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.mappers.MemberMapper;
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
