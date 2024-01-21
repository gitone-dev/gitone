package dev.gitone.server.controllers.session.inputs;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@Data
public class CreateSessionInput {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    public UsernamePasswordAuthenticationToken authenticationToken() {
        return new UsernamePasswordAuthenticationToken(username, password);
    }
}
