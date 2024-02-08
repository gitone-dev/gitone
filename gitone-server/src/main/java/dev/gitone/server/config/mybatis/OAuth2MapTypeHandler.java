package dev.gitone.server.config.mybatis;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.gitone.server.config.jackson2.CustomUserDetailsMixin;
import dev.gitone.server.models.CustomUserDetails;
import org.springframework.security.jackson2.SecurityJackson2Modules;
import org.springframework.security.oauth2.server.authorization.jackson2.OAuth2AuthorizationServerJackson2Module;

import java.sql.SQLException;
import java.util.Map;

public class OAuth2MapTypeHandler extends JsonbTypeHandler<Map<String, Object>> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public OAuth2MapTypeHandler() {
        ClassLoader classLoader = OAuth2MapTypeHandler.class.getClassLoader();
        this.objectMapper.registerModules(SecurityJackson2Modules.getModules(classLoader));
        this.objectMapper.registerModule(new OAuth2AuthorizationServerJackson2Module());
        this.objectMapper.addMixIn(CustomUserDetails.class, CustomUserDetailsMixin.class);
    }

    @Override
    protected String writeValue(Map<String, Object> parameter) throws SQLException {
        try {
            return objectMapper.writeValueAsString(parameter);
        } catch (JsonProcessingException e) {
            throw new SQLException(e);
        }
    }

    @Override
    protected Map<String, Object> readValue(String value) {
        if (value == null) return null;

        try {
            return objectMapper.readValue(value, new TypeReference<>() {});
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
