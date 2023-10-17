package cn.notfound.gitone.server.config;

import graphql.scalars.ExtendedScalars;
import org.springframework.boot.autoconfigure.graphql.GraphQlSourceBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.ClassNameTypeResolver;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration(proxyBeanMethods = false)
public class GraphQlConfig {

    @Bean
    public GraphQlSourceBuilderCustomizer sourceBuilderCustomizer() {
        return builder -> {
            ClassNameTypeResolver classNameTypeResolver = new ClassNameTypeResolver();
            classNameTypeResolver.setClassNameExtractor((klass) ->
                    klass.getSimpleName().replaceFirst("Entity$", ""));
            builder.defaultTypeResolver(classNameTypeResolver);
        };
    }

    @Bean
    public RuntimeWiringConfigurer runtimeWiringConfigurer() {
        return builder -> builder.scalar(ExtendedScalars.DateTime);
    }
}
