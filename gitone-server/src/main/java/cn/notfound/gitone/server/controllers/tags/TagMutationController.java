package cn.notfound.gitone.server.controllers.tags;

import cn.notfound.gitone.server.controllers.tags.inputs.CreateTagInput;
import cn.notfound.gitone.server.controllers.tags.payloads.CreateTagPayload;
import cn.notfound.gitone.server.controllers.tags.inputs.DeleteTagInput;
import cn.notfound.gitone.server.controllers.tags.payloads.DeleteTagPayload;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.models.git.GitTag;
import cn.notfound.gitone.server.services.TagService;
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
