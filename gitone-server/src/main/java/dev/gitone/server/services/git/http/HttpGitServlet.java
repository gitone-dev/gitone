package dev.gitone.server.services.git.http;

import dev.gitone.jgit.http.server.GitServlet;
import jakarta.servlet.ServletConfig;
import jakarta.servlet.ServletException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class HttpGitServlet extends GitServlet {

    private final HttpRepositoryResolver repositoryResolver;

    private final HttpUploadPackFactory uploadPackFactory;

    private final HttpReceivePackFactory receivePackFactory;

    @Override
    public void init(ServletConfig config) throws ServletException {

        setRepositoryResolver(repositoryResolver);
        setUploadPackFactory(uploadPackFactory);
        setReceivePackFactory(receivePackFactory);

        super.init(config);
    }
}
