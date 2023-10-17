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
    "mutation CreateGroup($input: CreateGroupInput!) {\n  payload: createGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}": types.CreateGroupDocument,
    "mutation CreateMember($input: CreateMemberInput!) {\n  payload: createMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}": types.CreateMemberDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  payload: createProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}": types.CreateProjectDocument,
    "mutation CreateSession($input: CreateSessionInput!) {\n  payload: createSession(input: $input) {\n    session {\n      ...SessionFragment\n    }\n  }\n}": types.CreateSessionDocument,
    "mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.CreateUserDocument,
    "mutation DeleteEmail($input: DeleteEmailInput!) {\n  payload: deleteEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.DeleteEmailDocument,
    "mutation DeleteMember($input: DeleteMemberInput!) {\n  payload: deleteMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}": types.DeleteMemberDocument,
    "mutation DeleteSession {\n  payload: deleteSession {\n    message\n  }\n}": types.DeleteSessionDocument,
    "mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.DeleteUserDocument,
    "fragment EmailFragment on Email {\n  id\n  createdAt\n  updatedAt\n  email\n  primary\n}": types.EmailFragmentFragmentDoc,
    "query ExistEmail($email: String!) {\n  existEmail(email: $email)\n}": types.ExistEmailDocument,
    "query ExistFullPath($fullPath: String!) {\n  existFullPath(fullPath: $fullPath)\n}": types.ExistFullPathDocument,
    "fragment GroupFragment on Group {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Group($fullPath: String!) {\n  group(fullPath: $fullPath) {\n    ...GroupFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.GroupFragmentFragmentDoc,
    "query Groups($first: Int!, $after: String, $filterBy: GroupFilter, $orderBy: GroupOrder) {\n  groups(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...GroupFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.GroupsDocument,
    "fragment MemberFragment on Member {\n  id\n  createdAt\n  updatedAt\n  access\n  user {\n    ...UserFragment\n  }\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}": types.MemberFragmentFragmentDoc,
    "query Members($fullPath: String!, $first: Int!, $after: String, $filterBy: MemberFilter, $orderBy: MemberOrder) {\n  members(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...MemberFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.MembersDocument,
    "query Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.NamespaceDocument,
    "query Namespaces($first: Int!, $after: String, $filterBy: NamespaceFilter, $orderBy: NamespaceOrder) {\n  namespaces(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n        ...GroupFragment\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.NamespacesDocument,
    "fragment PageInfoFragment on PageInfo {\n  hasPreviousPage\n  hasNextPage\n  startCursor\n  endCursor\n}": types.PageInfoFragmentFragmentDoc,
    "query Ping {\n  ping\n}": types.PingDocument,
    "fragment PolicyFragment on Policy {\n  id\n  access\n  actions\n}": types.PolicyFragmentFragmentDoc,
    "fragment ProjectFragment on Project {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Project($fullPath: String!) {\n  project(fullPath: $fullPath) {\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.ProjectFragmentFragmentDoc,
    "query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {\n  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.ProjectsDocument,
    "mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}": types.ResetPasswordDocument,
    "mutation SendActivationEmail($input: SendActivationEmailInput!) {\n  payload: sendActivationEmail(input: $input) {\n    message\n  }\n}": types.SendActivationEmailDocument,
    "mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {\n  payload: sendPasswordResetEmail(input: $input) {\n    message\n  }\n}": types.SendPasswordResetEmailDocument,
    "fragment SessionFragment on Session {\n  username\n  email\n  active\n  header\n  token\n}": types.SessionFragmentFragmentDoc,
    "mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.SetPrimaryEmailDocument,
    "mutation UpdateActivationEmail($input: UpdateActivationEmailInput!) {\n  updateActivationEmail(input: $input) {\n    message\n  }\n}": types.UpdateActivationEmailDocument,
    "mutation UpdateGroup($input: UpdateGroupInput!) {\n  payload: updateGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}": types.UpdateGroupDocument,
    "mutation UpdateMember($input: UpdateMemberInput!) {\n  payload: updateMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}": types.UpdateMemberDocument,
    "mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.UpdatePasswordDocument,
    "mutation UpdatePath($input: UpdatePathInput!) {\n  payload: updatePath(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}": types.UpdatePathDocument,
    "mutation UpdateProject($input: UpdateProjectInput!) {\n  payload: updateProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}": types.UpdateProjectDocument,
    "mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}": types.UpdateUserDocument,
    "mutation UpdateVisibility($input: UpdateVisibilityInput!) {\n  payload: updateVisibility(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}": types.UpdateVisibilityDocument,
    "fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}": types.UserFragmentFragmentDoc,
    "fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}": types.UserDetailFragmentFragmentDoc,
    "query Users($after: String, $filterBy: UserFilter, $orderBy: UserOrder) {\n  users(after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.UsersDocument,
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
export function graphql(source: "mutation CreateGroup($input: CreateGroupInput!) {\n  payload: createGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateGroup($input: CreateGroupInput!) {\n  payload: createGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateMember($input: CreateMemberInput!) {\n  payload: createMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateMember($input: CreateMemberInput!) {\n  payload: createMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateProject($input: CreateProjectInput!) {\n  payload: createProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateProject($input: CreateProjectInput!) {\n  payload: createProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}"];
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
export function graphql(source: "mutation DeleteMember($input: DeleteMemberInput!) {\n  payload: deleteMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteMember($input: DeleteMemberInput!) {\n  payload: deleteMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}"];
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
export function graphql(source: "fragment GroupFragment on Group {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Group($fullPath: String!) {\n  group(fullPath: $fullPath) {\n    ...GroupFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["fragment GroupFragment on Group {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Group($fullPath: String!) {\n  group(fullPath: $fullPath) {\n    ...GroupFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Groups($first: Int!, $after: String, $filterBy: GroupFilter, $orderBy: GroupOrder) {\n  groups(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...GroupFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query Groups($first: Int!, $after: String, $filterBy: GroupFilter, $orderBy: GroupOrder) {\n  groups(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...GroupFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MemberFragment on Member {\n  id\n  createdAt\n  updatedAt\n  access\n  user {\n    ...UserFragment\n  }\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}"): (typeof documents)["fragment MemberFragment on Member {\n  id\n  createdAt\n  updatedAt\n  access\n  user {\n    ...UserFragment\n  }\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Members($fullPath: String!, $first: Int!, $after: String, $filterBy: MemberFilter, $orderBy: MemberOrder) {\n  members(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...MemberFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["query Members($fullPath: String!, $first: Int!, $after: String, $filterBy: MemberFilter, $orderBy: MemberOrder) {\n  members(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...MemberFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["query Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Namespaces($first: Int!, $after: String, $filterBy: NamespaceFilter, $orderBy: NamespaceOrder) {\n  namespaces(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n        ...GroupFragment\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query Namespaces($first: Int!, $after: String, $filterBy: NamespaceFilter, $orderBy: NamespaceOrder) {\n  namespaces(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n        ...GroupFragment\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
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
export function graphql(source: "fragment PolicyFragment on Policy {\n  id\n  access\n  actions\n}"): (typeof documents)["fragment PolicyFragment on Policy {\n  id\n  access\n  actions\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ProjectFragment on Project {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Project($fullPath: String!) {\n  project(fullPath: $fullPath) {\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["fragment ProjectFragment on Project {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Project($fullPath: String!) {\n  project(fullPath: $fullPath) {\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {\n  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {\n  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
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
export function graphql(source: "fragment SessionFragment on Session {\n  username\n  email\n  active\n  header\n  token\n}"): (typeof documents)["fragment SessionFragment on Session {\n  username\n  email\n  active\n  header\n  token\n}"];
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
export function graphql(source: "mutation UpdateGroup($input: UpdateGroupInput!) {\n  payload: updateGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateGroup($input: UpdateGroupInput!) {\n  payload: updateGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateMember($input: UpdateMemberInput!) {\n  payload: updateMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateMember($input: UpdateMemberInput!) {\n  payload: updateMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePath($input: UpdatePathInput!) {\n  payload: updatePath(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdatePath($input: UpdatePathInput!) {\n  payload: updatePath(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateProject($input: UpdateProjectInput!) {\n  payload: updateProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateProject($input: UpdateProjectInput!) {\n  payload: updateProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateVisibility($input: UpdateVisibilityInput!) {\n  payload: updateVisibility(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateVisibility($input: UpdateVisibilityInput!) {\n  payload: updateVisibility(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}"): (typeof documents)["fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}"): (typeof documents)["fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Users($after: String, $filterBy: UserFilter, $orderBy: UserOrder) {\n  users(after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query Users($after: String, $filterBy: UserFilter, $orderBy: UserOrder) {\n  users(after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
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