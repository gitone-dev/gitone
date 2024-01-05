import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: relayStylePagination(),
        members: relayStylePagination(),
        namespaces: relayStylePagination(),
        groups: relayStylePagination(),
        projects: relayStylePagination(),
      },
    },
    User: {
      fields: {
        emails: relayStylePagination(),
        unconfirmedEmails: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        branches: relayStylePagination(),
        tags: relayStylePagination(),
        commits: relayStylePagination(),
        diffs: relayStylePagination(),
      },
    },
  },
});

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
export { cache, deleteSession };
