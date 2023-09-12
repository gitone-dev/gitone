package cn.notfound.gitone.server.factories;

import cn.notfound.gitone.server.controllers.groups.inputs.CreateGroupInput;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.faker.Faker;
import cn.notfound.gitone.server.results.GroupResult;
import cn.notfound.gitone.server.results.SessionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.WebGraphQlTester;
import org.springframework.stereotype.Component;

@Component
public class GroupFactory extends BaseFactory {

    @Autowired
    public GroupFactory(WebGraphQlTester graphQlTester) {
        super(graphQlTester);
    }

    public CreateGroupInput createGroupInput() {
        String path = Faker.path();

        CreateGroupInput input = new CreateGroupInput();
        input.setName(path.toUpperCase());
        input.setPath(path);
        input.setDescription(path + " description");
        input.setVisibility(Visibility.PRIVATE);
        return input;
    }

    public GroupResult create(SessionResult session) {
        return create(session, createGroupInput());
    }

    public GroupResult create(SessionResult session, Visibility visibility) {
        CreateGroupInput createGroupInput = createGroupInput();
        createGroupInput.setVisibility(visibility);
        return create(session, createGroupInput);
    }

    public GroupResult create(SessionResult session, CreateGroupInput input) {
        return mutate("createGroup", session, input)
                .path("payload.group").entity(GroupResult.class).get();
    }
}
