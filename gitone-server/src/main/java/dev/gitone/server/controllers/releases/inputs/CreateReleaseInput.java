package dev.gitone.server.controllers.releases.inputs;

import dev.gitone.server.entities.ReleaseEntity;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateReleaseInput {

    @NotBlank
    private String fullPath;
    @NotBlank
    private String tagName;
    @NotBlank
    private String title;

    private String description;

    public ReleaseEntity entity() {
        ReleaseEntity entity = new ReleaseEntity();
        entity.setTagName(tagName);
        entity.setTitle(title);
        entity.setDescription(description);
        return entity;
    }
}
