package cn.notfound.gitone.server.util;

import cn.notfound.gitone.server.entities.ProjectEntity;
import org.eclipse.jgit.lib.Constants;
import org.springframework.util.Assert;

import java.util.StringJoiner;

public class StoragePath {

    public static String get(ProjectEntity projectEntity) {
        return get(ProjectEntity.TYPE.toLowerCase(), projectEntity.getId(), Constants.DOT_GIT_EXT);
    }

    public static String get(String type, int id, String extension) {
        Assert.hasText(type, "type 不能为空");
        Assert.isTrue(id > 0, "id 必须大于 0");
        Assert.hasText(extension, "extension 不能为空");

        String sha = String.valueOf(id);
        StringJoiner joiner = new StringJoiner("/");
        int depth = (int) Math.ceil(sha.length() / 3.0);

        joiner.add(type);
        joiner.add(depth + "x");

        int end = sha.length() % 3;
        if (depth > 1 && end > 0) {
            joiner.add(sha.substring(0, end));
        }
        for (end += 3; end < sha.length(); end += 3) {
            joiner.add(sha.substring(end - 3, end));
        }
        joiner.add(id + extension);
        return joiner.toString();
    }
}
