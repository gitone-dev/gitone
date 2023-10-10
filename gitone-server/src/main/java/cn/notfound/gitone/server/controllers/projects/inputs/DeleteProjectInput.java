package cn.notfound.gitone.server.controllers.projects.inputs;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.entities.ProjectEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeleteProjectInput {

    @NotBlank
    private String id;

    public Integer id() {
        return Relay.fromGlobalId(ProjectEntity.TYPE, id).id();
    }
}
