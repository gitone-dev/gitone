package dev.gitone.server.results;

import dev.gitone.server.entities.Access;
import lombok.Data;

@Data
public class MemberResult {

    private String id;

    private Access access;

    private UserResult user;
}
