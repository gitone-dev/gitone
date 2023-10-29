package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.entities.Node;
import cn.notfound.gitone.server.entities.ProjectEntity;
import cn.notfound.gitone.server.util.StoragePath;
import lombok.Getter;
import org.eclipse.jgit.api.errors.InvalidRefNameException;
import org.eclipse.jgit.lib.Constants;
import org.eclipse.jgit.lib.Ref;
import org.eclipse.jgit.lib.Repository;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.util.FileUtils;
import org.eclipse.jgit.util.sha1.SHA1;
import org.springframework.util.Assert;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

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
        this.id = String.format("%s:%d", ProjectEntity.TYPE, projectEntity.getId());
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

    public boolean exists() {
        return repository.getObjectDatabase().exists();
    }

    public List<GitBranch> getBranches() throws IOException {
        List<Ref> refs = repository.getRefDatabase().getRefsByPrefix(Constants.R_HEADS);
        return refs.stream().map(ref -> new GitBranch(this, ref)).toList();
    }

    public List<GitTag> getTags() throws IOException {
        List<Ref> refs = repository.getRefDatabase().getRefsByPrefix(Constants.R_TAGS);
        return refs.stream().map(ref -> new GitTag(this, ref)).toList();
    }
}
