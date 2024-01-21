package dev.gitone.server.controllers.blob;

import dev.gitone.server.CustomPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class BlobLinePage extends CustomPage<BlobLineCursor> {

    public BlobLinePage(Integer first, String after) {
        super(first, after);
    }

    @Override
    public BlobLinePage validate() {
        super.validate();
        return this;
    }

    @Override
    protected BlobLineCursor createCursor(String cursor) {
        return BlobLineCursor.create(cursor, new TypeReference<>() {});
    }
}
