package cn.notfound.gitone.server.models;

import cn.notfound.gitone.server.entities.Role;
import cn.notfound.gitone.server.entities.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public class CustomUserDetails implements UserDetails, OAuth2User {

    private final Integer id;

    private final String name;

    private final String username;

    private final String password;

    private final Boolean enabled;

    private final List<GrantedAuthority> authorities;

    public CustomUserDetails(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.name = userEntity.getName();
        this.username = userEntity.getUsername();
        this.password = userEntity.getPassword();
        this.enabled = userEntity.getActive();
        if (userEntity.getRole().equals(Role.ADMIN)) {
            authorities = AuthorityUtils.createAuthorityList(Role.ROLE_USER, Role.ROLE_ADMIN);
        } else {
            authorities = AuthorityUtils.createAuthorityList(Role.ROLE_USER);
        }
    }

    public Integer getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return Map.of();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
