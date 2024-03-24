package dev.gitone.server.controllers.tags;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.daos.ReleaseDao;
import dev.gitone.server.entities.ReleaseEntity;
import dev.gitone.server.models.git.GitTag;
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
@SchemaMapping(typeName = GitTag.TYPE)
public class TagController {

    private final ReleaseDao releaseDao;

    @SchemaMapping
    public String id(GitTag gitTag) {
        return Relay.toGlobalId(GitTag.TYPE, gitTag.getId());
    }

    @BatchMapping
    public Map<GitTag, Boolean> isRelease(List<GitTag> tags) {
        if (tags.isEmpty()) return Map.of();

        // FIXME project id 获取？
        Integer projectId = tags.get(0).getGitRepository().getId();
        List<String> names = tags.stream().map(GitTag::getName).toList();
        Map<String, ReleaseEntity> releaseMap = releaseDao.findByProjectIdAndTagNames(projectId, names)
                .stream()
                .collect(Collectors.toMap(ReleaseEntity::getTagName, Function.identity()));

        Map<GitTag, Boolean> map = new HashMap<>();
        for (GitTag tag : tags) {
            map.put(tag, releaseMap.containsKey(tag.getName()));
        }
        return map;
    }
}
