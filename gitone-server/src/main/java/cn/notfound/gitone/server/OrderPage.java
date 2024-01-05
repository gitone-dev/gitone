package cn.notfound.gitone.server;

public abstract class OrderPage<T extends CustomCursor> extends CustomPage<T> {

    public OrderPage(Integer first, String after) {
        super(first, after);
    }

    public abstract Order getOrder();

    public OrderDirection orderDirection() {
        if (getLast() != null) {
            return getOrder().getDirection().reverse();
        } else {
            return getOrder().getDirection();
        }
    }

    public String direction(boolean isBefore) {
        if (isBefore) {
            return getOrder().getDirection().equals(OrderDirection.DESC) ? ">" : "<";
        } else {
            return getOrder().getDirection().equals(OrderDirection.DESC) ? "<" : ">";
        }
    }
}
