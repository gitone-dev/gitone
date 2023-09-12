package cn.notfound.gitone.server;

import cn.notfound.gitone.server.models.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public abstract class ViewerContext {

    private Authentication authentication () {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public boolean isAuthenticated() {
        return authentication().getPrincipal() instanceof CustomUserDetails;
    }

    public CustomUserDetails userDetails() {
        return (CustomUserDetails) authentication().getPrincipal();
    }

    public Integer viewerId() {
        if (isAuthenticated()) {
            return userDetails().getId();
        } else {
            return null;
        }
    }
}
