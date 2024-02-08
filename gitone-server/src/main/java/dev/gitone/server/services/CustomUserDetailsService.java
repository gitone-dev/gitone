package dev.gitone.server.services;

import dev.gitone.server.daos.UserDao;
import dev.gitone.server.daos.UserDetailDao;
import dev.gitone.server.entities.Role;
import dev.gitone.server.entities.UserDetailEntity;
import dev.gitone.server.entities.UserEntity;
import dev.gitone.server.models.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserDao userDao;

    private UserDetailDao userDetailDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserEntity userEntity = userDao.findByUsername(username);
        if (userEntity == null) {
            throw new UsernameNotFoundException(username);
        }
        UserDetailEntity userDetailEntity = userDetailDao.find(userEntity.getId());

        List<GrantedAuthority> authorities;
        if (userDetailEntity.getRole().equals(Role.ADMIN)) {
            authorities = AuthorityUtils.createAuthorityList(Role.ROLE_USER, Role.ROLE_ADMIN);
        } else {
            authorities = AuthorityUtils.createAuthorityList(Role.ROLE_USER);
        }
        CustomUserDetails userDetails = new CustomUserDetails(
                userEntity.getFullPath(),
                userDetailEntity.getPassword(),
                userDetailEntity.getActive(),
                true,
                true,
                true,
                authorities
        );
        userDetails.setId(userEntity.getId());
        userDetails.setName(userEntity.getName());
        userDetails.setEmail(userDetailEntity.getEmail());
        return userDetails;
    }
}
