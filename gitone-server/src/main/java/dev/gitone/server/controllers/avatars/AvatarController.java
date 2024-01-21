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

    @GetMapping("/avatars/u/{userId}")
    public ResponseEntity<Resource> show(@PathVariable Integer userId) throws IOException {
        Resource resource = avatarService.find(userId);

        return ResponseEntity.ok()
                .cacheControl(CacheControl.maxAge(Duration.ofMinutes(5)).cachePublic())
                .lastModified(resource.lastModified())
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }

    @Secured({ Role.ROLE_USER })
    @PostMapping("/avatars/u")
    public ResponseEntity<Map<String, String>> create(@RequestParam("file") MultipartFile file) throws IOException {
        String message = avatarService.create(file);
        return ResponseEntity.ok(Map.of("message", message));
    }
}
