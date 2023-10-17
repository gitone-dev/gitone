package cn.notfound.gitone.server.results;

import lombok.Data;

@Data
public class SessionResult {

    private String username;

    private boolean active;

    private String header;

    private String token;

    private String password;
}
