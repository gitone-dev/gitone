package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.controllers.projects.inputs.*;
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
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();

        // user namespace
        NamespaceResult namespace1 = queryNamespace(session1, session1.getUsername());
        CreateProjectInput input = projectFactory.createProjectInput(namespace1.getId());
        mutationCreateProject(null, input, ErrorType.UNAUTHORIZED);
        mutationCreateProject(session2, input, ErrorType.FORBIDDEN);
        ProjectResult project1 = projectFactory.create(session1, input, namespace1);
        queryProjectMembers(session1, project1);
        mutationCreateProject(session1, input, ErrorType.INTERNAL_ERROR);

        // group
        GroupResult group = groupFactory.create(session2);
        input = projectFactory.createProjectInput(group.getId());
        ProjectResult project2 = projectFactory.create(session2, input, group);
        queryProjectMembers(session2, project2);
    }

    @Test
    void deleteProject() {
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();

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
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();
        UserResult user1 = userFactory.queryViewer(session1);

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
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();
        UserResult user1 = userFactory.queryViewer(session1);

        // user namespace

        ProjectResult project1 = projectFactory.create(session1);
        UpdateProjectPathInput input = new UpdateProjectPathInput();
        input.setId(project1.getId());
        input.setPath("project1");
        project1.setPath(input.getPath());
        project1.setFullPath(String.join("/", user1.getUsername(), input.getPath()));
        mutationUpdateProjectPath(session1, input, project1);
        mutationUpdateProjectPath(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateProjectPath(session2, input, ErrorType.FORBIDDEN);

        // group

        GroupResult group = groupFactory.create(session1);
        ProjectResult project2 = projectFactory.create(session1, group);
        input.setId(project2.getId());
        input.setPath("project2");
        project2.setPath(input.getPath());
        project2.setFullPath(String.join("/", group.getFullPath(), input.getPath()));
        mutationUpdateProjectPath(session1, input, project2);
        mutationUpdateProjectPath(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateProjectPath(session2, input, ErrorType.FORBIDDEN);
    }

    @Test
    void updateProjectVisibility() {
        SessionResult session1 = userFactory.viewer();
        SessionResult session2 = userFactory.viewer();

        // user namespace

        ProjectResult project1 = projectFactory.create(session1);
        UpdateProjectVisibilityInput input = new UpdateProjectVisibilityInput();
        input.setId(project1.getId());
        input.setVisibility(Visibility.PUBLIC);
        project1.setVisibility(input.getVisibility());
        mutationUpdateProjectVisibility(session1, input, project1);
        mutationUpdateProjectVisibility(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateProjectVisibility(session2, input, ErrorType.FORBIDDEN);

        // group public

        GroupResult group = groupFactory.create(session1, Visibility.PUBLIC);
        ProjectResult project2 = projectFactory.create(session1, group);
        input.setId(project2.getId());
        input.setVisibility(Visibility.PUBLIC);
        project2.setVisibility(input.getVisibility());
        mutationUpdateProjectVisibility(session1, input, project2);
        mutationUpdateProjectVisibility(null, input, ErrorType.UNAUTHORIZED);
        mutationUpdateProjectVisibility(session2, input, ErrorType.FORBIDDEN);

        // group private

        GroupResult group2 = groupFactory.create(session1, Visibility.PRIVATE);
        ProjectResult project3 = projectFactory.create(session1, group2);
        input.setId(project3.getId());
        input.setVisibility(Visibility.PUBLIC);
        mutationUpdateProjectVisibility(session1, input, ErrorType.BAD_REQUEST);
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

    private void mutationUpdateProjectPath(SessionResult session, UpdateProjectPathInput input, ErrorType errorType) {
        mutate("updateProjectPath", session, input)
                .errors()
                .expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateProjectPath(SessionResult session, UpdateProjectPathInput input, ProjectResult result) {
        GraphQlTester.Response response = mutate("updateProjectPath", session, input);
        projectResponse(response, result);
    }

    private void mutationUpdateProjectVisibility(SessionResult session, UpdateProjectVisibilityInput input, ErrorType errorType) {
        mutate("updateProjectVisibility", session, input)
                .errors()
                .expect(e -> e.getErrorType().equals(errorType));
    }

    private void mutationUpdateProjectVisibility(SessionResult session, UpdateProjectVisibilityInput input, ProjectResult result) {
        GraphQlTester.Response response = mutate("updateProjectVisibility", session, input);
        projectResponse(response, result);
    }

    private void queryProjectMembers(SessionResult session, ProjectResult project) {
        query("projectMembers", session)
                .variable("fullPath", project.getFullPath()).variable("first", 10)
                .execute()
                .path("project.members.edges").entityList(Object.class).hasSize(1)
                .path("project.members.edges[0].node.access").entity(Access.class).isEqualTo(Access.OWNER)
                .path("project.members.edges[0].node.user.username").entity(String.class).isEqualTo(session.getUsername());
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
