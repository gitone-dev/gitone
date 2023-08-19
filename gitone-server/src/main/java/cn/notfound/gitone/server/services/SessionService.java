package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.daos.UserDao;
import cn.notfound.gitone.server.entities.SessionEntity;
import cn.notfound.gitone.server.entities.UserEntity;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class SessionService extends BaseService {

    public static final String ACTIVATE_USER_KEY = "GITONE_ACTIVATE_USER_KEY";

    private static final String HEADER_X_AUTH_TOKEN = "X-Auth-Token";

    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();

    private SecurityContextRepository securityContextRepository;

    private DaoAuthenticationProvider authenticationProvider;

    private UserDao userDao;

    private PasswordEncoder passwordEncoder;

    /* 修改自 AbstractAuthenticationProcessingFilter.java UsernamePasswordAuthenticationFilter.java */
    public SessionEntity create(CreateSessionInput input, HttpServletRequest request, HttpServletResponse response) {
        SessionEntity sessionEntity = new SessionEntity();
        sessionEntity.setUsername(input.getUsername());
        sessionEntity.setActive(true);

        UsernamePasswordAuthenticationToken authRequest = input.authenticationToken();
        try {
            Authentication authResult = authenticationProvider.authenticate(authRequest);

            SecurityContext context = securityContextHolderStrategy.createEmptyContext();
            context.setAuthentication(authResult);
            securityContextHolderStrategy.setContext(context);
            securityContextRepository.saveContext(context, request, response);
        } catch (DisabledException e) {
            UserEntity userEntity = userDao.findByUsername(input.getUsername());
            if (!passwordEncoder.matches(input.getPassword(), userEntity.getPassword())) {
                throw new BadCredentialsException(e.getMessage());
            }

            request.getSession(true).setAttribute(ACTIVATE_USER_KEY, userEntity.getId());
            sessionEntity.setEmail(userEntity.getEmail());
            sessionEntity.setActive(false);
        }

        sessionEntity.setHeader(HEADER_X_AUTH_TOKEN);
        sessionEntity.setToken(request.getSession(true).getId());
        return sessionEntity;
    }

    /* 修改自 SecurityContextLogoutHandler.java */
    public void delete(HttpServletRequest request, HttpServletResponse response) {
        HttpSession httpSession = request.getSession(false);
        if (httpSession != null) {
            httpSession.invalidate();
        }

        SecurityContext context = securityContextHolderStrategy.getContext();
        securityContextHolderStrategy.clearContext();;
        context.setAuthentication(null);
        SecurityContext emptyContext = securityContextHolderStrategy.createEmptyContext();
        securityContextRepository.saveContext(emptyContext, request, response);
    }
}
