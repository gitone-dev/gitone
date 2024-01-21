package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class UserDetailEntity implements Node<Integer> {

    private Integer id;

    private String email;

    private String password;

    private String resetPasswordToken;

    private OffsetDateTime resetPasswordSentAt;

    private Boolean active = Boolean.FALSE;

    private Role role = Role.USER;

    private String location = "";

    private String websiteUrl = "";
}
