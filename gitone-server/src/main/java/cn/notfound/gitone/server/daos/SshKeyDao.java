package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.controllers.sshKeys.SshKeyFilter;
import cn.notfound.gitone.server.controllers.sshKeys.SshKeyPage;
import cn.notfound.gitone.server.entities.SshKeyEntity;
import cn.notfound.gitone.server.mappers.SshKeyMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SshKeyDao extends TimestampDao<Integer, SshKeyEntity, SshKeyMapper> {

    public SshKeyDao(SshKeyMapper mapper) {
        super(mapper);
    }

    public SshKeyEntity findByFingerprint(byte[] fingerprint) {
        return mapper.findByFingerprint(fingerprint);
    }

    public List<SshKeyEntity> findByNamespaceId(Integer namespaceId) {
        return mapper.findByNamespaceId(namespaceId);
    }

    public List<SshKeyEntity> findAll(SshKeyFilter filter, SshKeyPage page) {
        return mapper.findAll(filter, page);
    }
}
