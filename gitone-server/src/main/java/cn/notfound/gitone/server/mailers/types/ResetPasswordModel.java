package cn.notfound.gitone.server.mailers.types;

import lombok.Data;
import org.springframework.util.Assert;

@Data
public class ResetPasswordModel {

    private String title = "重置密码";

    private String siteName;

    private String baseUrl;

    private String username;

    private String token;

    public String getSubject() {
        Assert.hasText(siteName, "无效的 siteName");

        return String.format("[%s] 重置密码", siteName);
    }
}
