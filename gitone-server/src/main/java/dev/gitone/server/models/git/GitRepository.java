package dev.gitone.server.models.git;

import dev.gitone.server.entities.Node;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.util.StoragePath;
import lombok.Getter;
import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.util.FileUtils;
import org.springframework.util.Assert;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

public class GitRepository implements Node<String> {

    public static final String TYPE = "Repository";

    public static final String InitialBranch = "main";
    @Getter
    private static String rootPath;

    public static void setRootPath(String rootPath) {
        Assert.notNull(rootPath, "rootPath 为空");

        synchronized (GitRepository.class) {
            if (GitRepository.rootPath != null) {
                throw new RuntimeException(GitRepository.rootPath);
            }
            GitRepository.rootPath = rootPath;
        }
    }

    @Getter
    private final String relativePath;
    private final File gitDir;
    final Repository repository;
    private final String id;

    public GitRepository(ProjectEntity projectEntity) throws IOException {
        this.id = projectEntity.getId().toString();
        this.relativePath = StoragePath.get(projectEntity);

        Assert.hasText(rootPath, "rootPath 为空");
        Assert.hasText(relativePath, "仓库路径为空");

        this.gitDir = Paths.get(rootPath, relativePath).toFile();
        try {
            this.repository =  new FileRepositoryBuilder()
                    .setBare()
                    .setInitialBranch(InitialBranch)
                    .setGitDir(gitDir)
                    .build();
        } catch (InvalidRefNameException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String getId() {
        return id;
    }

    public void create() throws IOException {
        repository.create(true);
    }

    public void delete() throws IOException {
        FileUtils.delete(gitDir, FileUtils.RECURSIVE);
    }

    public boolean empty() throws IOException {
        return repository.getRefDatabase().getRefsByPrefix(Constants.R_HEADS).isEmpty();
    }

    public GitBranch defaultBranch() throws IOException {
        Ref ref = repository.findRef(Constants.HEAD).getLeaf();
        if (ref == null || ref.getObjectId() == null) return null;

        try (RevWalk walk = new RevWalk(repository)) {
            RevCommit revCommit = walk.parseCommit(ref.getObjectId());
            return new GitBranch(this, ref, revCommit);
        }
    }
}
