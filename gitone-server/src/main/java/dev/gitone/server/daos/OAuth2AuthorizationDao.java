package dev.gitone.server.daos;

import dev.gitone.server.entities.OAuth2AuthorizationEntity;
import dev.gitone.server.mappers.OAuth2AuthorizationMapper;
import org.springframework.stereotype.Repository;

@Repository
public class OAuth2AuthorizationDao extends TimestampDao<Integer, OAuth2AuthorizationEntity, OAuth2AuthorizationMapper> {

    public OAuth2AuthorizationDao(OAuth2AuthorizationMapper mapper) {
        super(mapper);
    }

    public OAuth2AuthorizationEntity findByUuid(String uuid) {
        return mapper.findByUuid(uuid);
    }

    public OAuth2AuthorizationEntity findByState(String state) {
        return mapper.findByState(state);
    }

    public OAuth2AuthorizationEntity findByAuthorizationCodeValue(String authorizationCodeValue) {
        return mapper.findByAuthorizationCodeValue(authorizationCodeValue);
    }

    public OAuth2AuthorizationEntity findByAccessTokenValue(String accessTokenValue) {
        return mapper.findByAccessTokenValue(accessTokenValue);
    }

    public OAuth2AuthorizationEntity findByRefreshTokenValue(String refreshTokenValue) {
        return mapper.findByRefreshTokenValue(refreshTokenValue);
    }

    public OAuth2AuthorizationEntity findByOidcIdTokenValue(String oidcIdTokenValue) {
        return mapper.findByOidcIdTokenValue(oidcIdTokenValue);
    }

    public OAuth2AuthorizationEntity findByUserCodeValue(String userCodeValue) {
        return mapper.findByUserCodeValue(userCodeValue);
    }

    public OAuth2AuthorizationEntity findByDeviceCodeValue(String deviceCodeValue) {
        return mapper.findByDeviceCodeValue(deviceCodeValue);
    }
}
