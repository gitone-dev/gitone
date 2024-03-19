package dev.gitone.server.models.git;

import lombok.Getter;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.archive.*;
import org.springframework.util.Assert;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public class GitArchive {

    public static final Map<String, List<String>> formats = Map.of(
            "tar", List.of(".tar"),
            "tgz", List.of(".tar.gz", ".tgz"),
            "tbz2", List.of(".tar.bz2", ".tbz", ".tbz2"),
            "txz", List.of(".tar.xz", ".txz"),
            "zip", List.of(".zip")
    );

    @Getter
    private static Path rootPath;

    public static void setup(Path rootPath) {
        ArchiveFormats.registerAll();
        setRootPath(rootPath);
    }

    private static void setRootPath(Path rootPath) {
        Assert.notNull(rootPath, "rootPath 为空");

        synchronized (GitRepository.class) {
            if (GitArchive.rootPath != null) {
                throw new RuntimeException(GitArchive.rootPath.toString());
            }
            GitArchive.rootPath = rootPath;
        }
        File rootFile = rootPath.toFile();
        if (rootFile.exists()) return;
        Assert.isTrue(rootFile.mkdirs(), "mkdir error: " + rootFile);
    }

    private final GitRepository gitRepository;

    public GitArchive(GitRepository gitRepository) {
        this.gitRepository = gitRepository;
    }

    public File archive(GitCommit gitCommit, String format) throws IOException {
        File dstFile = rootPath.resolve(gitCommit.getSha() + "." + format).toFile();
        if (dstFile.exists()) return dstFile;

        File srcFile = File.createTempFile("archive-", "." + format, rootPath.toFile());
        try (OutputStream out = new FileOutputStream(srcFile)) {
            try (Git git = new Git(gitRepository.repository)) {
                git.archive()
                        .setTree(gitCommit.revCommit.getTree())
                        .setFormat(format)
                        .setOutputStream(out)
                        .call();
            } catch (GitAPIException e) {
                throw new IOException(e);
            }
        }
        if (!srcFile.renameTo(dstFile)) {
            // TODO 多个请求重复执行？
            throw new IOException("rename error");
        }

        return dstFile;
    }
}
