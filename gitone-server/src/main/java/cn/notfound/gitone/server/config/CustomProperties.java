package cn.notfound.gitone.server.config;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "cn.notfound.gitone")
@Data
@Validated
public class CustomProperties {

    @NotEmpty
    private String siteName;
    @NotEmpty
    private String baseUrl;
}
