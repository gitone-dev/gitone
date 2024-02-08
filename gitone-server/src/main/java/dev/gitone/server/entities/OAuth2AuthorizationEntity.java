package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;
import java.util.Map;

@Data
public class OAuth2AuthorizationEntity implements TimestampNode<Integer> {

    private Integer id;

    private String uuid;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String registeredClientId;

    private String principalName;

    private String authorizationGrantType;

    private String[] authorizedScopes = new String[0];

    private Map<String, Object> attributes;

    private String state;

    private String authorizationCodeValue;

    private OffsetDateTime authorizationCodeIssuedAt;

    private OffsetDateTime authorizationCodeExpiresAt;

    private Map<String, Object> authorizationCodeMetadata;

    private String accessTokenValue;

    private OffsetDateTime accessTokenIssuedAt;

    private OffsetDateTime accessTokenExpiresAt;

    private Map<String, Object> accessTokenMetadata;

    private String accessTokenType;

    private String[] accessTokenScopes = new String[0];

    private String oidcIdTokenValue;

    private OffsetDateTime oidcIdTokenIssuedAt;

    private OffsetDateTime oidcIdTokenExpiresAt;

    private Map<String, Object> oidcIdTokenMetadata;

    private Map<String, Object> oidcIdTokenClaims;

    private String refreshTokenValue;

    private OffsetDateTime refreshTokenIssuedAt;

    private OffsetDateTime refreshTokenExpiresAt;

    private Map<String, Object> refreshTokenMetadata;

    private String userCodeValue;

    private OffsetDateTime userCodeIssuedAt;

    private OffsetDateTime userCodeExpiresAt;

    private Map<String, Object> userCodeMetadata;

    private String deviceCodeValue;

    private OffsetDateTime deviceCodeIssuedAt;

    private OffsetDateTime deviceCodeExpiresAt;

    private Map<String, Object> deviceCodeMetadata;
}
