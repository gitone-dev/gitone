package dev.gitone.server.controllers.tags;

import dev.gitone.server.controllers.tags.inputs.CreateTagInput;
import dev.gitone.server.controllers.tags.payloads.CreateTagPayload;
import dev.gitone.server.controllers.tags.inputs.DeleteTagInput;
import dev.gitone.server.controllers.tags.payloads.DeleteTagPayload;
import dev.gitone.server.entities.Role;
import dev.gitone.server.models.git.GitTag;
import dev.gitone.server.services.TagService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@AllArgsConstructor
@Controller
public class TagMutationController {

    private final TagService tagService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateTagPayload createTag(@Argument CreateTagInput input) throws IOException {
        GitTag tag= tagService.create(input);
        return new CreateTagPayload(tag);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteTagPayload deleteTag(@Argument DeleteTagInput input) throws IOException {
        GitTag tag = tagService.delete(input);
        return new DeleteTagPayload(tag);
    }
}
