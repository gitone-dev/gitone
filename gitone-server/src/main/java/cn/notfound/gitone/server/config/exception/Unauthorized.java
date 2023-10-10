package cn.notfound.gitone.server.config.exception;

public class Unauthorized extends RuntimeException {
    public Unauthorized(String message) {
        super(message);
    }

    public static void isTrue(boolean expression, String message) {
        if (!expression) {
            throw new Unauthorized(message);
        }
    }
}
