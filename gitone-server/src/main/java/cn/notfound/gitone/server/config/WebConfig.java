package cn.notfound.gitone.server.config;

import cn.notfound.gitone.server.services.git.http.HttpBasicHeaderFilter;
import cn.notfound.gitone.server.services.git.http.HttpGitServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private HttpGitServlet httpGitServlet;

    @Bean
    public FilterRegistrationBean<HttpBasicHeaderFilter> httpBasicHeaderFilterFilterBean() {
        FilterRegistrationBean<HttpBasicHeaderFilter> registration = new FilterRegistrationBean<>();
        registration.setFilter(new HttpBasicHeaderFilter());
        registration.setName("httpBasicHeaderFilter");
        registration.setUrlPatterns(List.of("/git/*"));
        return registration;
    }

    @Bean
    public ServletRegistrationBean<HttpGitServlet> httpGitServletServletBean() {
        ServletRegistrationBean<HttpGitServlet> registration = new ServletRegistrationBean<>();
        registration.setServlet(httpGitServlet);
        registration.setName("httpGitServlet");
        registration.setUrlMappings(List.of("/git/*"));
        return registration;
    }
}
