package cn.notfound.gitone.server.controllers.emails;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.daos.UserDetailDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserDetailEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = EmailEntity.TYPE)
public class EmailTypeController {

    private UserDetailDao userDetailDao;

    @SchemaMapping
    public String id(EmailEntity emailEntity) {
        return Relay.toGlobalId(EmailEntity.TYPE, emailEntity.getId());
    }

    @BatchMapping
    public Map<EmailEntity, Boolean> primary(List<EmailEntity> emails) {
        Map<EmailEntity, Boolean> result = new HashMap<>();
        if (emails.isEmpty()) return result;

        Set<Integer> userIds = emails
                .stream()
                .map(EmailEntity::getUserId)
                .collect(Collectors.toSet());

        Map<Integer, UserDetailEntity> userMap = userDetailDao.findByIds(userIds)
                .stream()
                .collect(Collectors.toMap(UserDetailEntity::getId, Function.identity()));
        for (EmailEntity email : emails) {
            UserDetailEntity userDetailEntity = userMap.get(email.getUserId());
            result.put(email, email.getEmail().equals(userDetailEntity.getEmail()));
        }
        return result;
    }
}
