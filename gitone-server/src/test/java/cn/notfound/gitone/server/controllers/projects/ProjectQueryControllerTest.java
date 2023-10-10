package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.ProjectFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.NamespaceResult;
import cn.notfound.gitone.server.results.ProjectResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.WebGraphQlTester;

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
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();

        // user namespace
        NamespaceResult namespace1 = queryNamespace(session1, session1.getUsername());
        ProjectResult project1 = projectFactory.create(session1, namespace1);
        projectFactory.queryProject(session1, project1.getFullPath(), project1);
        projectFactory.queryProject(session2, project1.getFullPath(), ErrorType.FORBIDDEN);
        projectFactory.queryProject(null, project1.getFullPath(), ErrorType.UNAUTHORIZED);

        // group namespace
        GroupResult group = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group);
        projectFactory.queryProject(session1, project2.getFullPath(), project2);
        projectFactory.queryProject(session2, project2.getFullPath(), ErrorType.FORBIDDEN);
        projectFactory.queryProject(null, project2.getFullPath(), ErrorType.UNAUTHORIZED);
    }

    @Test
    void projects() {
    }

    @Test
    void projectPolicy() {
    }
}
