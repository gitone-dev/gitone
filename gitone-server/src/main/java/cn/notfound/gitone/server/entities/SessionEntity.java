package cn.notfound.gitone.server.entities;

import lombok.Data;

@Data
public class SessionEntity {

    private String email;

    private String username;

    private boolean active;

    private String header;

    private String token;
}
