package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.projects.inputs.CreateProjectInput;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.NamespaceResult;
import cn.notfound.gitone.server.results.ProjectResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class ProjectFactory extends BaseFactory {

    @Autowired
    public ProjectFactory(WebGraphQlTester graphQlTester) {
        super(graphQlTester);
    }

    public CreateProjectInput createProjectInput(String parentId) {
        String path = Faker.path();

        CreateProjectInput input = new CreateProjectInput();
        input.setParentId(parentId);
        input.setName(path.toUpperCase());
        input.setPath(path);
        input.setDescription(path + " description");
        input.setVisibility(Visibility.PRIVATE);
        return input;
    }

    public ProjectResult create(SessionResult session) {
        NamespaceResult namespace = queryNamespace(session, session.getUsername());
        return create(session, namespace);
    }

    public ProjectResult create(SessionResult session, NamespaceResult namespace) {
        CreateProjectInput input = createProjectInput(namespace.getId());
        return create(session, input, namespace);
    }

    public ProjectResult create(SessionResult session, CreateProjectInput input, NamespaceResult namespace) {
        String fullName = String.join("/", namespace.getFullName(), input.getName());
        String fullPath = String.join("/", namespace.getFullPath(), input.getPath());

        return mutate("createProject", session, input)
                .path("payload.project.name").entity(String.class).isEqualTo(input.getName())
                .path("payload.project.path").entity(String.class).isEqualTo(input.getPath())
                .path("payload.project.fullName").entity(String.class).isEqualTo(fullName)
                .path("payload.project.fullPath").entity(String.class).isEqualTo(fullPath)
                .path("payload.project.description").entity(String.class).isEqualTo(input.getDescription())
                .path("payload.project.visibility").entity(Visibility.class).isEqualTo(input.getVisibility())
                .path("payload.project").entity(ProjectResult.class).get();
    }

    public void queryProject(SessionResult session, String fullPath, ErrorType errorType) {
        queryProject(session, fullPath)
                .errors()
                .expect(e -> e.getErrorType().equals(errorType));
    }

    public void queryProject(SessionResult session, String fullPath, ProjectResult result) {
        queryProject(session, fullPath)
                .path("project.id").entity(String.class).isEqualTo(result.getId())
                .path("project.name").entity(String.class).isEqualTo(result.getName())
                .path("project.path").entity(String.class).isEqualTo(result.getPath())
                .path("project.fullName").entity(String.class).isEqualTo(result.getFullName())
                .path("project.fullPath").entity(String.class).isEqualTo(result.getFullPath())
                .path("project.visibility").entity(Visibility.class).isEqualTo(result.getVisibility())
                .path("project.description").entity(String.class).isEqualTo(result.getDescription());
    }

    private GraphQlTester.Response queryProject(SessionResult session, String fullPath) {
        return query("project", session)
                .variable("fullPath", fullPath)
                .execute();
    }
}
