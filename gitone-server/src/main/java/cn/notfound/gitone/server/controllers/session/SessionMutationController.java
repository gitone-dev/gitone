package cn.notfound.gitone.server.controllers.session;

import cn.notfound.gitone.server.controllers.session.inputs.CreateSessionInput;
import cn.notfound.gitone.server.controllers.session.payloads.CreateSessionPayload;
import cn.notfound.gitone.server.controllers.session.payloads.DeleteSessionPayload;
import cn.notfound.gitone.server.entities.SessionEntity;
import cn.notfound.gitone.server.services.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class SessionMutationController {

    private HttpServletRequest request;

    private HttpServletResponse response;

    private SessionService sessionService;

    @MutationMapping
    public CreateSessionPayload createSession(@Argument CreateSessionInput input) {
        SessionEntity sessionEntity = sessionService.create(input, request, response);
        return new CreateSessionPayload(sessionEntity);
    }

    @MutationMapping
    public DeleteSessionPayload deleteSession() {
        sessionService.delete(request, response);
        return new DeleteSessionPayload("退出登录");
    }
}
