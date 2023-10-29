package cn.notfound.gitone.server.controllers.sshKeys;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.SshKeyEntity;
import cn.notfound.gitone.server.entities.SshKeyUsage;
import lombok.AllArgsConstructor;
import org.apache.sshd.common.digest.BuiltinDigests;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = SshKeyEntity.TYPE)
public class SshKeyTypeController {

    private final NamespaceDao namespaceDao;

    @SchemaMapping
    public String id(SshKeyEntity sshKeyEntity) {
        return Relay.toGlobalId(SshKeyEntity.TYPE, sshKeyEntity.getId());
    }

    @SchemaMapping
    public String fingerprint(SshKeyEntity sshKeyEntity) {
        String algo = BuiltinDigests.sha256.getAlgorithm();
        Base64.Encoder encoder = Base64.getEncoder();
        return algo.replace("-", "").toUpperCase() + ":" +
                encoder.encodeToString(sshKeyEntity.getFingerprint()).replaceAll("=", "");
    }

    @SchemaMapping
    public Set<SshKeyUsage> usages(SshKeyEntity sshKeyEntity) {
        return sshKeyEntity.usages();
    }

    @BatchMapping
    public Map<SshKeyEntity, NamespaceEntity> namespace(List<SshKeyEntity> sshKeys) {
        List<Integer> namespaceIds = sshKeys.stream().map(SshKeyEntity::getNamespaceId).toList();
        Map<Integer, NamespaceEntity> namespaceMap = namespaceDao.findByIds(namespaceIds)
                .stream()
                .collect(Collectors.toMap(NamespaceEntity::getId, Function.identity()));

        Map<SshKeyEntity, NamespaceEntity> map = new HashMap<>();
        for (SshKeyEntity sshKey : sshKeys) {
            map.put(sshKey, namespaceMap.get(sshKey.getNamespaceId()));
        }
        return map;
    }
}
