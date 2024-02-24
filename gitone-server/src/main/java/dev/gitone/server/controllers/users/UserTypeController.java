package dev.gitone.server.controllers.users;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.controllers.NodeConnection;
import dev.gitone.server.controllers.NodePage;
import dev.gitone.server.controllers.Relay;
import dev.gitone.server.daos.EmailDao;
import dev.gitone.server.daos.UserDao;
import dev.gitone.server.daos.UserDetailDao;
import dev.gitone.server.entities.EmailEntity;
import dev.gitone.server.entities.Role;
import dev.gitone.server.entities.UserDetailEntity;
import dev.gitone.server.entities.UserEntity;
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
public class UserTypeController extends ViewerContext {

    @Autowired
    private UserDao userDao;
    @Autowired
    private EmailDao emailDao;
    @Autowired
    private UserDetailDao userDetailDao;

    @Autowired
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
    public String name(UserEntity userEntity) {
        return userEntity.getFullName();
    }

    @SchemaMapping
    public String username(UserEntity userEntity) {
        return userEntity.getFullPath();
    }

    @SchemaMapping
    public String avatarUrl(UserEntity userEntity) {
        return String.format("/avatars/n/%d", userEntity.getId());
    }

    @SchemaMapping
    public CompletableFuture<Boolean> active(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(userDetail -> userDetail == null ? null : userDetail.getActive());
    }

    @SchemaMapping
    public CompletableFuture<Role> role(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(userDetail -> userDetail == null ? null : userDetail.getRole());
    }

    @SchemaMapping
    public CompletableFuture<String> location(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(userDetail -> userDetail == null ? null : userDetail.getLocation());
    }

    @SchemaMapping
    public CompletableFuture<String> websiteUrl(UserEntity userEntity, DataLoader<Integer, UserDetailEntity> loader) {
        return loader.load(userEntity.getId()).thenApply(userDetail -> userDetail == null ? null : userDetail.getWebsiteUrl());
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
