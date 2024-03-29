package dev.gitone.server.controllers.namespaces.inputs;

import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.Visibility;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateVisibilityInput {

    @NotBlank
    private String fullPath;

    @NotNull
    private Visibility visibility;

    public boolean toPublic(NamespaceEntity entity) {
        return entity.isPrivate() && Visibility.PUBLIC.equals(visibility);
    }

    public boolean toPrivate(NamespaceEntity entity) {
        return entity.isPublic() && Visibility.PRIVATE.equals(visibility);
    }
}
