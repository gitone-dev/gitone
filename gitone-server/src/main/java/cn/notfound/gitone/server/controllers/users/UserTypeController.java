package cn.notfound.gitone.server.controllers.users;

import cn.notfound.gitone.server.controllers.BaseController;
import cn.notfound.gitone.server.controllers.NodeConnection;
import cn.notfound.gitone.server.controllers.NodePage;
import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.daos.EmailDao;
import cn.notfound.gitone.server.daos.UserDetailDao;
import cn.notfound.gitone.server.daos.UserNamespaceDao;
import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.entities.UserDetailEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.entities.UserNamespaceEntity;
import org.dataloader.DataLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.graphql.execution.BatchLoaderRegistry;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.stream.Collectors;

@Controller
@SchemaMapping(typeName = UserEntity.TYPE)
public class UserTypeController extends BaseController {

    @Autowired
    private UserNamespaceDao userNamespaceDao;
    @Autowired
    private EmailDao emailDao;
    @Autowired
    private UserDetailDao userDetailDao;

    public UserTypeController(BatchLoaderRegistry registry) {
        registry.forTypePair(Integer.class, UserDetailEntity.class).registerMappedBatchLoader((ids, env) -> {
            Map<Integer, UserDetailEntity> userDetailEntityMap = userDetailDao.findByIds(ids)
                    .stream()
                    .collect(Collectors.toMap(UserDetailEntity::getId, Function.identity()));
            return Mono.just(userDetailEntityMap);
        });
    }

    @SchemaMapping
    public String id(UserEntity userEntity) {
        return Relay.toGlobalId(UserEntity.TYPE, userEntity.getId());
    }

    @SchemaMapping
    public String avatarUrl(UserEntity userEntity) {
        return String.format("/avatars/u/%d", userEntity.getId());
    }

    @SchemaMapping
    public CompletableFuture<String> bio(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(UserDetailEntity::getBio);
    }

    @SchemaMapping
    public CompletableFuture<String> location(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(UserDetailEntity::getLocation);
    }

    @SchemaMapping
    public CompletableFuture<String> websiteUrl(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(UserDetailEntity::getWebsiteUrl);
    }

    @SchemaMapping
    public UserNamespaceEntity namespace(UserEntity userEntity) {
        return userNamespaceDao.find(userEntity.getNamespaceId());
    }

    @SchemaMapping
    public NodeConnection<Integer, EmailEntity> emails(UserEntity userEntity) {
        if (!userEntity.getId().equals(viewerId())) return new NodeConnection<>();

        List<EmailEntity> emails = emailDao.findByUserId(userEntity.getId())
                .stream()
                .filter(EmailEntity::isConfirmed)
                .toList();
        NodePage<Integer> page = new NodePage<>(emails.size());
        return new NodeConnection<>(emails, page);
    }

    @SchemaMapping
    public NodeConnection<Integer, EmailEntity> unconfirmedEmails(UserEntity userEntity) {
        if (!userEntity.getId().equals(viewerId())) return new NodeConnection<>();

        List<EmailEntity> emails = emailDao.findByUserId(userEntity.getId())
                .stream()
                .filter(e -> !e.isConfirmed())
                .toList();
        NodePage<Integer> page = new NodePage<>(emails.size());
        return new NodeConnection<>(emails, page);
    }
}
