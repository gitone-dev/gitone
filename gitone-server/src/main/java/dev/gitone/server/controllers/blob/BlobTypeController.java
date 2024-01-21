package dev.gitone.server.controllers.blob;

import dev.gitone.node.highlight.BlobLine;
import dev.gitone.node.highlight.BlobRequest;
import dev.gitone.server.controllers.Relay;
import dev.gitone.server.models.git.GitBlob;
import dev.gitone.server.services.node.HighlightService;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;
import java.util.List;

@AllArgsConstructor
@Controller
@SchemaMapping(typeName = GitBlob.TYPE)
public class BlobTypeController {

    private HighlightService highlightService;

    @SchemaMapping
    public String id(GitBlob gitBlob) {
        return Relay.toGlobalId(GitBlob.TYPE, gitBlob.getId());
    }

    @SchemaMapping
    public BlobLineConnection lines(
            GitBlob gitBlob,
            @Argument Integer first,
            @Argument String after
    ) throws IOException {

        BlobLinePage page = new BlobLinePage(first, after);
        // FIXME: 2023/11/28 语言识别
        BlobRequest request = BlobRequest.newBuilder()
                .setName(gitBlob.getName())
                .setText(new String(gitBlob.getData()))
                .build();
        // FIXME 越界
        List<BlobLine> lines = highlightService.blob(request).getBlobLinesList();
        if (page.getAfter() != null) {
            Integer number = page.getAfter().getNumber();
            if (number != null) lines = lines.subList(number, lines.size());
        }
        if (page.getFirst() != null) {
            lines = lines.subList(0, page.getFirst() + 1);
        }
        return new BlobLineConnection(lines, page);
    }
}
