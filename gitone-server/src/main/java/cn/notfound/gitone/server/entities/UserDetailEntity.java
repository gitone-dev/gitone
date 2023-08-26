package cn.notfound.gitone.server.entities;

import lombok.Data;

@Data
public class UserDetailEntity implements Node<Integer> {

    private Integer id;

    private String bio = "";

    private String location = "";

    private String websiteUrl = "";
}
