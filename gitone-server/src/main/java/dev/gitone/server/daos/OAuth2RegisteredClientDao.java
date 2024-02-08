package dev.gitone.server.daos;

import dev.gitone.server.controllers.registeredClients.RegisteredClientFilter;
import dev.gitone.server.controllers.registeredClients.RegisteredClientPage;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import dev.gitone.server.mappers.OAuth2RegisteredClientMapper;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Repository;

import java.time.ZoneOffset;
import java.util.Arrays;
import java.util.List;

@Repository
public class OAuth2RegisteredClientDao
        extends TimestampDao<Integer, OAuth2RegisteredClientEntity, OAuth2RegisteredClientMapper>
        implements RegisteredClientRepository
{

    public OAuth2RegisteredClientDao(OAuth2RegisteredClientMapper mapper) {
        super(mapper);
    }

    @Override
    public void save(RegisteredClient registeredClient) {
        if (registeredClient == null) return;

        OAuth2RegisteredClientEntity entity = toEntity(registeredClient);
        OAuth2RegisteredClientEntity existingRegisteredClient = mapper.findByUuid(entity.getUuid());
        if (existingRegisteredClient != null) {
            update(entity);
        } else {
            create(entity);
        }
    }

    @Override
    public RegisteredClient findById(String id) {
        OAuth2RegisteredClientEntity entity = mapper.findByUuid(id);
        return toObject(entity);
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        OAuth2RegisteredClientEntity entity = mapper.findByClientId(clientId);
        return toObject(entity);
    }

    public List<OAuth2RegisteredClientEntity> findAll(RegisteredClientFilter filter, RegisteredClientPage page) {
        return mapper.findAll(filter, page);
    }

    public static OAuth2RegisteredClientEntity toEntity(RegisteredClient registeredClient) {
        OAuth2RegisteredClientEntity entity = new OAuth2RegisteredClientEntity();
        entity.setUuid(registeredClient.getId());
        entity.setClientId(registeredClient.getClientId());
        if (registeredClient.getClientIdIssuedAt() != null)
            entity.setClientIdIssuedAt(registeredClient.getClientIdIssuedAt().atOffset(ZoneOffset.UTC));
        entity.setClientSecret(registeredClient.getClientSecret());
        if (registeredClient.getClientSecretExpiresAt() != null)
            entity.setClientSecretExpiresAt(registeredClient.getClientSecretExpiresAt().atOffset(ZoneOffset.UTC));
        entity.setClientName(registeredClient.getClientName());
        entity.setClientAuthenticationMethods(
                registeredClient.getClientAuthenticationMethods()
                        .stream().map(ClientAuthenticationMethod::getValue).toList().toArray(new String[0])
        );
        entity.setAuthorizationGrantTypes(
                registeredClient.getAuthorizationGrantTypes()
                        .stream().map(AuthorizationGrantType::getValue).toList().toArray(new String[0]));
        entity.setRedirectUris(
                registeredClient.getRedirectUris().toArray(new String[0])
        );
        entity.setPostLogoutRedirectUris(
                registeredClient.getPostLogoutRedirectUris().toArray(new String[0])
        );
        entity.setScopes(
                registeredClient.getScopes().toArray(new String[0])
        );
        entity.setClientSettings(registeredClient.getClientSettings().getSettings());
        entity.setTokenSettings(registeredClient.getTokenSettings().getSettings());
        return entity;
    }

    private static RegisteredClient toObject(OAuth2RegisteredClientEntity entity) {
        if (entity == null) return null;

        return RegisteredClient.withId(entity.getUuid())
                .clientId(entity.getClientId())
                .clientIdIssuedAt(entity.getClientIdIssuedAt() != null ? entity.getClientIdIssuedAt().toInstant() : null)
                .clientSecret(entity.getClientSecret())
                .clientSecretExpiresAt(entity.getClientSecretExpiresAt() != null ? entity.getClientSecretExpiresAt().toInstant() : null)
                .clientName(entity.getClientName())
                .clientAuthenticationMethods((authenticationMethods) ->
                        Arrays.stream(entity.getClientAuthenticationMethods()).forEach(authenticationMethod ->
                                authenticationMethods.add(resolveClientAuthenticationMethod(authenticationMethod))))
                .authorizationGrantTypes((grantTypes) ->
                        Arrays.stream(entity.getAuthorizationGrantTypes()).forEach(grantType ->
                                grantTypes.add(resolveAuthorizationGrantType(grantType))))
                .redirectUris((uris) ->
                        uris.addAll(Arrays.stream(entity.getRedirectUris()).toList()))
                .postLogoutRedirectUris((uris) ->
                        uris.addAll(Arrays.stream(entity.getPostLogoutRedirectUris()).toList()))
                .scopes((scopes) ->
                        scopes.addAll(Arrays.stream(entity.getScopes()).toList()))
                .clientSettings(ClientSettings.withSettings(entity.getClientSettings()).build())
                .tokenSettings(TokenSettings.withSettings(entity.getTokenSettings()).build())
                .build();
    }

    private static AuthorizationGrantType resolveAuthorizationGrantType(String authorizationGrantType) {
        if (AuthorizationGrantType.AUTHORIZATION_CODE.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.AUTHORIZATION_CODE;
        } else if (AuthorizationGrantType.CLIENT_CREDENTIALS.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.CLIENT_CREDENTIALS;
        } else if (AuthorizationGrantType.REFRESH_TOKEN.getValue().equals(authorizationGrantType)) {
            return AuthorizationGrantType.REFRESH_TOKEN;
        }
        return new AuthorizationGrantType(authorizationGrantType); // Custom authorization grant type
    }

    private static ClientAuthenticationMethod resolveClientAuthenticationMethod(String clientAuthenticationMethod) {
        if (ClientAuthenticationMethod.CLIENT_SECRET_BASIC.getValue().equals(clientAuthenticationMethod)) {
            return ClientAuthenticationMethod.CLIENT_SECRET_BASIC;
        } else if (ClientAuthenticationMethod.CLIENT_SECRET_POST.getValue().equals(clientAuthenticationMethod)) {
            return ClientAuthenticationMethod.CLIENT_SECRET_POST;
        } else if (ClientAuthenticationMethod.NONE.getValue().equals(clientAuthenticationMethod)) {
            return ClientAuthenticationMethod.NONE;
        }
        return new ClientAuthenticationMethod(clientAuthenticationMethod); // Custom client authentication method
    }
}
