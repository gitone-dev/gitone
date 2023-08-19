package cn.notfound.gitone.server.mailers.types;

import lombok.Data;
import org.springframework.util.Assert;

@Data
public class ActivateUserUserModel {

    private String title = "注册";

    private String siteName;

    private String baseUrl;

    private String username;

    private String token;

    public String getSubject() {
        Assert.hasText(siteName, "无效的 siteName");

        return String.format("[%s] 确认你的新账号", siteName);
    }
}
