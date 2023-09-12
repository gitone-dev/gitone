package cn.notfound.gitone.server.policies;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.Access;
import lombok.Data;

import java.util.Set;

@Data
public class Policy {

    private final String id;

    public Access access = Access.NO_ACCESS;

    private Set<Action> actions;

    public Policy(Class<?> klass, Integer id) {
        this.id = Relay.toGlobalId(klass.getSimpleName(), id);
    }
}
