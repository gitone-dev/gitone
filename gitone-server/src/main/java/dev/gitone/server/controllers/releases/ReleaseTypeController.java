package dev.gitone.server.controllers.releases;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.daos.UserDao;
import dev.gitone.server.entities.ReleaseEntity;
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
@SchemaMapping(typeName = ReleaseEntity.TYPE)
public class ReleaseTypeController {

    private final UserDao userDao;

    @SchemaMapping
    public String id(ReleaseEntity releaseEntity) {
        return Relay.toGlobalId(ReleaseEntity.TYPE, releaseEntity.getId());
    }

    @BatchMapping
    public Map<ReleaseEntity, UserEntity> creator(List<ReleaseEntity> releases) {
        List<Integer> userIds = releases.stream().map(ReleaseEntity::getCreatedById).toList();
        Map<Integer, UserEntity> userMap = userDao.findByIds(userIds)
                .stream()
                .collect(Collectors.toMap(UserEntity::getId, Function.identity()));

        Map<ReleaseEntity, UserEntity> map = new HashMap<>();
        for (ReleaseEntity release : releases) {
            map.put(release, userMap.get(release.getCreatedById()));
        }
        return map;
    }
}
