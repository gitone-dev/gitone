package cn.notfound.gitone.server.jobs;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class UserMailJobTest {

    @Autowired
    private UserMailJob userMailJob;

    @Test
    void enqueue() {
        UserMailJob.Input input = new UserMailJob.Input();
        input.setUserId(1);
        input.setEmail("test@example.com");
        input.setType(UserMailJob.Type.CREATE_USER);
        input.setToken("EMAIL_TOKEN");

        assertDoesNotThrow(() ->
                userMailJob.enqueue(input)
        );
    }
}
