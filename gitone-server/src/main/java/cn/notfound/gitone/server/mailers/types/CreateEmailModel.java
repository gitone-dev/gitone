package cn.notfound.gitone.server.mailers.types;

import lombok.Data;
import org.springframework.util.Assert;

@Data
public class CreateEmailModel {

    private String title = "添加邮箱";

    private String siteName;

    private String baseUrl;

    private String username;

    private String token;

    public String getSubject() {
        Assert.hasText(siteName, "无效的 siteName");

        return String.format("[%s] 添加邮箱", siteName);
    }
}
