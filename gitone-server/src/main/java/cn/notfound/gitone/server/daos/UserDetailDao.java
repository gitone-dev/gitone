package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.UserDetailEntity;
import cn.notfound.gitone.server.mappers.UserDetailMapper;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Repository;

import java.security.SecureRandom;
import java.time.OffsetDateTime;

@Repository
public class UserDetailDao extends NodeDao<Integer, UserDetailEntity, UserDetailMapper> {

    public UserDetailDao(UserDetailMapper mapper) {
        super(mapper);
    }

    public UserDetailEntity findByEmail(String email) {
        return mapper.findByEmail(email);
    }

    public UserDetailEntity findByResetPasswordToken(String resetPasswordToken) {
        return mapper.findByResetPasswordToken(resetPasswordToken);
    }

    public void updateResetPasswordToken(UserDetailEntity userDetailEntity) {
        userDetailEntity.setResetPasswordToken(generateToken());
        userDetailEntity.setResetPasswordSentAt(OffsetDateTime.now());
        super.update(userDetailEntity);
    }


    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] data = new byte[16];
        random.nextBytes(data);
        return String.valueOf(Hex.encode(data));
    }
}
