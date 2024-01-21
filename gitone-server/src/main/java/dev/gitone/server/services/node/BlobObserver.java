package dev.gitone.server.services.node;

import dev.gitone.node.highlight.BlobRequest;
import dev.gitone.node.highlight.BlobResponse;
import dev.gitone.node.highlight.HighlightGrpc;
import io.grpc.stub.StreamObserver;
import lombok.Getter;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class BlobObserver {

    private final Request request;

    @Getter
    private final Response response;

    public BlobObserver(HighlightGrpc.HighlightStub stub) {
        this.response = new BlobObserver.Response();
        this.request = new Request(stub.blobs(response));
    }

    public void onNext(BlobRequest value) {
        request.onNext(value);
    }

    public void onCompleted() {
        request.onCompleted();
    }

    public boolean await(long timeout, TimeUnit unit) throws InterruptedException {
        return response.await(timeout, unit);
    }

    public BlobResponse poll() {
        if (Boolean.TRUE.equals(request.remove())) {
            return response.remove();
        } else {
            return null;
        }
    }

    public static class Request implements StreamObserver<BlobRequest> {

        private final StreamObserver<BlobRequest> request;

        private final Queue<Boolean> queue;

        public Request(StreamObserver<BlobRequest> request) {
            this.request = request;
            this.queue = new LinkedList<>();
        }

        @Override
        public void onNext(BlobRequest value) {
            boolean b = value != null;
            if (b) this.request.onNext(value);
            queue.add(b);
        }

        @Override
        public void onError(Throwable t) {
            this.request.onError(t);
        }

        @Override
        public void onCompleted() {
            this.request.onCompleted();
        }

        public Boolean remove() {
            return queue.remove();
        }
    }

    public static class Response implements StreamObserver<BlobResponse> {

        private final CountDownLatch finishLatch;

        @Getter
        private final Queue<BlobResponse> queue;

        public Response() {
            this.finishLatch = new CountDownLatch(1);
            this.queue = new LinkedList<>();
        }

        @Override
        public void onNext(BlobResponse response) {
            queue.add(response);
        }

        @Override
        public void onError(Throwable t) {
            System.out.println("onError: " + t.getMessage());
            finishLatch.countDown();
        }

        @Override
        public void onCompleted() {
            System.out.println("onCompleted");
            finishLatch.countDown();
        }

        public boolean await(long timeout, TimeUnit unit) throws InterruptedException {
            return finishLatch.await(timeout, unit);
        }

        public BlobResponse remove() {
            return queue.remove();
        }
    }
}
