package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.projects.inputs.CreateProjectInput;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.NamespaceResult;
import cn.notfound.gitone.server.results.ProjectResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class ProjectFactory extends BaseFactory {

    @Autowired
    public ProjectFactory(WebGraphQlTester graphQlTester) {
        super(graphQlTester);
    }

    public CreateProjectInput createProjectInput(String parentId) {
        return createProjectInput(parentId, Faker.path(), Visibility.PRIVATE);
    }

    private CreateProjectInput createProjectInput(String parentId, String path, Visibility visibility) {
        CreateProjectInput input = new CreateProjectInput();
        input.setParentId(parentId);
        input.setName(path.toUpperCase());
        input.setPath(path);
        input.setDescription(path + " description");
        input.setVisibility(visibility);
        return input;
    }

    public ProjectResult create(SessionResult session) {
        NamespaceResult namespace = queryNamespace(session, session.getUsername());
        return create(session, namespace);
    }

    public ProjectResult create(SessionResult session, NamespaceResult namespace) {
        return create(session, namespace, Faker.path(), Visibility.PRIVATE);
    }

    public ProjectResult create(SessionResult session, NamespaceResult namespace, String path, Visibility visibility) {
        CreateProjectInput input = createProjectInput(namespace.getId(), path, visibility);
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
}
