package cn.notfound.gitone.server.models.git;

import lombok.Getter;
import org.eclipse.jgit.lib.PersonIdent;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Getter
public class GitUser {

    private final PersonIdent personIdent;

    public GitUser(PersonIdent personIdent) {
        this.personIdent = personIdent;
    }

    public GitUser(String name, String email) {
        this.personIdent = new PersonIdent(name, email);
    }

    public String getName() {
        return personIdent.getName();
    }

    public String getEmail() {
        return personIdent.getEmailAddress();
    }

    public OffsetDateTime getDate() {
        return personIdent.getWhenAsInstant().atOffset(ZoneOffset.UTC);
    }
}
