package dev.gitone.server.config.exception;

import org.springframework.lang.Nullable;

public class Unauthorized extends RuntimeException {

    public Unauthorized(String message) {
        super(message);
    }

    public static void isTrue(boolean expression, String message) {
        if (!expression) {
            throw new Unauthorized(message);
        }
    }

    public static void notNull(@Nullable Object object, String message) {
        if (object == null) {
            throw new Unauthorized(message);
        }
    }
}
