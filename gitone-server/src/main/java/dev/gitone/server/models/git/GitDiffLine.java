package dev.gitone.server.models.git;

import lombok.Data;

@Data
public class GitDiffLine {

    private GitDiffLineType type;

    private int oldNumber = 0;

    private int newNumber = 0;

    private String text;

    private String html;
}
