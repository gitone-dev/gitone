package dev.gitone.server.services;

import dev.gitone.server.daos.OAuth2AuthorizationDao;
import dev.gitone.server.entities.OAuth2AuthorizationEntity;
import org.springframework.dao.DataRetrievalFailureException;
import org.springframework.security.oauth2.core.*;
import org.springframework.security.oauth2.core.endpoint.OAuth2ParameterNames;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.endpoint.OidcParameterNames;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationCode;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Service
public class CustomOAuth2AuthorizationService implements OAuth2AuthorizationService {

    private final OAuth2AuthorizationDao authorizationDao;

    private final RegisteredClientRepository registeredClientRepository;

    public CustomOAuth2AuthorizationService(OAuth2AuthorizationDao authorizationDao, RegisteredClientRepository registeredClientRepository) {
        this.authorizationDao = authorizationDao;
        this.registeredClientRepository = registeredClientRepository;
    }

    @Override
    public void save(OAuth2Authorization authorization) {
        if (authorization == null) return;

        OAuth2AuthorizationEntity entity = toEntity(authorization);
        OAuth2AuthorizationEntity existingEntity = authorizationDao.findByUuid(authorization.getId());
        if (existingEntity == null) {
            authorizationDao.create(entity);
        } else {
            entity.setId(existingEntity.getId());
            entity.setCreatedAt(existingEntity.getCreatedAt());
            authorizationDao.update(entity);
        }
    }

    @Override
    public void remove(OAuth2Authorization authorization) {
        OAuth2AuthorizationEntity entity = authorizationDao.findByUuid(authorization.getId());
        if (entity == null) return;
        authorizationDao.delete(entity.getId());
    }

    @Override
    public OAuth2Authorization findById(String id) {
        OAuth2AuthorizationEntity entity = authorizationDao.findByUuid(id);
        if (entity == null) return null;
        return toObject(entity);
    }

    @Override
    public OAuth2Authorization findByToken(String token, OAuth2TokenType tokenType) {
        OAuth2AuthorizationEntity entity = null;
        if (tokenType == null) {
            // TODO
        } else if (OAuth2ParameterNames.STATE.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByState(token);
        } else if (OAuth2ParameterNames.CODE.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByAuthorizationCodeValue(token);
        } else if (OAuth2ParameterNames.ACCESS_TOKEN.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByAccessTokenValue(token);
        } else if (OAuth2ParameterNames.REFRESH_TOKEN.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByRefreshTokenValue(token);
        } else if (OidcParameterNames.ID_TOKEN.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByOidcIdTokenValue(token);
        } else if (OAuth2ParameterNames.USER_CODE.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByUserCodeValue(token);
        } else if (OAuth2ParameterNames.DEVICE_CODE.equals(tokenType.getValue())) {
            entity = this.authorizationDao.findByDeviceCodeValue(token);
        }

        if (entity == null) return null;
        return toObject(entity);
    }

    private OAuth2Authorization toObject(OAuth2AuthorizationEntity entity) {
        RegisteredClient registeredClient = this.registeredClientRepository.findById(entity.getRegisteredClientId());
        if (registeredClient == null) {
            throw new DataRetrievalFailureException(
                    "The RegisteredClient with id '" + entity.getRegisteredClientId() + "' was not found in the RegisteredClientRepository.");
        }

        OAuth2Authorization.Builder builder = OAuth2Authorization.withRegisteredClient(registeredClient)
                .id(entity.getUuid())
                .principalName(entity.getPrincipalName())
                .authorizationGrantType(resolveAuthorizationGrantType(entity.getAuthorizationGrantType()))
                .authorizedScopes(Arrays.stream(entity.getAuthorizedScopes()).collect(Collectors.toSet()))
                .attributes(attributes -> attributes.putAll(entity.getAttributes()));
        if (entity.getState() != null) {
            builder.attribute(OAuth2ParameterNames.STATE, entity.getState());
        }

        if (entity.getAuthorizationCodeValue() != null) {
            OAuth2AuthorizationCode authorizationCode = new OAuth2AuthorizationCode(
                    entity.getAuthorizationCodeValue(),
                    entity.getAuthorizationCodeIssuedAt().toInstant(),
                    entity.getAuthorizationCodeExpiresAt().toInstant());
            builder.token(authorizationCode, metadata -> metadata.putAll(entity.getAuthorizationCodeMetadata()));
        }

        if (entity.getAccessTokenValue() != null) {
            OAuth2AccessToken accessToken = new OAuth2AccessToken(
                    OAuth2AccessToken.TokenType.BEARER,
                    entity.getAccessTokenValue(),
                    entity.getAccessTokenIssuedAt().toInstant(),
                    entity.getAccessTokenExpiresAt().toInstant(),
                    Arrays.stream(entity.getAccessTokenScopes()).collect(Collectors.toSet()));
            builder.token(accessToken, metadata -> metadata.putAll(entity.getAccessTokenMetadata()));
        }

        if (entity.getRefreshTokenValue() != null) {
            OAuth2RefreshToken refreshToken = new OAuth2RefreshToken(
                    entity.getRefreshTokenValue(),
                    entity.getRefreshTokenIssuedAt().toInstant(),
                    entity.getRefreshTokenExpiresAt().toInstant());
            builder.token(refreshToken, metadata -> metadata.putAll(entity.getRefreshTokenMetadata()));
        }

        if (entity.getOidcIdTokenValue() != null) {
            OidcIdToken idToken = new OidcIdToken(
                    entity.getOidcIdTokenValue(),
                    entity.getOidcIdTokenIssuedAt().toInstant(),
                    entity.getOidcIdTokenExpiresAt().toInstant(),
                    entity.getOidcIdTokenClaims());
            builder.token(idToken, metadata -> metadata.putAll(entity.getOidcIdTokenMetadata()));
        }

        if (entity.getUserCodeValue() != null) {
            OAuth2UserCode userCode = new OAuth2UserCode(
                    entity.getUserCodeValue(),
                    entity.getUserCodeIssuedAt().toInstant(),
                    entity.getUserCodeExpiresAt().toInstant());
            builder.token(userCode, metadata -> metadata.putAll(entity.getUserCodeMetadata()));
        }

        if (entity.getDeviceCodeValue() != null) {
            OAuth2DeviceCode deviceCode = new OAuth2DeviceCode(
                    entity.getDeviceCodeValue(),
                    entity.getDeviceCodeIssuedAt().toInstant(),
                    entity.getDeviceCodeExpiresAt().toInstant());
            builder.token(deviceCode, metadata -> metadata.putAll(entity.getDeviceCodeMetadata()));
        }

        return builder.build();
    }

    private OAuth2AuthorizationEntity toEntity(OAuth2Authorization authorization) {
        OAuth2AuthorizationEntity entity = new OAuth2AuthorizationEntity();
        entity.setUuid(authorization.getId());
        entity.setRegisteredClientId(authorization.getRegisteredClientId());
        entity.setPrincipalName(authorization.getPrincipalName());
        entity.setAuthorizationGrantType(authorization.getAuthorizationGrantType().getValue());
        entity.setAuthorizedScopes(authorization.getAuthorizedScopes().toArray(new String[0]));
        entity.setAttributes(authorization.getAttributes());
        entity.setState(authorization.getAttribute(OAuth2ParameterNames.STATE));

        OAuth2Authorization.Token<OAuth2AuthorizationCode> authorizationCode =
                authorization.getToken(OAuth2AuthorizationCode.class);
        setTokenValues(
                authorizationCode,
                entity::setAuthorizationCodeValue,
                entity::setAuthorizationCodeIssuedAt,
                entity::setAuthorizationCodeExpiresAt,
                entity::setAuthorizationCodeMetadata
        );

        OAuth2Authorization.Token<OAuth2AccessToken> accessToken =
                authorization.getToken(OAuth2AccessToken.class);
        setTokenValues(
                accessToken,
                entity::setAccessTokenValue,
                entity::setAccessTokenIssuedAt,
                entity::setAccessTokenExpiresAt,
                entity::setAccessTokenMetadata
        );
        if (accessToken != null && accessToken.getToken().getScopes() != null) {
            entity.setAccessTokenScopes(accessToken.getToken().getScopes().toArray(new String[0]));
        }

        OAuth2Authorization.Token<OAuth2RefreshToken> refreshToken =
                authorization.getToken(OAuth2RefreshToken.class);
        setTokenValues(
                refreshToken,
                entity::setRefreshTokenValue,
                entity::setRefreshTokenIssuedAt,
                entity::setRefreshTokenExpiresAt,
                entity::setRefreshTokenMetadata
        );

        OAuth2Authorization.Token<OidcIdToken> oidcIdToken =
                authorization.getToken(OidcIdToken.class);
        setTokenValues(
                oidcIdToken,
                entity::setOidcIdTokenValue,
                entity::setOidcIdTokenIssuedAt,
                entity::setOidcIdTokenExpiresAt,
                entity::setOidcIdTokenMetadata
        );
        if (oidcIdToken != null) {
            entity.setOidcIdTokenClaims(oidcIdToken.getClaims());
        }

        OAuth2Authorization.Token<OAuth2UserCode> userCode =
                authorization.getToken(OAuth2UserCode.class);
        setTokenValues(
                userCode,
                entity::setUserCodeValue,
                entity::setUserCodeIssuedAt,
                entity::setUserCodeExpiresAt,
                entity::setUserCodeMetadata
        );

        OAuth2Authorization.Token<OAuth2DeviceCode> deviceCode =
                authorization.getToken(OAuth2DeviceCode.class);
        setTokenValues(
                deviceCode,
                entity::setDeviceCodeValue,
                entity::setDeviceCodeIssuedAt,
                entity::setDeviceCodeExpiresAt,
                entity::setDeviceCodeMetadata
        );

        return entity;
    }

    private void setTokenValues(
            OAuth2Authorization.Token<?> token,
            Consumer<String> tokenValueConsumer,
            Consumer<OffsetDateTime> issuedAtConsumer,
            Consumer<OffsetDateTime> expiresAtConsumer,
            Consumer<Map<String, Object>> metadataConsumer) {
        if (token != null) {
            OAuth2Token oAuth2Token = token.getToken();
            tokenValueConsumer.accept(oAuth2Token.getTokenValue());
            issuedAtConsumer.accept(oAuth2Token.getIssuedAt().atOffset(ZoneOffset.UTC));
            expiresAtConsumer.accept(oAuth2Token.getExpiresAt().atOffset(ZoneOffset.UTC));
            metadataConsumer.accept(token.getMetadata());
        }
    }

    private static AuthorizationGrantType resolveAuthorizationGrantType(String authorizationGrantType) {
        if (AuthorizationGrantType.AUTHORIZATION_CODE.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.AUTHORIZATION_CODE;
        } else if (AuthorizationGrantType.CLIENT_CREDENTIALS.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.CLIENT_CREDENTIALS;
        } else if (AuthorizationGrantType.REFRESH_TOKEN.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.REFRESH_TOKEN;
        } else if (AuthorizationGrantType.DEVICE_CODE.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.DEVICE_CODE;
        }
        return new AuthorizationGrantType(authorizationGrantType);              // Custom authorization grant type
    }
}
