import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "X-Auth-Token": localStorage.getItem("X-Auth-Token") || null,
    },
  }));
  return forward(operation);
});

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const context = operation.getContext();
    const {
      response: { headers },
    } = context;

    if (headers) {
      const token = headers.get("X-Auth-Token");
      if (token) {
        localStorage.setItem("X-Auth-Token", token);
      }
    }
    return response;
  });
});

const httpLink = new HttpLink({
  uri: "/graphql",
});

const cache = new InMemoryCache({});

const client = new ApolloClient({
  link: from([authMiddleware, afterwareLink.concat(httpLink)]),
  cache: cache,
  name: "gitone-web",
  version: "0.0.1",
});

function deleteSession() {
  localStorage.removeItem("X-Auth-Token");
}

export default client;
export { deleteSession };
