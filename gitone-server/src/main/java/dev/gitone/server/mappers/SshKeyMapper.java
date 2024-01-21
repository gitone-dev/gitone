package dev.gitone.server.mappers;

import dev.gitone.server.controllers.sshKeys.SshKeyFilter;
import dev.gitone.server.controllers.sshKeys.SshKeyPage;
import dev.gitone.server.entities.SshKeyEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SshKeyMapper extends NodeMapper<Integer, SshKeyEntity> {

    SshKeyEntity findByFingerprint(@Param("fingerprint") byte[] fingerprint);

    List<SshKeyEntity> findByNamespaceId(Integer namespaceId);

    List<SshKeyEntity> findAll(@Param("filter") SshKeyFilter filter, @Param("page") SshKeyPage page);
}
