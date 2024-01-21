package dev.gitone.server.jobs;

import dev.gitone.server.config.JmsConfig;
import dev.gitone.server.mailers.UserMailSender;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class UserMailJob {

    public static final String DESTINATION = "USER_EMAIL";

    private final JmsTemplate jmsTemplate;

    private final UserMailSender userMailSender;

    public void enqueue(Input input) {
        jmsTemplate.convertAndSend(UserMailJob.DESTINATION, input);
    }

    @JmsListener(containerFactory = JmsConfig.CONTAINER_FACTORY, destination = DESTINATION)
    public void dequeue(Input input) throws Exception {
        switch (input.type) {
            case CREATE_USER -> userMailSender.createUser(input.getEmail(), input.getToken());
            case RESET_PASSWORD -> userMailSender.resetPassword(input.getEmail(), input.getToken());
            case CREATE_EMAIL -> userMailSender.createEmail(input.getEmail(), input.getToken());
            default -> throw new IllegalArgumentException("job type 不合规");
        }
    }

    public enum Type {
        CREATE_USER,
        RESET_PASSWORD,
        CREATE_EMAIL,
    }

    @Data
    public static class Input {

        private Type type;

        private Integer userId;

        private String username;

        private String email;

        private String token;
    }
}
