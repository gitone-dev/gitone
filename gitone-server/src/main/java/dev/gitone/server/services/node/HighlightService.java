package dev.gitone.server.services.node;

import dev.gitone.node.highlight.*;
import dev.gitone.server.config.CustomProperties;
import dev.gitone.server.models.git.GitDiff;
import dev.gitone.server.models.git.GitDiffLine;
import io.grpc.Grpc;
import io.grpc.InsecureChannelCredentials;
import io.grpc.ManagedChannel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class HighlightService {

    private final HighlightGrpc.HighlightBlockingStub blockingStub;

    private final HighlightGrpc.HighlightStub stub;

    @Autowired
    public HighlightService(CustomProperties properties) {
        CustomProperties.Node node = properties.getNode();
        String target = String.format("%s:%d", node.getHost(), node.getPort());
        ManagedChannel channel = Grpc.newChannelBuilder(target, InsecureChannelCredentials.create()).build();
        this.stub = HighlightGrpc.newStub(channel);
        this.blockingStub = HighlightGrpc.newBlockingStub(channel);
    }

    public BlobResponse blob(BlobRequest request) {
        return blockingStub.blob(request);
    }

    public BlobObserver blobs() {
        return new BlobObserver(this.stub);
    }

    public List<DiffLine> diff(GitDiff gitDiff) throws IOException {
        DiffRequest.Builder builder = DiffRequest.newBuilder()
                .setId(gitDiff.getId())
                .setType(DiffRequest.Type.valueOf(gitDiff.getType().name()))
                .setOldPath(gitDiff.getOldPath())
                .setNewPath(gitDiff.getNewPath())
                .setOldSha(gitDiff.getOldSha())
                .setNewSha(gitDiff.getNewSha())
                .setOldText(new String(gitDiff.getOldContent()))
                .setNewText(new String(gitDiff.getNewContent()));
        for (GitDiffLine gitDiffLine : gitDiff.getDiffLines()) {
            DiffLine.Builder lineBuilder = DiffLine.newBuilder()
                    .setType(DiffLine.Type.valueOf(gitDiffLine.getType().name()))
                    .setOldNumber(gitDiffLine.getOldNumber())
                    .setNewNumber(gitDiffLine.getNewNumber())
                    .setText(gitDiffLine.getText());
            builder.addLines(lineBuilder.build());
        }
        DiffResponse response = blockingStub.diff(builder.build());
        return response.getLinesList();
    }
}
