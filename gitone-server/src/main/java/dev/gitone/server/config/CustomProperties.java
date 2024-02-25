package dev.gitone.server.config;

import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.services.AvatarService;
import dev.gitone.server.util.StoragePath;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@ConfigurationProperties(prefix = "dev.gitone.server")
@Data
@Validated
public class CustomProperties implements InitializingBean {

    @NotEmpty
    private String siteName;
    @NotEmpty
    private String secretKey;
    @NotEmpty
    private String baseUrl;
    @NotEmpty
    private String avatars;
    @NotEmpty
    private String gitData;
    @NotNull
    private Ssh ssh;
    @NotNull
    private Node node;

    @Override
    public void afterPropertiesSet() {
        GitRepository.setRootPath(gitData);
    }

    public Path findAvatar(AvatarService.Type type, Integer id) {
        String relativePath = StoragePath.get(type.name().toLowerCase(), id, ".jpeg");
        return Paths.get(avatars, relativePath);
    }

    @Data
    public static class Ssh {
        private Boolean enabled;
        @NotEmpty
        private String host;

        private int port;
        @NotNull
        private List<String> keys;
    }

    @Data
    public static class Node {
        @NotEmpty
        private String host;

        private int port;
    }
}
