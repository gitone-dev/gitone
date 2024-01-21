package dev.gitone.server.results;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class EmailResult {

    private String email;

    private Boolean primary;
}
