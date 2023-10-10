package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.entities.SessionEntity;
import cn.notfound.gitone.server.results.NamespaceResult;
import cn.notfound.gitone.server.results.SessionResult;
import cn.notfound.gitone.server.results.UserResult;
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
                .header(session.getHeader(), session.getToken())
                .build()
                .documentName(documentName);
    }

    public GraphQlTester.Request<?> query(String documentName, CreateSessionInput createSessionInput) {
        SessionResult session = createSession(createSessionInput);
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
                .header(session.getHeader(), session.getToken())
                .build()
                .documentName(documentName)
                .variable("input", input)
                .execute();
    }

    public SessionResult createSession(String username, String password) {
        CreateSessionInput createSessionInput = new CreateSessionInput();
        createSessionInput.setUsername(username);
        createSessionInput.setPassword(password);
        return createSession(createSessionInput);
    }

    public SessionResult createSession(CreateSessionInput input) {
        GraphQlTester.Response response = graphQlTester
                .mutate()
                .build()
                .documentName("createSession")
                .variable("input", input)
                .execute();

        SessionEntity sessionEntity = response.path("payload.session").entity(SessionEntity.class).get();
        SessionResult session = new SessionResult();
        session.setUsername(sessionEntity.getUsername());
        session.setEmail(sessionEntity.getEmail());
        session.setHeader(sessionEntity.getHeader());
        session.setToken(sessionEntity.getToken());
        session.setActive(sessionEntity.isActive());
        session.setPassword(input.getPassword());
        return session;
    }

    public UserResult queryViewer(SessionResult session) {
        return query("viewer", session)
                .execute()
                .path("viewer").entity(UserResult.class).get();
    }

    public NamespaceResult queryNamespace(SessionResult session, String fullPath) {
        return query("namespace", session)
                .variable("fullPath", fullPath)
                .execute()
                .path("namespace").entity(NamespaceResult.class).get();
    }
}
