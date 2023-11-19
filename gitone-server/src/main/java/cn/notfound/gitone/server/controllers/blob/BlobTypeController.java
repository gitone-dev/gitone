package cn.notfound.gitone.server.controllers.blob;

import cn.notfound.gitone.server.controllers.Relay;
import cn.notfound.gitone.server.models.git.GitBlob;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;

import java.io.IOException;

@Controller
@SchemaMapping(typeName = GitBlob.TYPE)
public class BlobTypeController {

    @SchemaMapping
    public String id(GitBlob gitBlob) {
        return Relay.toGlobalId(GitBlob.TYPE, gitBlob.getId());
    }

    @SchemaMapping
    public String text(GitBlob gitBlob) throws IOException {
        // FIXME: 2023/11/6 文件识别
        return new String(gitBlob.getData());
    }
}
