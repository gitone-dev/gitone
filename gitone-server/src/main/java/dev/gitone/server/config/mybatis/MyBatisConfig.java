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
}
