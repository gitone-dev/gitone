package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.controllers.namespaces.inputs.UpdatePathInput;
import cn.notfound.gitone.server.controllers.projects.inputs.CreateProjectInput;
import cn.notfound.gitone.server.controllers.projects.inputs.DeleteProjectInput;
import cn.notfound.gitone.server.controllers.projects.inputs.UpdateProjectInput;
import cn.notfound.gitone.server.entities.Access;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.factories.BaseFactory;
import cn.notfound.gitone.server.factories.GroupFactory;
import cn.notfound.gitone.server.factories.ProjectFactory;
import cn.notfound.gitone.server.factories.UserFactory;
import cn.notfound.gitone.server.results.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class ProjectMutationControllerTest extends BaseFactory {

    private final UserFactory userFactory;

    private final GroupFactory groupFactory;

    private final ProjectFactory projectFactory;

    @Autowired
    public ProjectMutationControllerTest(
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
    void createProject() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        // user namespace
        NamespaceResult namespace1 = queryNamespace(session1, session1.getUsername());
        CreateProjectInput input = projectFactory.createProjectInput(namespace1.getId());
        mutationCreateProject(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateProject(session2, input, ErrorType.FORBIDDEN);
        ProjectResult project1 = projectFactory.create(session1, input, namespace1);
        queryMembers(session1, project1.getFullPath());
        mutationCreateProject(session1, input, ErrorType.INTERNAL_ERROR);

        // group
        GroupResult group = groupFactory.create(session2);
        input = projectFactory.createProjectInput(group.getId());
        ProjectResult project2 = projectFactory.create(session2, input, group);
        queryMembers(session2, project2.getFullPath());
    }

    @Test
    void deleteProject() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();

        // user namespace
        ProjectResult project1 = projectFactory.create(session1);
        mutationDeleteProject(null, project1, ErrorType.UNAUTHORIZED);
        mutationDeleteProject(session2, project1, ErrorType.FORBIDDEN);
        mutationDeleteProject(session1, project1, null);
        mutationDeleteProject(session1, project1, ErrorType.NOT_FOUND);

        // group
        GroupResult group = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group);
        mutationDeleteProject(null, project2, ErrorType.UNAUTHORIZED);
        mutationDeleteProject(session2, project2, ErrorType.FORBIDDEN);
        mutationDeleteProject(session1, project2, null);
        mutationDeleteProject(session1, project2, ErrorType.NOT_FOUND);
    }

    @Test
    void updateProject() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user1 = userFactory.viewer(session1);

        // user namespace

        ProjectResult project1 = projectFactory.create(session1);
        UpdateProjectInput input = new UpdateProjectInput();
        input.setId(project1.getId());
        input.setName("project1");
        input.setDescription(input.getName() + " description");
        project1.setName(input.getName());
        project1.setFullName(String.join("/", user1.getName(), input.getName()));
        project1.setDescription(input.getDescription());
        mutationUpdateProject(session1, input, project1);
        mutationUpdateProject(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateProject(session2, input, ErrorType.FORBIDDEN);

        // group

        GroupResult group = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group);
        input = new UpdateProjectInput();
        input.setId(project2.getId());
        input.setName("project2");
        input.setDescription(input.getName() + " description");
        project2.setName(input.getName());
        project2.setFullName(String.join("/", group.getFullName(), input.getName()));
        project2.setDescription(input.getDescription());
        mutationUpdateProject(session1, input, project2);
        mutationUpdateProject(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateProject(session2, input, ErrorType.FORBIDDEN);
    }

    @Test
    void updateProjectPath() {
        SessionResult session1 = userFactory.session();
        SessionResult session2 = userFactory.session();
        UserResult user1 = userFactory.viewer(session1);

        // user namespace

        ProjectResult project1 = projectFactory.create(session1);
        UpdatePathInput input = new UpdatePathInput();
        input.setFullPath(project1.getFullPath());
        input.setPath("project1");
        project1.setPath(input.getPath());
        project1.setFullPath(String.join("/", user1.getUsername(), input.getPath()));
        mutationUpdatePath(session1, input, project1, null);
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        input.setFullPath(project1.getFullPath());
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);

        // group

        GroupResult group = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group);
        input.setFullPath(project2.getFullPath());
        input.setPath("project2");
        project2.setPath(input.getPath());
        project2.setFullPath(String.join("/", group.getFullPath(), input.getPath()));
        mutationUpdatePath(session1, input, project2, null);
        mutationUpdatePath(null, input, null, ErrorType.UNAUTHORIZED);
        input.setFullPath(project2.getFullPath());
        mutationUpdatePath(session2, input, null, ErrorType.FORBIDDEN);
    }

    private void mutationCreateProject(SessionResult session, CreateProjectInput input, ErrorType errorType) {
        mutate("createProject", session, input)
                .errors()
                .expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateProject(SessionResult session, UpdateProjectInput input, ErrorType errorType) {
        mutate("updateProject", session, input)
                .errors()
                .expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateProject(SessionResult session, UpdateProjectInput input, ProjectResult result) {
        GraphQlTester.Response response = mutate("updateProject", session, input);
        projectResponse(response, result);
    }

    private void mutationUpdatePath(SessionResult session, UpdatePathInput input, ProjectResult result, ErrorType errorType) {
        GraphQlTester.Response response = mutate("updatePath", session, input);
        if (errorType != null) {
            response.errors()
                    .expect(e -> e.getErrorType().equals(errorType));
            return;
        }

        response.path("payload.namespace.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.namespace.name").entity(String.class).isEqualTo(result.getName())
                .path("payload.namespace.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("payload.namespace.path").entity(String.class).isEqualTo(result.getPath())
                .path("payload.namespace.fullPath").entity(String.class).isEqualTo(result.getFullPath())
                .path("payload.namespace.visibility").entity(Visibility.class).isEqualTo(result.getVisibility())
                .path("payload.namespace.description").entity(String.class).isEqualTo(result.getDescription());
    }

    private void queryMembers(SessionResult session, String fullPath) {
        query("members", session)
                .variable("fullPath", fullPath).variable("first", 10)
                .execute()
                .path("members.edges").entityList(Object.class).hasSize(1)
                .path("members.edges[0].node.access").entity(Access.class).isEqualTo(Access.OWNER)
                .path("members.edges[0].node.user.username").entity(String.class).isEqualTo(session.getUsername());
    }

    private void mutationDeleteProject(SessionResult session, ProjectResult project, ErrorType errorType) {
        DeleteProjectInput input = new DeleteProjectInput();
        input.setId(project.getId());

        GraphQlTester.Response response = mutate("deleteProject", session, input);
        if (errorType != null) {
            response.errors().expect(e -> e.getErrorType().equals(errorType));
            return;
        }
        response.path("payload.project.id").entity(String.class).isEqualTo(project.getId());
    }

    private void projectResponse(GraphQlTester.Response response, ProjectResult result) {
        response.path("payload.project.id").entity(String.class).isEqualTo(result.getId())
                .path("payload.project.name").entity(String.class).isEqualTo(result.getName())
                .path("payload.project.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("payload.project.path").entity(String.class).isEqualTo(result.getPath())
                .path("payload.project.fullPath").entity(String.class).isEqualTo(result.getFullPath())
                .path("payload.project.visibility").entity(Visibility.class).isEqualTo(result.getVisibility())
                .path("payload.project.description").entity(String.class).isEqualTo(result.getDescription());
    }
}
