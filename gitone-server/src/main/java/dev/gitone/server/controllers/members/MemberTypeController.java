package dev.gitone.server.controllers.members;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.daos.UserDao;
import dev.gitone.server.entities.MemberEntity;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = MemberEntity.TYPE)
public class MemberTypeController {

    private UserDao userDao;

    private NamespaceDao namespaceDao;

    @SchemaMapping
    public String id(MemberEntity memberEntity) {
        return Relay.toGlobalId(MemberEntity.TYPE, memberEntity.getId());
    }

    @BatchMapping
    public Map<MemberEntity, UserEntity> user(List<MemberEntity> members) {
        List<Integer> userIds = members.stream().map(MemberEntity::getUserId).toList();
        Map<Integer, UserEntity> userMap = userDao.findByIds(userIds)
                .stream()
                .collect(Collectors.toMap(UserEntity::getId, Function.identity()));

        Map<MemberEntity, UserEntity> map = new HashMap<>();
        for (MemberEntity member : members) {
            map.put(member, userMap.get(member.getUserId()));
        }
        return map;
    }

    @BatchMapping
    public Map<MemberEntity, NamespaceEntity> namespace(List<MemberEntity> members) {
        List<Integer> namespaceIds = members.stream().map(MemberEntity::getNamespaceId).toList();
        Map<Integer, NamespaceEntity> namespaceMap = namespaceDao.findByIds(namespaceIds)
                .stream()
                .collect(Collectors.toMap(NamespaceEntity::getId, Function.identity()));

        Map<MemberEntity, NamespaceEntity> map = new HashMap<>();
        for (MemberEntity member : members) {
            map.put(member, namespaceMap.get(member.getNamespaceId()));
        }
        return map;
    }
}
