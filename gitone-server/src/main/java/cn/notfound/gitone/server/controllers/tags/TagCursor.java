package cn.notfound.gitone.server.controllers.tags;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.models.git.GitTag;
import com.fasterxml.jackson.annotation.JsonInclude;
import graphql.relay.ConnectionCursor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TagCursor extends CustomCursor {

    public static ConnectionCursor create(GitTag node, TagOrder order) {
        TagCursor cursor = new TagCursor();
        cursor.setName(node.getName());
        /* TODO
         * switch (order.getField()) {
         *     case NAME -> cursor.setName(node.getName());
         * }
         */
        return cursor;
    }

    private String name;
}
