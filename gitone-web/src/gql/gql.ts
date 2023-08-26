/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation ActivateUser($input: ActivateUserInput!) {\n  payload: activateUser(input: $input) {\n    message\n  }\n}": types.ActivateUserDocument,
    "mutation ConfirmEmail($input: ConfirmEmailInput!) {\n  payload: confirmEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.ConfirmEmailDocument,
    "mutation CreateEmail($input: CreateEmailInput!) {\n  payload: createEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.CreateEmailDocument,
    "mutation CreateSession($input: CreateSessionInput!) {\n  payload: createSession(input: $input) {\n    session {\n      ...SessionFragment\n    }\n  }\n}": types.CreateSessionDocument,
    "mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.CreateUserDocument,
    "mutation DeleteEmail($input: DeleteEmailInput!) {\n  payload: deleteEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.DeleteEmailDocument,
    "mutation DeleteSession {\n  payload: deleteSession {\n    message\n  }\n}": types.DeleteSessionDocument,
    "mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.DeleteUserDocument,
    "fragment EmailFragment on Email {\n  id\n  createdAt\n  updatedAt\n  email\n  primary\n}": types.EmailFragmentFragmentDoc,
    "query ExistEmail($email: String!) {\n  existEmail(email: $email)\n}": types.ExistEmailDocument,
    "query ExistFullPath($fullPath: String!) {\n  existFullPath(fullPath: $fullPath)\n}": types.ExistFullPathDocument,
    "fragment NamespaceFragment on Namespace {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...NamespaceFragment\n  }\n}": types.NamespaceFragmentFragmentDoc,
    "fragment PageInfoFragment on PageInfo {\n  hasPreviousPage\n  hasNextPage\n  startCursor\n  endCursor\n}": types.PageInfoFragmentFragmentDoc,
    "query Ping {\n  ping\n}": types.PingDocument,
    "mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}": types.ResetPasswordDocument,
    "mutation SendActivationEmail($input: SendActivationEmailInput!) {\n  payload: sendActivationEmail(input: $input) {\n    message\n  }\n}": types.SendActivationEmailDocument,
    "mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {\n  payload: sendPasswordResetEmail(input: $input) {\n    message\n  }\n}": types.SendPasswordResetEmailDocument,
    "fragment SessionFragment on Session {\n  email\n  username\n  active\n  header\n  token\n}": types.SessionFragmentFragmentDoc,
    "mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.SetPrimaryEmailDocument,
    "mutation UpdateActivationEmail($input: UpdateActivationEmailInput!) {\n  updateActivationEmail(input: $input) {\n    message\n  }\n}": types.UpdateActivationEmailDocument,
    "mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.UpdatePasswordDocument,
    "mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}": types.UpdateUserDocument,
    "mutation UpdateUsername($input: UpdateUsernameInput!) {\n  payload: updateUsername(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.UpdateUsernameDocument,
    "fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  username\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}": types.UserFragmentFragmentDoc,
    "fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  username\n  avatarUrl\n  bio\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}": types.UserDetailFragmentFragmentDoc,
    "query Viewer {\n  viewer {\n    ...UserFragment\n  }\n}": types.ViewerDocument,
    "query ViewerDetail {\n  viewer {\n    ...UserDetailFragment\n  }\n}": types.ViewerDetailDocument,
    "query ViewerEmails {\n  viewer {\n    id\n    emails {\n      edges {\n        node {\n          ...EmailFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n    unconfirmedEmails {\n      edges {\n        node {\n          ...EmailFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}": types.ViewerEmailsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ActivateUser($input: ActivateUserInput!) {\n  payload: activateUser(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation ActivateUser($input: ActivateUserInput!) {\n  payload: activateUser(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ConfirmEmail($input: ConfirmEmailInput!) {\n  payload: confirmEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"): (typeof documents)["mutation ConfirmEmail($input: ConfirmEmailInput!) {\n  payload: confirmEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateEmail($input: CreateEmailInput!) {\n  payload: createEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateEmail($input: CreateEmailInput!) {\n  payload: createEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateSession($input: CreateSessionInput!) {\n  payload: createSession(input: $input) {\n    session {\n      ...SessionFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateSession($input: CreateSessionInput!) {\n  payload: createSession(input: $input) {\n    session {\n      ...SessionFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteEmail($input: DeleteEmailInput!) {\n  payload: deleteEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteEmail($input: DeleteEmailInput!) {\n  payload: deleteEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteSession {\n  payload: deleteSession {\n    message\n  }\n}"): (typeof documents)["mutation DeleteSession {\n  payload: deleteSession {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment EmailFragment on Email {\n  id\n  createdAt\n  updatedAt\n  email\n  primary\n}"): (typeof documents)["fragment EmailFragment on Email {\n  id\n  createdAt\n  updatedAt\n  email\n  primary\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ExistEmail($email: String!) {\n  existEmail(email: $email)\n}"): (typeof documents)["query ExistEmail($email: String!) {\n  existEmail(email: $email)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ExistFullPath($fullPath: String!) {\n  existFullPath(fullPath: $fullPath)\n}"): (typeof documents)["query ExistFullPath($fullPath: String!) {\n  existFullPath(fullPath: $fullPath)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment NamespaceFragment on Namespace {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...NamespaceFragment\n  }\n}"): (typeof documents)["fragment NamespaceFragment on Namespace {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...NamespaceFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment PageInfoFragment on PageInfo {\n  hasPreviousPage\n  hasNextPage\n  startCursor\n  endCursor\n}"): (typeof documents)["fragment PageInfoFragment on PageInfo {\n  hasPreviousPage\n  hasNextPage\n  startCursor\n  endCursor\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Ping {\n  ping\n}"): (typeof documents)["query Ping {\n  ping\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendActivationEmail($input: SendActivationEmailInput!) {\n  payload: sendActivationEmail(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation SendActivationEmail($input: SendActivationEmailInput!) {\n  payload: sendActivationEmail(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {\n  payload: sendPasswordResetEmail(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {\n  payload: sendPasswordResetEmail(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SessionFragment on Session {\n  email\n  username\n  active\n  header\n  token\n}"): (typeof documents)["fragment SessionFragment on Session {\n  email\n  username\n  active\n  header\n  token\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"): (typeof documents)["mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateActivationEmail($input: UpdateActivationEmailInput!) {\n  updateActivationEmail(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation UpdateActivationEmail($input: UpdateActivationEmailInput!) {\n  updateActivationEmail(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUsername($input: UpdateUsernameInput!) {\n  payload: updateUsername(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateUsername($input: UpdateUsernameInput!) {\n  payload: updateUsername(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  username\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}"): (typeof documents)["fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  username\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  username\n  avatarUrl\n  bio\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}"): (typeof documents)["fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  username\n  avatarUrl\n  bio\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Viewer {\n  viewer {\n    ...UserFragment\n  }\n}"): (typeof documents)["query Viewer {\n  viewer {\n    ...UserFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ViewerDetail {\n  viewer {\n    ...UserDetailFragment\n  }\n}"): (typeof documents)["query ViewerDetail {\n  viewer {\n    ...UserDetailFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ViewerEmails {\n  viewer {\n    id\n    emails {\n      edges {\n        node {\n          ...EmailFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n    unconfirmedEmails {\n      edges {\n        node {\n          ...EmailFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"): (typeof documents)["query ViewerEmails {\n  viewer {\n    id\n    emails {\n      edges {\n        node {\n          ...EmailFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n    unconfirmedEmails {\n      edges {\n        node {\n          ...EmailFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;