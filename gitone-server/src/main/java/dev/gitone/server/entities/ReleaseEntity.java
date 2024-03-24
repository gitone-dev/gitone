package dev.gitone.server.entities;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class ReleaseEntity implements TimestampNode<Integer> {

    public static final String TYPE = "Release";

    private Integer id;

    private OffsetDateTime createdAt;

    private OffsetDateTime updatedAt;

    private Integer projectId;

    private String tagName;

    private String title;

    private String description;

    private Integer createdById;
}
