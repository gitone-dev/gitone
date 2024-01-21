package dev.gitone.server.entities;

import lombok.Data;

@Data
public class SessionEntity {

    private String username;

    private  String email;

    private boolean active;

    private String header;

    private String token;
}
