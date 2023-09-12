package cn.notfound.gitone.server.results;

import cn.notfound.gitone.server.entities.Visibility;
import lombok.Data;

@Data
public class GroupResult {

    private String id;

    private String name;

    private String path;

    private String fullName;

    private String fullPath;

    private Visibility visibility;

    private String description;
}
