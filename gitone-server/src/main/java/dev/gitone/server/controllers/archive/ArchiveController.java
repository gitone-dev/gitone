package dev.gitone.server.controllers.archive;

import dev.gitone.server.config.exception.NotFound;
import dev.gitone.server.daos.ProjectDao;
import dev.gitone.server.entities.ProjectEntity;
import dev.gitone.server.models.git.GitArchive;
import dev.gitone.server.models.git.GitCommit;
import dev.gitone.server.models.git.GitRepository;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
public class ArchiveController {

    private ProjectDao projectDao;

    private NamespacePolicy namespacePolicy;

    @GetMapping("/{path0}/{path1}/-/archive/{*star}")
    public ResponseEntity<Resource> archive(@PathVariable String path0,
                                            @PathVariable String path1,
                                            @PathVariable String star) throws IOException {
        String fullPath = String.join("/", path0, path1);
        return archive(fullPath, star);
    }

    @GetMapping("/{path0}/{path1}/{path2}/-/archive/{*star}")
    public ResponseEntity<Resource> archive(@PathVariable String path0,
                                            @PathVariable String path1,
                                            @PathVariable String path2,
                                            @PathVariable String star) throws IOException {
        String fullPath = String.join("/", path0, path1, path2);
        return archive(fullPath, star);
    }

    @GetMapping("/{path0}/{path1}/{path2}/{path3}/-/archive/{*star}")
    public ResponseEntity<Resource> archive(@PathVariable String path0,
                                            @PathVariable String path1,
                                            @PathVariable String path2,
                                            @PathVariable String path3,
                                            @PathVariable String star) throws IOException {
        String fullPath = String.join("/", path0, path1, path2, path3);
        return archive(fullPath, star);
    }

    @GetMapping("/{path0}/{path1}/{path2}/{path3}/{path4}/-/archive/{*star}")
    public ResponseEntity<Resource> archive(@PathVariable String path0,
                                            @PathVariable String path1,
                                            @PathVariable String path2,
                                            @PathVariable String path3,
                                            @PathVariable String path4,
                                            @PathVariable String star) throws IOException {
        String fullPath = String.join("/", path0, path1, path2, path3, path4);
        return archive(fullPath, star);
    }

    private ResponseEntity<Resource> archive(String fullPath, String star) throws IOException {
        ProjectEntity projectEntity = projectDao.findByFullPath(fullPath);
        namespacePolicy.assertPermission(projectEntity, Action.READ);

        GitRepository gitRepository = new GitRepository(projectEntity);

        for (Map.Entry<String, List<String>> entry: GitArchive.formats.entrySet()) {
            String format = entry.getKey();
            for (String suffix : entry.getValue()) {
                if (!star.endsWith(suffix)) continue;

                String revision = star.substring(1, star.length() - suffix.length());
                GitCommit gitCommit = GitCommit.find(gitRepository, revision);
                NotFound.notNull(gitCommit, revision);

                File outFile = new GitArchive(gitRepository).archive(gitCommit, format);
                return ResponseEntity.ok()
                        .headers(headers -> headers
                                .setContentDisposition(ContentDisposition
                                        .inline()
                                        .filename(String.format("%s-%s%s", projectEntity.getPath(), revision ,suffix))
                                        .build()))
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(new FileSystemResource(outFile));
            }
        }
        throw new IllegalArgumentException(star);
    }
}
