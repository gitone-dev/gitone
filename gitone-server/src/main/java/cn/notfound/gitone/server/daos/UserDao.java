package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.controllers.users.UserFilter;
import cn.notfound.gitone.server.controllers.users.UserPage;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.entities.UserNamespaceEntity;
import cn.notfound.gitone.server.mappers.UserMapper;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.List;

@Repository
public class UserDao extends BaseDao<Integer, UserEntity, UserMapper> {

    private final UserNamespaceDao userNamespaceDao;

    public UserDao(UserMapper mapper, UserNamespaceDao userNamespaceDao) {
        super(mapper);
        this.userNamespaceDao = userNamespaceDao;
    }

    public UserEntity findByEmail(String email) {
        return mapper.findByEmail(email);
    }

    public UserEntity findByUsername(String username) {
        return mapper.findByUsername(username);
    }

    public UserEntity findByResetPasswordToken(String resetPasswordToken) {
        return mapper.findByResetPasswordToken(resetPasswordToken);
    }

    public List<UserEntity> findAll(UserFilter filter, UserPage page) {
        return mapper.findAll(filter, page);
    }

    @Override
    public UserEntity create(UserEntity userEntity) {
        UserNamespaceEntity userNamespaceEntity = new UserNamespaceEntity();
        userNamespaceEntity.setName(userEntity.getName());
        userNamespaceEntity.setPath(userEntity.getUsername());
        userNamespaceEntity.setFullName(userEntity.getName());
        userNamespaceEntity.setFullPath(userEntity.getUsername());
        userNamespaceDao.create(userNamespaceEntity);

        userEntity.setNamespaceId(userNamespaceEntity.getId());
        return super.create(userEntity);
    }

    public UserEntity updateName(UserEntity userEntity) {
        UserNamespaceEntity userNamespaceEntity = userNamespaceDao.find(userEntity.getNamespaceId());
        Assert.isTrue(userNamespaceEntity.getParentId() == 0, "invalid userNamespace");
        userNamespaceEntity.setName(userEntity.getName());
        userNamespaceEntity.setFullName(userEntity.getName());
        userNamespaceDao.update(userNamespaceEntity);

        return super.update(userEntity);
    }

    public UserEntity updateUsername(UserEntity userEntity) {
        UserNamespaceEntity userNamespaceEntity = userNamespaceDao.find(userEntity.getNamespaceId());
        Assert.isTrue(userNamespaceEntity.getParentId() == 0, "invalid userNamespace");
        userNamespaceEntity.setPath(userEntity.getUsername());
        userNamespaceEntity.setFullPath(userEntity.getUsername());
        userNamespaceDao.update(userNamespaceEntity);

        return super.update(userEntity);
    }

    @Override
    public UserEntity delete(UserEntity userEntity) {
        super.delete(userEntity);
        userNamespaceDao.delete(userEntity.getNamespaceId());
        return userEntity;
    }

    public void updateResetPasswordToken(UserEntity userEntity) {
        userEntity.setResetPasswordToken(generateToken());
        userEntity.setResetPasswordSentAt(OffsetDateTime.now());
        super.update(userEntity);
    }

    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] data = new byte[16];
        random.nextBytes(data);
        return String.valueOf(Hex.encode(data));
    }
}
