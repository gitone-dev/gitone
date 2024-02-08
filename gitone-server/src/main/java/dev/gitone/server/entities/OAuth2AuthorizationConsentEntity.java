package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class OAuth2AuthorizationConsentEntity implements TimestampNode<Integer> {

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private String registeredClientId;

    private String principalName;

    private String[] authorities;
}
