package dev.gitone.server.policies;

import dev.gitone.server.controllers.Relay;
import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.MemberEntity;
import lombok.Data;

import java.util.Set;

@Data
public class Policy {

    private final String id;

    public Access access = Access.NO_ACCESS;

    private Set<Action> actions;

    private MemberEntity memberEntity;

    public Policy(Class<?> klass, Integer id) {
        this.id = Relay.toGlobalId(klass.getSimpleName(), id);
    }
}
