import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { relayStylePagination } from "@apollo/client/utilities";

const errorLink = onError(({ networkError, operation }) => {
  if (!networkError) return;

  const {
    response: { headers },
  } = operation.getContext();
  if (!headers) return;

  const token = headers.get("X-Csrf-Token");
  if (token) {
    localStorage.setItem("X-Csrf-Token", token);
  }
});

const csrfMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "X-Csrf-Token": localStorage.getItem("X-Csrf-Token") || null,
    },
  }));
  return forward(operation);
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
        diffs: relayStylePagination(["leftRevision", "rightRevision"]),
      },
    },
  },
});

const client = new ApolloClient({
  link: from([errorLink, csrfMiddleware, httpLink]),
  cache: cache,
  name: "gitone-web",
  version: "0.0.1",
});

type LoginInput = {
  username: string;
  password: string;
  rememberMe: "true" | "false";
};

async function login(input: LoginInput): Promise<string> {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "X-Csrf-Token": localStorage.getItem("X-Csrf-Token") || "",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: new URLSearchParams(input),
  });

  const data = await response.json();

  switch (response.status) {
    case 200:
      return data.message || "登录成功";
    case 401:
      throw new Error(data.message || "登录失败");
    case 403:
      const token = response.headers.get("X-Csrf-Token");
      if (token) {
        localStorage.setItem("X-Csrf-Token", token);
      }
      throw new Error(response.statusText);
    default:
      throw new Error(response.statusText);
  }
}

function logout() {
  return fetch("/logout", {
    method: "POST",
    headers: {
      "X-Csrf-Token": localStorage.getItem("X-Csrf-Token") || "",
    },
  });
}

export default client;
export { cache, login, logout };
export type { LoginInput };
