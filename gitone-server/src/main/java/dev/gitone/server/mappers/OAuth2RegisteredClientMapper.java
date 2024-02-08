package dev.gitone.server.mappers;

import dev.gitone.server.controllers.registeredClients.RegisteredClientFilter;
import dev.gitone.server.controllers.registeredClients.RegisteredClientPage;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OAuth2RegisteredClientMapper extends NodeMapper<Integer, OAuth2RegisteredClientEntity> {

    OAuth2RegisteredClientEntity findByUuid(String uuid);

    OAuth2RegisteredClientEntity findByClientId(String clientId);

    List<OAuth2RegisteredClientEntity> findAll(
            @Param("filter") RegisteredClientFilter filter, @Param("page") RegisteredClientPage page);
}
