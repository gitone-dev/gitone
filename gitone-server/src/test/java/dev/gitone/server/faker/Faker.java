package dev.gitone.server.faker;

import java.util.Random;

public class Faker {

    public static String username() {
        return new Random()
                .ints(97, 122)
                .limit(10)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();
    }

    public static String email() {
        return String.format("%s@example", username());
    }

    public static String path() {
        return username();
    }
}
