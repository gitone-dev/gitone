package cn.notfound.gitone.server.config;

import cn.notfound.gitone.server.config.exception.Forbidden;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.config.exception.Unauthorized;
import graphql.GraphQLError;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.web.bind.annotation.ControllerAdvice;

@ControllerAdvice
public class GlobalExceptionHandler {

    @GraphQlExceptionHandler
    public GraphQLError handle(IllegalArgumentException ex) {
        return GraphQLError.newError()
                .errorType(ErrorType.BAD_REQUEST)
                .message(ex.getMessage())
                .build();
    }

    @GraphQlExceptionHandler
    public GraphQLError handle(NotFound ex) {
        return GraphQLError.newError()
                .errorType(ErrorType.NOT_FOUND)
                .message(ex.getMessage())
                .build();
    }

    @GraphQlExceptionHandler
    public GraphQLError handle(Unauthorized ex) {
        return GraphQLError.newError()
                .errorType(ErrorType.UNAUTHORIZED)
                .message(ex.getMessage())
                .build();
    }

    @GraphQlExceptionHandler
    public GraphQLError handle(Forbidden ex) {
        return GraphQLError.newError()
                .errorType(ErrorType.FORBIDDEN)
                .message(ex.getMessage())
                .build();
    }
}
