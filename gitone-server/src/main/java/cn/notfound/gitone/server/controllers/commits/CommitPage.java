package cn.notfound.gitone.server.controllers.commits;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.CustomPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class CommitPage extends CustomPage<CommitCursor> {

    public CommitPage(Integer first, String after) {
        super(first, after);
    }

    @Override
    public CommitPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected CommitCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }
}
