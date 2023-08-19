package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.controllers.BaseController;
import cn.notfound.gitone.server.controllers.NodeConnection;
import cn.notfound.gitone.server.controllers.NodePage;
import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.daos.UserNamespaceDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.entities.UserNamespaceEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = UserEntity.TYPE)
public class UserTypeController extends BaseController {

    private UserNamespaceDao userNamespaceDao;

    private EmailDao emailDao;

    @SchemaMapping
    public String id(UserEntity userEntity) {
        return Relay.toGlobalId(UserEntity.TYPE, userEntity.getId());
    }

    @SchemaMapping
    public UserNamespaceEntity namespace(UserEntity userEntity) {
        return userNamespaceDao.find(userEntity.getNamespaceId());
    }

    @SchemaMapping
    public NodeConnection<Integer, EmailEntity> emails(UserEntity userEntity) {
        List<EmailEntity> emails = emailDao.findByUserId(userEntity.getId())
                .stream()
                .filter(EmailEntity::isConfirmed)
                .toList();
        NodePage<Integer> page = new NodePage<>(emails.size());
        return new NodeConnection<>(emails, page);
    }

    @SchemaMapping
    public NodeConnection<Integer, EmailEntity> unconfirmedEmails(UserEntity userEntity) {
        List<EmailEntity> emails = emailDao.findByUserId(userEntity.getId())
                .stream()
                .filter(e -> !e.isConfirmed())
                .toList();
        NodePage<Integer> page = new NodePage<>(emails.size());
        return new NodeConnection<>(emails, page);
    }
}
