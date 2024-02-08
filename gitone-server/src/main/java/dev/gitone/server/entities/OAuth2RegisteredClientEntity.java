package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Map;

@Data
public class OAuth2RegisteredClientEntity implements TimestampNode<Integer> {

    public static final String TYPE = "RegisteredClient";

    private Integer id;

    private String uuid;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Integer namespaceId;

    private String clientId;

    private OffsetDateTime clientIdIssuedAt;

    private String clientSecret;

    private OffsetDateTime clientSecretExpiresAt;

    private String clientName;

    private String[] clientAuthenticationMethods;

    private String[] authorizationGrantTypes;

    private String[] redirectUris;

    private String[] postLogoutRedirectUris;

    private String[] scopes;

    private Map<String, Object> clientSettings;

    private Map<String, Object> tokenSettings;

    private String description = "";

    private Integer createdById;
}
