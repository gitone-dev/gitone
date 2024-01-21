package dev.gitone.server;

public enum OrderDirection {
    ASC,
    DESC;

    public OrderDirection reverse() {
        return switch (this) {
            case ASC -> DESC;
            case DESC -> ASC;
        };
    }
}
