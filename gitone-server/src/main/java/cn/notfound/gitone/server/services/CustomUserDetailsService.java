package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.daos.UserDetailDao;
import cn.notfound.gitone.server.entities.UserDetailEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import cn.notfound.gitone.server.models.CustomUserDetails;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
        return new CustomUserDetails(userEntity, userDetailEntity);
    }
}
