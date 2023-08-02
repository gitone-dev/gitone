package cn.notfound.gitone.server.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.WebGraphQlTester;

import static org.junit.jupiter.api.Assertions.*;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class PingControllerTest {

    @Autowired
    private WebGraphQlTester graphQlTester;

    @Test
    void ping() {
        graphQlTester
                .mutate()
                .build()
                .documentName("ping")
                .execute()
                .path("ping").entity(String.class).isEqualTo("pong");
    }
}
