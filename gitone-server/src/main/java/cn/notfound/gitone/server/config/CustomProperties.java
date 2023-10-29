package cn.notfound.gitone.server.config;

import cn.notfound.gitone.server.models.git.GitRepository;
import cn.notfound.gitone.server.util.StoragePath;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@ConfigurationProperties(prefix = "cn.notfound.gitone")
@Data
@Validated
public class CustomProperties implements InitializingBean {

    @NotEmpty
    private String siteName;
    @NotEmpty
    private String baseUrl;
    @NotEmpty
    private String avatars;
    @NotEmpty
    private String gitData;
    @NotNull
    private Ssh ssh;

    @Override
    public void afterPropertiesSet() {
        GitRepository.setRootPath(gitData);
    }

    public Path getUserAvatar(Integer userId) {
        String relativePath = StoragePath.get("u", userId, ".jpeg");
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
}
