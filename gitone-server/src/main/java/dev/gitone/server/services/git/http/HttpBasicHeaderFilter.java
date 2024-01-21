package dev.gitone.server.services.git.http;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpServletResponseWrapper;

import java.io.IOException;

public class HttpBasicHeaderFilter implements Filter {

    private static final String REALM_NAME = "GitOne";

    private static final String LIT_BASIC = "Basic ";

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        chain.doFilter(request, new Response((HttpServletResponse) response));
    }

    static class Response extends HttpServletResponseWrapper {

        private static final String WWW_AUTHENTICATE = "WWW-Authenticate";

        public Response(HttpServletResponse response) {
            super(response);
        }

        @Override
        public void sendError(int sc) throws IOException {
            status(sc);
            super.sendError(sc);
        }

        @Override
        public void sendError(int sc, String msg) throws IOException {
            status(sc);
            super.sendError(sc, msg);
        }

        private void status(int sc) {
            if (sc == SC_UNAUTHORIZED) {
                String sb = LIT_BASIC +
                        "realm=\"" + REALM_NAME + "\"";
                setHeader(WWW_AUTHENTICATE, sb);
            } else if (containsHeader(WWW_AUTHENTICATE)) {
                setHeader(WWW_AUTHENTICATE, null);
            }
        }
    }
}
