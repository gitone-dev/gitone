package cn.notfound.gitone.server.mailers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class UserMailSenderTest {

    @Autowired
    private UserMailSender userMailSender;

    @Test
    void createUser() {
        assertDoesNotThrow(() ->
                userMailSender.createUser("test@example.com", "EMAIL_TOKEN"));
    }

    @Test
    void resetPassword() {
        assertDoesNotThrow(() ->
                userMailSender.resetPassword("test@example.com", "EMAIL_TOKEN"));
    }
}
