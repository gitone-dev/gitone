package cn.notfound.gitone.server.services.git.ssh;

import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.daos.SshKeyDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.SshKeyEntity;
import lombok.AllArgsConstructor;
import org.apache.sshd.common.AttributeRepository;
import org.apache.sshd.common.config.keys.KeyUtils;
import org.apache.sshd.common.digest.BuiltinDigests;
import org.apache.sshd.common.util.logging.AbstractLoggingBean;
import org.apache.sshd.server.auth.AsyncAuthException;
import org.apache.sshd.server.auth.pubkey.PublickeyAuthenticator;
import org.apache.sshd.server.session.ServerSession;
import org.springframework.stereotype.Service;

import java.security.PublicKey;

@AllArgsConstructor
@Service
public class CustomPublickeyAuthenticator extends AbstractLoggingBean implements PublickeyAuthenticator {

    public static final String USER = "git";

    public static final AttributeRepository.AttributeKey<SshKeyEntity> SSH_KEY = new AttributeRepository.AttributeKey<>();

    public static final AttributeRepository.AttributeKey<NamespaceEntity> NAMESPACE_KEY = new AttributeRepository.AttributeKey<>();

    private final NamespaceDao namespaceDao;

    private final SshKeyDao sshKeyDao;

    @Override
    public boolean authenticate(String username, PublicKey key, ServerSession session) throws AsyncAuthException {
        if (!USER.equals(username)) return false;

        byte[] fingerprint;
        try {
            fingerprint = KeyUtils.getRawFingerprint(BuiltinDigests.sha256, key);
        } catch (Exception e) {
            log.warn("authenticate({})[{}] invalid public key: {}", username, session, e.getMessage());
            return false;
        }
        log.info("authenticate({})[{}] fingerprint: {}", username, session, fingerprint);

        SshKeyEntity sshKeyEntity = sshKeyDao.findByFingerprint(fingerprint);
        if (sshKeyEntity == null) return false;

        NamespaceEntity viewerNamespace = namespaceDao.find(sshKeyEntity.getNamespaceId());
        if (viewerNamespace == null) return false;

        session.setAttribute(SSH_KEY, sshKeyEntity);
        session.setAttribute(NAMESPACE_KEY, viewerNamespace);

        return true;
    }
}
