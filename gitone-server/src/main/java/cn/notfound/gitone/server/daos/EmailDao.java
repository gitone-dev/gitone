package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.EmailEntity;
import cn.notfound.gitone.server.mappers.EmailMapper;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

import java.security.SecureRandom;
import java.time.OffsetDateTime;
import java.util.List;

@Repository
public class EmailDao extends BaseDao<Integer, EmailEntity, EmailMapper> {

    public EmailDao(EmailMapper mapper) {
        super(mapper);
    }

    public EmailEntity findByEmail(String email) {
        return mapper.findByEmail(email);
    }

    public List<EmailEntity> findByUserId(Integer userId) {
        return mapper.findByUserId(userId);
    }

    @Override
    public EmailEntity create(EmailEntity emailEntity) {
        emailEntity.setConfirmationToken(generateToken());
        emailEntity.setConfirmationSentAt(OffsetDateTime.now());
        return super.create(emailEntity);
    }

    public void updateToken(EmailEntity emailEntity) {
        Assert.isTrue(!emailEntity.isConfirmed(), "邮箱已激活");

        emailEntity.setConfirmationToken(generateToken());
        emailEntity.setConfirmationSentAt(OffsetDateTime.now());
        super.update(emailEntity);
    }

    public EmailEntity confirm(String confirmationToken) {
        EmailEntity emailEntity = mapper.findByConfirmationToken(confirmationToken);
        Assert.notNull(emailEntity, "token 不合规");

        Assert.isTrue(!emailEntity.isConfirmed(), "token 不合规");
        Assert.isTrue(!emailEntity.isExpired(), "token 不合规");

        emailEntity.setConfirmedAt(OffsetDateTime.now());
        return super.update(emailEntity);
    }

    private String generateToken() {
        SecureRandom random = new SecureRandom();
        byte[] data = new byte[16];
        random.nextBytes(data);
        return String.valueOf(Hex.encode(data));
    }
}
