package cn.notfound.gitone.server;

import graphql.relay.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class CustomConnection<T,  P extends CustomPage<?>> implements Connection<T> {
    private final List<T> data;
    protected final P page;
    private List<Edge<T>> edges;
    private PageInfo pageInfo;

    public CustomConnection(List<T> data, P page) {
        if (page.getLast() != null) {
            Collections.reverse(data);
        }
        this.data = data;
        this.page = page;
    }

    @Override
    public List<Edge<T>> getEdges() {
        if (edges == null) {
            buildEdges();
        }
        return edges;
    }

    @Override
    public PageInfo getPageInfo() {
        if (pageInfo == null) {
            buildEdges();
        }
        return pageInfo;
    }

    private void buildEdges() {
        if (data.isEmpty()) {
            this.pageInfo = new DefaultPageInfo(null, null, false, false);
            this.edges = Collections.emptyList();
            return;
        }

        int fromIndex = 0;
        int toIndex = data.size();
        if (page.getLimit() == data.size()) {
            if (page.getAfter() != null) {
                toIndex -= 1;
            } else if (page.getBefore() != null) {
                fromIndex += 1;
            } else {
                toIndex -= 1;
            }
        }
        List<Edge<T>> edges = new ArrayList<>();
        for (T node: data.subList(fromIndex, toIndex)) {
            edges.add(new DefaultEdge<>(node, createCursor(node)));
        }

        Edge<T> firstEdge = edges.get(0);
        Edge<T> lastEdge = edges.get(edges.size() - 1);

        this.pageInfo = new DefaultPageInfo(
                firstEdge.getCursor(),
                lastEdge.getCursor(),
                hasPreviousPage(),
                hasNextPage());
        this.edges = edges.subList(fromIndex, toIndex);
    }

    protected abstract ConnectionCursor createCursor(T node);

    protected ConnectionCursor createCursor(T node, int index) {
        return createCursor(node);
    }

    private boolean hasPreviousPage() {
        if (page.getLast() != null) {
            return data.size() == page.getLimit();
        } else {
            return page.getAfter() != null;
        }
    }

    private boolean hasNextPage() {
        if (page.getFirst() != null) {
            return data.size() == page.getLimit();
        } else {
            return page.getBefore() != null;
        }
    }
}
