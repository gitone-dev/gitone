package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.controllers.namespaces.inputs.UpdatePathInput;
import cn.notfound.gitone.server.controllers.namespaces.inputs.UpdateVisibilityInput;
import cn.notfound.gitone.server.controllers.namespaces.payloads.UpdatePathPayload;
import cn.notfound.gitone.server.controllers.namespaces.payloads.UpdateVisibilityPayload;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.services.NamespaceService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class NamespaceMutationController extends ViewerContext {

    private final NamespaceService namespaceService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdateVisibilityPayload updateVisibility(@Valid @Argument UpdateVisibilityInput input) {
        NamespaceEntity namespaceEntity = namespaceService.updateVisibility(input);
        return new UpdateVisibilityPayload(namespaceEntity);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public UpdatePathPayload updatePath(@Valid @Argument UpdatePathInput input) {
        NamespaceEntity namespaceEntity = namespaceService.updatePath(input);
        return new UpdatePathPayload(namespaceEntity);
    }
}
