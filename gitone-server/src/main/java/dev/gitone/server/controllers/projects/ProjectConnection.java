package dev.gitone.server.controllers.projects;

import dev.gitone.server.CustomConnection;
import dev.gitone.server.entities.ProjectEntity;
import graphql.relay.ConnectionCursor;

import java.util.List;

public class ProjectConnection extends CustomConnection<ProjectEntity, ProjectPage> {

    public ProjectConnection(List<ProjectEntity> data, ProjectPage page) {
        super(data, page);
    }

    @Override
    protected ConnectionCursor createCursor(ProjectEntity node) {
        return ProjectCursor.create(node, page.getOrder());
    }
}
