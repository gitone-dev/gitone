package dev.gitone.server.controllers.registeredClients.inputs;

import dev.gitone.server.daos.OAuth2RegisteredClientDao;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.UUID;

@Data
public class CreateRegisteredClientInput {

    @NotBlank
    private String fullPath;
    @NotBlank
    private String clientName;
    @NotNull
    private List<String> redirectUris;
    @NotNull
    private List<String> scopes;

    private String description = "";

    public OAuth2RegisteredClientEntity entity(PasswordEncoder passwordEncoder) {
        // TODO
        String uuid = UUID.randomUUID().toString();
        RegisteredClient registeredClient = RegisteredClient.withId(uuid)
                .clientId(uuid)
                .clientName(clientName)
                .clientSecret("{noop}" + UUID.randomUUID())
                .clientIdIssuedAt(OffsetDateTime.now().toInstant())
                .clientAuthenticationMethods(s -> {
                    s.add(ClientAuthenticationMethod.CLIENT_SECRET_BASIC);
                    s.add(ClientAuthenticationMethod.CLIENT_SECRET_POST);
                    s.add(ClientAuthenticationMethod.CLIENT_SECRET_JWT);
                    s.add(ClientAuthenticationMethod.PRIVATE_KEY_JWT);
                })
                .authorizationGrantTypes(s -> {
                    s.add(AuthorizationGrantType.AUTHORIZATION_CODE);
                    s.add(AuthorizationGrantType.REFRESH_TOKEN);
                    s.add(AuthorizationGrantType.CLIENT_CREDENTIALS);
                })
                .redirectUris(s -> s.addAll(redirectUris))
                .scopes(s -> s.addAll(scopes))
                .build();
        OAuth2RegisteredClientEntity entity = OAuth2RegisteredClientDao.toEntity(registeredClient);
        entity.setDescription(description);
        return entity;
    }
}
