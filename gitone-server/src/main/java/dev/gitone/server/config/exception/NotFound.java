package dev.gitone.server.config.exception;

import org.springframework.lang.Nullable;

public class NotFound extends RuntimeException {

    public NotFound(String message) {
        super(message);
    }

    public static void isTrue(boolean expression, String message) {
        if (!expression) {
            throw new NotFound(message);
        }
    }

    public static void notNull(@Nullable Object object, String message) {
        if (object == null) {
            throw new NotFound(message);
        }
    }
}
