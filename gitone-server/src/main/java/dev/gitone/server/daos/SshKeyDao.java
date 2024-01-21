package dev.gitone.server.daos;

import dev.gitone.server.controllers.sshKeys.SshKeyFilter;
import dev.gitone.server.controllers.sshKeys.SshKeyPage;
import dev.gitone.server.entities.SshKeyEntity;
import dev.gitone.server.mappers.SshKeyMapper;
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
