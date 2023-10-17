package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.groups.inputs.CreateGroupInput;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.NamespaceResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class GroupFactory extends BaseFactory {

    @Autowired
    public GroupFactory(WebGraphQlTester graphQlTester) {
        super(graphQlTester);
    }

    public CreateGroupInput createGroupInput() {
        return createGroupInput(Faker.path(), Visibility.PRIVATE);
    }

    public CreateGroupInput createGroupInput(String path, Visibility visibility) {
        CreateGroupInput input = new CreateGroupInput();
        input.setName(path.toUpperCase());
        input.setPath(path);
        input.setDescription(path + " description");
        input.setVisibility(visibility);
        return input;
    }

    public GroupResult create(SessionResult session) {
        return create(session, createGroupInput());
    }

    public GroupResult create(SessionResult session, CreateGroupInput input) {
        return mutate("createGroup", session, input)
                .path("payload.group").entity(GroupResult.class).get();
    }

    public GroupResult create(SessionResult session, NamespaceResult parent) {
        CreateGroupInput input = createGroupInput();
        input.setParentId(parent.getId());
        return create(session, parent, input);
    }

    public GroupResult create(SessionResult session, NamespaceResult parent, CreateGroupInput input) {
        String fullName = input.getName() ;
        String fullPath = input.getPath();
        if (parent != null) {
            fullName = String.join("/", parent.getFullName(), input.getName());
            fullPath = String.join("/", parent.getFullPath(), input.getPath());
        }

        return mutate("createGroup", session, input)
                .path("payload.group.name").entity(String.class).isEqualTo(input.getName())
                .path("payload.group.path").entity(String.class).isEqualTo(input.getPath())
                .path("payload.group.fullName").entity(String.class).isEqualTo(fullName)
                .path("payload.group.fullPath").entity(String.class).isEqualTo(fullPath)
                .path("payload.group.description").entity(String.class).isEqualTo(input.getDescription())
                .path("payload.group.visibility").entity(Visibility.class).isEqualTo(input.getVisibility())
                .path("payload.group").entity(GroupResult.class).get();
    }

    public GroupResult create(SessionResult session, Visibility visibility) {
        return create(session, null, visibility);
    }

    public GroupResult create(SessionResult session, NamespaceResult parent, Visibility visibility) {
        return create(session, parent, Faker.path(), visibility);
    }

    public GroupResult create(SessionResult session, NamespaceResult parent, String path, Visibility visibility) {
        String parentId = null;
        if (parent != null) parentId = parent.getId();
        CreateGroupInput input = createGroupInput();
        input.setParentId(parentId);
        input.setName(path.toUpperCase());
        input.setPath(path);
        input.setVisibility(visibility);
        input.setDescription(path + " description");
        return create(session, input);
    }

    public void queryGroup(SessionResult session, String fullPath,GroupResult group) {
        queryGroup(session, fullPath)
                .path("group.name").entity(String.class).isEqualTo(group.getName())
                .path("group.path").entity(String.class).isEqualTo(group.getPath())
                .path("group.fullName").entity(String.class).isEqualTo(group.getFullName())
                .path("group.fullPath").entity(String.class).isEqualTo(group.getFullPath())
                .path("group.description").entity(String.class).isEqualTo(group.getDescription())
                .path("group.visibility").entity(Visibility.class).isEqualTo(group.getVisibility());
    }

    public void queryGroup(SessionResult session, String fullPath, ErrorType errorType) {
        queryGroup(session, fullPath)
                .errors()
                .expect(e -> e.getErrorType().equals(errorType));
    }

    private GraphQlTester.Response queryGroup(SessionResult session, String fullPath) {
        return query("group", session)
                .variable("fullPath", fullPath)
                .execute();
    }
}
