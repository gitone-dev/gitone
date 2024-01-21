package dev.gitone.server.controllers.diffs;

import dev.gitone.server.CustomPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class DiffPage extends CustomPage<DiffCursor> {

    public DiffPage(Integer first, String after) {
        super(first, after);
    }

    @Override
    public DiffPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected DiffCursor createCursor(String cursor) {
        return DiffCursor.create(cursor, new TypeReference<>() {});
    }
}
