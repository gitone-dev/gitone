package dev.gitone.server.config.mybatis;

import org.mybatis.spring.boot.autoconfigure.ConfigurationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBatisConfig {

    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration ->
                configuration.setDefaultEnumTypeHandler(EnumValueTypeHandler.class);
    }

    @Bean
    public IntegerArrayTypeHandler integerArrayTypeHandler() {
        return new IntegerArrayTypeHandler();
    }

    @Bean
    public StringArrayTypeHandler stringArrayTypeHandler() {
        return new StringArrayTypeHandler();
    }

    @Bean
    public OAuth2MapTypeHandler mapTypeHandler() {
        return new OAuth2MapTypeHandler();
    }
}
