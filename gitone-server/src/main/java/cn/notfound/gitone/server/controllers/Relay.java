package cn.notfound.gitone.server.controllers;

import org.springframework.util.Assert;

public class Relay {

    public static final String PREFIX = "id:gitone";

    public static <ID> String toGlobalId(String type, ID id) {
        return String.join("/", PREFIX, type, id.toString());
    }

    public static ResolvedGlobalId fromGlobalId(String globalId) {
        String[] split = globalId.split("/");
        Assert.isTrue(split.length == 3, String.format("expecting a valid global id, got %s", globalId));
        Assert.isTrue(split[0].equals(PREFIX), String.format("expecting a valid global id, got %s", globalId));

        return new ResolvedGlobalId(split[1], Integer.valueOf(split[2]));
    }

    public static ResolvedGlobalId fromGlobalId(String type, String globalId) {
        ResolvedGlobalId id = fromGlobalId(globalId);
        Assert.isTrue(id.type().equals(type), String.format("expecting a valid global id, got %s", globalId));
        return id;
    }

    public record ResolvedGlobalId(String type, Integer id) {
    }
}
