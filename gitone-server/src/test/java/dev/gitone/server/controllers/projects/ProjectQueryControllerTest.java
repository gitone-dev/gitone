package dev.gitone.server.controllers.projects;

import dev.gitone.server.entities.Access;
import dev.gitone.server.entities.Visibility;
import dev.gitone.server.factories.BaseFactory;
import dev.gitone.server.factories.GroupFactory;
import dev.gitone.server.factories.ProjectFactory;
import dev.gitone.server.factories.UserFactory;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import dev.gitone.server.results.GroupResult;
import dev.gitone.server.results.ProjectResult;
import dev.gitone.server.results.SessionResult;
import dev.gitone.server.results.UserResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import java.util.Set;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class ProjectQueryControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    @Autowired
    public ProjectQueryControllerTest(
            WebGraphQlTester graphQlTester,
            UserFactory userFactory,
            GroupFactory groupFactory,
            ProjectFactory projectFactory) {

        super(graphQlTester);
        this.userFactory = userFactory;
        this.groupFactory = groupFactory;
        this.projectFactory = projectFactory;
    }

    @Test
    void project() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user = userFactory.viewer(session1);

        // user namespace
        ProjectResult project1 = projectFactory.create(session1, user.namespace());
        queryProject(session1, project1.getFullPath(), project1, null);
        queryProject(session2, project1.getFullPath(), null, ErrorType.FORBIDDEN);
        queryProject(null, project1.getFullPath(), null, ErrorType.UNAUTHORIZED);

        // group namespace
        GroupResult group1 = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group1);
        queryProject(session1, project2.getFullPath(), project2, null);
        queryProject(session2, project2.getFullPath(), null, ErrorType.FORBIDDEN);
        queryProject(null, project2.getFullPath(), null, ErrorType.UNAUTHORIZED);

        GroupResult group2 = groupFactory.create(session1, group1);
        ProjectResult project3 = projectFactory.create(session1, group2);
        queryProject(session1, project3.getFullPath(), project3, null);
        queryProject(session2, project3.getFullPath(), null, ErrorType.FORBIDDEN);
        queryProject(null, project3.getFullPath(), null, ErrorType.UNAUTHORIZED);
    }

    @Test
    void projects() {
    }

    @Test
    void projectPolicy() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user = userFactory.viewer(session1);

        // user namespace
        ProjectResult project1 = projectFactory.create(session1, user.namespace());
        queryNamespacePolicy(null, project1.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session2, project1.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session1, project1.getFullPath(), Access.OWNER);

        // group namespace
        GroupResult group1 = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group1);
        queryNamespacePolicy(null, project2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session2, project2.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session1, project2.getFullPath(), Access.OWNER);

        GroupResult group2 = groupFactory.create(session1, group1);
        ProjectResult project3 = projectFactory.create(session1, group2);
        queryNamespacePolicy(null, project3.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session2, project3.getFullPath(), Access.NO_ACCESS);
        queryNamespacePolicy(session1, project3.getFullPath(), Access.OWNER);
    }

    public void queryProject(SessionResult session, String fullPath, ProjectResult result, ErrorType errorType) {
        GraphQlTester.Response response = query("project", session)
                .variable("fullPath", fullPath)
                .execute();
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("project.id").entity(String.class).isEqualTo(result.getId())
                .path("project.name").entity(String.class).isEqualTo(result.getName())
                .path("project.path").entity(String.class).isEqualTo(result.getPath())
                .path("project.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("project.fullPath").entity(String.class).isEqualTo(result.getFullPath())
                .path("project.visibility").entity(Visibility.class).isEqualTo(result.getVisibility())
                .path("project.description").entity(String.class).isEqualTo(result.getDescription());
    }

    private void queryNamespacePolicy(SessionResult session, String fullPath, Access access) {
        GraphQlTester.Response response = query("namespacePolicy", session)
                .variable("fullPath", fullPath)
                .execute();
        response.path("namespacePolicy.access").entity(Access.class).isEqualTo(access);

        Set<Action> actions = NamespacePolicy.forAccess(access);
        GraphQlTester.EntityList<Action> entityList = response.path("namespacePolicy.actions").entityList(Action.class);
        entityList.hasSize(actions.size());
        for (Action action : actions) {
            entityList.contains(action);
        }
    }
}
