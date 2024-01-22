package dev.gitone.server.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.web.RedirectStrategy;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

public class CustomRedirectStrategy implements RedirectStrategy {

    @Override
    public void sendRedirect(HttpServletRequest request, HttpServletResponse response, String url) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Type", "application/json");

        Map<String, String> body = new LinkedHashMap<>();
        body.put("url", url);
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(), body);
        response.getWriter().flush();
    }
}
