package dev.gitone.server.mappers;

import dev.gitone.server.entities.OAuth2AuthorizationConsentEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OAuth2AuthorizationConsentMapper extends NodeMapper<Integer, OAuth2AuthorizationConsentEntity> {

    OAuth2AuthorizationConsentEntity findByRegisteredClientIdAndPrincipalName(
            @Param("registeredClientId") String registeredClientId, @Param("principalName") String principalName);
}
