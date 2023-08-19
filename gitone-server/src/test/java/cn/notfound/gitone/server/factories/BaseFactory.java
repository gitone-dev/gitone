package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.entities.SessionEntity;
import cn.notfound.gitone.server.results.SessionResult;
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

    public GraphQlTester.Request<?> query(String documentName, CreateSessionInput createSessionInput) {
        SessionResult session = createSession(createSessionInput);
        return query(documentName, session);
    }

    public GraphQlTester.Request<?> query(String documentName, SessionResult session) {
        return graphQlTester
                .mutate()
                .header(session.getHeader(), session.getToken())
                .build()
                .documentName(documentName);
    }

    public GraphQlTester.Response mutate(String documentName, SessionResult session, Object input) {
        return graphQlTester
                .mutate()
                .header(session.getHeader(), session.getToken())
                .build()
                .documentName(documentName)
                .variable("input", input)
                .execute();
    }

    public GraphQlTester.Response mutate(String documentName, Object input) {
        return graphQlTester
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
        return session;
    }
}
