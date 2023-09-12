package cn.notfound.gitone.server.controllers.members;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.MemberEntity;
import cn.notfound.gitone.server.entities.UserEntity;
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
}
