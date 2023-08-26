package cn.notfound.gitone.server.controllers.emails.payloads;

import cn.notfound.gitone.server.controllers.Payload;
import cn.notfound.gitone.server.entities.EmailEntity;

public record DeleteEmailPayload(EmailEntity email) implements Payload {
}
