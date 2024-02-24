package dev.gitone.server.controllers.avatars;

import dev.gitone.server.entities.Role;
import dev.gitone.server.services.AvatarService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;

@AllArgsConstructor
@Controller
public class AvatarController {

    private AvatarService avatarService;

    @GetMapping("/avatars/n/{id}")
    public ResponseEntity<Resource> namespace(@PathVariable Integer id) throws IOException {
        Resource resource = avatarService.find(AvatarService.Type.N, id);
        return resource(resource);
    }

    @Secured({ Role.ROLE_USER })
    @PostMapping("/avatars/n/{id}")
    public ResponseEntity<Map<String, String>> namespace(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String message = avatarService.create(AvatarService.Type.N, id, file);
        return ResponseEntity.ok(Map.of("message", message));
    }

    @GetMapping("/avatars/a/{id}")
    public ResponseEntity<Resource> application(@PathVariable Integer id) throws IOException {
        Resource resource = avatarService.find(AvatarService.Type.A, id);
        return resource(resource);
    }

    @Secured({ Role.ROLE_USER })
    @PostMapping("/avatars/a/{id}")
    public ResponseEntity<Map<String, String>> application(@PathVariable Integer id, @RequestParam("file") MultipartFile file) throws IOException {
        String message = avatarService.create(AvatarService.Type.A, id, file);
        return ResponseEntity.ok(Map.of("message", message));
    }

    private ResponseEntity<Resource> resource(Resource resource) throws IOException {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofMinutes(5)).cachePublic())
                .lastModified(resource.lastModified())
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}
