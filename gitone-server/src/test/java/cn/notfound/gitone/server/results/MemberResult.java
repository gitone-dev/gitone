package cn.notfound.gitone.server.results;

import cn.notfound.gitone.server.entities.Access;
import lombok.Data;

@Data
public class MemberResult {

    private String id;

    private Access access;

    private UserResult user;
}
