package cn.notfound.gitone.server.config.exception;

import org.springframework.lang.Nullable;

public class Forbidden extends RuntimeException {

    public Forbidden(String message) {
        super(message);
    }

    public static void isTrue(boolean expression, String message) {
        if (!expression) {
            throw new Forbidden(message);
        }
    }

    public static void notNull(@Nullable Object object, String message) {
        if (object == null) {
            throw new Forbidden(message);
        }
    }
}
