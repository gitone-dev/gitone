package dev.gitone.server.daos;

import dev.gitone.server.entities.OAuth2AuthorizationConsentEntity;
import dev.gitone.server.mappers.OAuth2AuthorizationConsentMapper;
import org.springframework.stereotype.Repository;

@Repository
public class OAuth2AuthorizationConsentDao extends TimestampDao<Integer, OAuth2AuthorizationConsentEntity, OAuth2AuthorizationConsentMapper> {

    public OAuth2AuthorizationConsentDao(OAuth2AuthorizationConsentMapper mapper) {
        super(mapper);
    }

    public OAuth2AuthorizationConsentEntity findByRegisteredClientIdAndPrincipalName(String registeredClientId, String principalName) {
        return mapper.findByRegisteredClientIdAndPrincipalName(registeredClientId, principalName);
    }
}
