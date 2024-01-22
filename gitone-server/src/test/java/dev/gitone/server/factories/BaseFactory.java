package dev.gitone.server.factories;

import dev.gitone.server.results.NamespaceResult;
import dev.gitone.server.results.SessionResult;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

public class BaseFactory {

    private final WebGraphQlTester graphQlTester;

    public BaseFactory(WebGraphQlTester graphQlTester) {
        this.graphQlTester = graphQlTester;
    }

    public GraphQlTester.Request<?> query(String documentName) {
        return graphQlTester
                .documentName(documentName);
    }

    public GraphQlTester.Request<?> query(String documentName, SessionResult session) {
        if (session == null) return query(documentName);

        return graphQlTester
                .mutate()
                .headers(headers -> headers.setBasicAuth(session.getUsername(), session.getPassword()))
                .build()
                .documentName(documentName);
    }

    public GraphQlTester.Request<?> query(String documentName, LoginInput loginInput) {
        SessionResult session = createSession(loginInput);
        return query(documentName, session);
    }

    public GraphQlTester.Response mutate(String documentName, Object input) {
        return graphQlTester
                .documentName(documentName)
                .variable("input", input)
                .execute();
    }

    public GraphQlTester.Response mutate(String documentName, SessionResult session, Object input) {
        if (session == null) return mutate(documentName, input);

        return graphQlTester
                .mutate()
                .headers(headers -> headers.setBasicAuth(session.getUsername(), session.getPassword()))
                .build()
                .documentName(documentName)
                .variable("input", input)
                .execute();
    }

    public SessionResult createSession(LoginInput input) {
        SessionResult sessionResult = new SessionResult();
        sessionResult.setUsername(input.getUsername());
        sessionResult.setPassword(input.getPassword());
        return sessionResult;
    }

    public NamespaceResult queryNamespace(SessionResult session, String fullPath) {
        return query("namespace", session)
                .variable("fullPath", fullPath)
                .execute()
                .path("namespace").entity(NamespaceResult.class).get();
    }
}
