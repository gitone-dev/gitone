package cn.notfound.gitone.server.controllers.projects;

import cn.notfound.gitone.server.CustomCursor;
import cn.notfound.gitone.server.OrderPage;
import com.fasterxml.jackson.core.type.TypeReference;

public class ProjectPage extends OrderPage<ProjectCursor> {

    private final ProjectOrder order;

    public ProjectPage(Integer first) {
        super(first, null);
        this.order = new ProjectOrder();
    }

    public ProjectPage(Integer first, String after, ProjectOrder order) {
        super(first, after);
        this.order = order;
    }

    @Override
    public ProjectPage validate() {
        super.validate();
        return this;
    }

    @Override
    protected ProjectCursor createCursor(String cursor) {
        return CustomCursor.create(cursor, new TypeReference<>() {});
    }

    @Override
    public ProjectOrder getOrder() {
        return order;
    }
}
