package cn.notfound.gitone.server.controllers.branches;

import cn.notfound.gitone.server.controllers.branches.inputs.CreateBranchInput;
import cn.notfound.gitone.server.controllers.branches.payloads.CreateBranchPayload;
import cn.notfound.gitone.server.controllers.branches.inputs.DeleteBranchInput;
import cn.notfound.gitone.server.controllers.branches.payloads.DeleteBranchPayload;
import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.models.git.GitBranch;
import cn.notfound.gitone.server.services.BranchService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@AllArgsConstructor
@Controller
public class BranchMutationController {

    private final BranchService branchService;

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public CreateBranchPayload createBranch(@Argument CreateBranchInput input) throws IOException {
        GitBranch branch = branchService.create(input);
        return new CreateBranchPayload(branch);
    }

    @MutationMapping
    @Secured({ Role.ROLE_USER })
    public DeleteBranchPayload deleteBranch(@Argument DeleteBranchInput input) throws IOException {
        GitBranch branch = branchService.delete(input);
        return new DeleteBranchPayload(branch);
    }
}
