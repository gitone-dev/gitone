package dev.gitone.server.mappers;

import dev.gitone.server.entities.OAuth2AuthorizationEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OAuth2AuthorizationMapper extends NodeMapper<Integer, OAuth2AuthorizationEntity> {

    OAuth2AuthorizationEntity findByUuid(String uuid);

    OAuth2AuthorizationEntity findByState(String state);

    OAuth2AuthorizationEntity findByAuthorizationCodeValue(String authorizationCodeValue);

    OAuth2AuthorizationEntity findByAccessTokenValue(String accessTokenValue);

    OAuth2AuthorizationEntity findByOidcIdTokenValue(String oidcIdTokenValue);

    OAuth2AuthorizationEntity findByRefreshTokenValue(String refreshTokenValue);

    OAuth2AuthorizationEntity findByUserCodeValue(String userCodeValue);

    OAuth2AuthorizationEntity findByDeviceCodeValue(String deviceCodeValue);
}
