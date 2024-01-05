package cn.notfound.gitone.server.controllers.diffs;

import cn.notfound.gitone.node.highlight.DiffLine;
import cn.notfound.gitone.server.models.git.GitDiff;
import cn.notfound.gitone.server.services.node.HighlightService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = GitDiff.TYPE)
public class DiffTypeController {

    private HighlightService highlightService;

    @SchemaMapping
    public List<DiffLine> lines(GitDiff gitDiff) throws IOException {
        return highlightService.diff(gitDiff);
    }
}
