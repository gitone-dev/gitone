package cn.notfound.gitone.server.config;

import cn.notfound.gitone.server.util.StoragePath;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.nio.file.Path;
import java.nio.file.Paths;

@ConfigurationProperties(prefix = "cn.notfound.gitone")
@Data
@Validated
public class CustomProperties {

    @NotEmpty
    private String siteName;
    @NotEmpty
    private String baseUrl;
    @NotEmpty
    private String avatars;

    public Path getUserAvatar(Integer userId) {
        String relativePath = StoragePath.get("u", userId, ".jpeg");
        return Paths.get(avatars, relativePath);
    }
}
