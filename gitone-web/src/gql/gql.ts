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
    "fragment BlobFragment on Blob {\n  id\n  sha\n  path\n  name\n  size\n  linesCount\n  lines {\n    edges {\n      node {\n        number\n        html\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}\n\nquery Blob($fullPath: String!, $revision: String!, $path: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    blob(revision: $revision, path: $path) {\n      ...BlobFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.BlobFragmentFragmentDoc,
    "query BlobLines($fullPath: String!, $revision: String!, $path: String!, $first: Int!, $after: String) {\n  repository(fullPath: $fullPath) {\n    id\n    blob(revision: $revision, path: $path) {\n      id\n      lines(first: $first, after: $after) {\n        edges {\n          node {\n            number\n            html\n          }\n          cursor\n        }\n        pageInfo {\n          ...PageInfoFragment\n        }\n      }\n    }\n  }\n}": types.BlobLinesDocument,
    "fragment BranchFragment on Branch {\n  id\n  name\n  commit {\n    ...CommitFragment\n  }\n}": types.BranchFragmentFragmentDoc,
    "query Branches($fullPath: String!, $first: Int!, $after: String, $filterBy: BranchFilter, $orderBy: BranchOrder) {\n  repository(fullPath: $fullPath) {\n    id\n    branches(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n      edges {\n        node {\n          ...BranchFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}": types.BranchesDocument,
    "fragment CommitFragment on Commit {\n  id\n  sha\n  parentShas\n  author {\n    ...GitUserFragment\n  }\n  committer {\n    ...GitUserFragment\n  }\n  shortMessage\n  fullMessage\n}\n\nquery Commit($fullPath: String!, $revision: String) {\n  repository(fullPath: $fullPath) {\n    id\n    commit(revision: $revision) {\n      ...CommitFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.CommitFragmentFragmentDoc,
    "query Commits($fullPath: String!, $first: Int!, $after: String, $filterBy: CommitFilter!) {\n  repository(fullPath: $fullPath) {\n    id\n    commits(first: $first, after: $after, filterBy: $filterBy) {\n      edges {\n        node {\n          ...CommitFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}": types.CommitsDocument,
    "mutation ConfirmEmail($input: ConfirmEmailInput!) {\n  payload: confirmEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.ConfirmEmailDocument,
    "mutation CreateBranch($input: CreateBranchInput!) {\n  payload: createBranch(input: $input) {\n    repositoryId\n    branch {\n      ...BranchFragment\n    }\n  }\n}": types.CreateBranchDocument,
    "mutation CreateEmail($input: CreateEmailInput!) {\n  payload: createEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.CreateEmailDocument,
    "mutation CreateGroup($input: CreateGroupInput!) {\n  payload: createGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}": types.CreateGroupDocument,
    "mutation CreateMember($input: CreateMemberInput!) {\n  payload: createMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}": types.CreateMemberDocument,
    "mutation CreateProject($input: CreateProjectInput!) {\n  payload: createProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}": types.CreateProjectDocument,
    "mutation CreateRegisteredClient($input: CreateRegisteredClientInput!) {\n  payload: createRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}": types.CreateRegisteredClientDocument,
    "mutation CreateSshKey($input: CreateSshKeyInput!) {\n  payload: createSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}": types.CreateSshKeyDocument,
    "mutation CreateTag($input: CreateTagInput!) {\n  payload: createTag(input: $input) {\n    repositoryId\n    tag {\n      ...TagFragment\n    }\n  }\n}": types.CreateTagDocument,
    "mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.CreateUserDocument,
    "mutation DeleteBranch($input: DeleteBranchInput!) {\n  payload: deleteBranch(input: $input) {\n    repositoryId\n    branch {\n      ...BranchFragment\n    }\n  }\n}": types.DeleteBranchDocument,
    "mutation DeleteEmail($input: DeleteEmailInput!) {\n  payload: deleteEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.DeleteEmailDocument,
    "mutation DeleteMember($input: DeleteMemberInput!) {\n  payload: deleteMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}": types.DeleteMemberDocument,
    "mutation DeleteRegisteredClient($input: DeleteRegisteredClientInput!) {\n  payload: deleteRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}": types.DeleteRegisteredClientDocument,
    "mutation DeleteSshKey($input: DeleteSshKeyInput!) {\n  payload: deleteSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}": types.DeleteSshKeyDocument,
    "mutation DeleteTag($input: DeleteTagInput!) {\n  payload: deleteTag(input: $input) {\n    repositoryId\n    tag {\n      ...TagFragment\n    }\n  }\n}": types.DeleteTagDocument,
    "mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.DeleteUserDocument,
    "fragment DiffFragment on Diff {\n  id\n  type\n  oldPath\n  newPath\n  oldSha\n  newSha\n  lines {\n    type\n    oldNumber\n    newNumber\n    text\n    html\n  }\n}": types.DiffFragmentFragmentDoc,
    "query Diffs($fullPath: String!, $after: String, $oldRevision: String, $newRevision: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    diffs(\n      first: 20\n      after: $after\n      oldRevision: $oldRevision\n      newRevision: $newRevision\n    ) {\n      edges {\n        node {\n          ...DiffFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}": types.DiffsDocument,
    "fragment EmailFragment on Email {\n  id\n  createdAt\n  updatedAt\n  email\n  primary\n}": types.EmailFragmentFragmentDoc,
    "query ExistEmail($email: String!) {\n  existEmail(email: $email)\n}": types.ExistEmailDocument,
    "query ExistFullPath($fullPath: String!) {\n  existFullPath(fullPath: $fullPath)\n}": types.ExistFullPathDocument,
    "fragment GitUserFragment on GitUser {\n  name\n  email\n  date\n}": types.GitUserFragmentFragmentDoc,
    "fragment GroupFragment on Group {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Group($fullPath: String!) {\n  group(fullPath: $fullPath) {\n    ...GroupFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.GroupFragmentFragmentDoc,
    "query Groups($first: Int!, $after: String, $filterBy: GroupFilter, $orderBy: GroupOrder) {\n  groups(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...GroupFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.GroupsDocument,
    "fragment MemberFragment on Member {\n  id\n  createdAt\n  updatedAt\n  access\n  user {\n    ...UserFragment\n  }\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}": types.MemberFragmentFragmentDoc,
    "query Members($fullPath: String!, $first: Int!, $after: String, $filterBy: MemberFilter, $orderBy: MemberOrder) {\n  members(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...MemberFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.MembersDocument,
    "query Namespace($fullPath: String!) {\n  namespace(fullPath: $fullPath) {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.NamespaceDocument,
    "query Namespaces($first: Int!, $after: String, $filterBy: NamespaceFilter, $orderBy: NamespaceOrder) {\n  namespaces(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n        ...GroupFragment\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.NamespacesDocument,
    "fragment PageInfoFragment on PageInfo {\n  hasPreviousPage\n  hasNextPage\n  startCursor\n  endCursor\n}": types.PageInfoFragmentFragmentDoc,
    "query Ping {\n  ping\n}": types.PingDocument,
    "fragment PolicyFragment on Policy {\n  id\n  access\n  actions\n}": types.PolicyFragmentFragmentDoc,
    "fragment ProjectFragment on Project {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Project($fullPath: String!, $revisionPath: String!) {\n  project(fullPath: $fullPath) {\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n  repository(fullPath: $fullPath) {\n    id\n    empty\n    defaultBranch {\n      name\n    }\n    revisionPath(revisionPath: $revisionPath) {\n      id\n      revision\n      path\n      type\n    }\n  }\n}": types.ProjectFragmentFragmentDoc,
    "query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {\n  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.ProjectsDocument,
    "fragment RegisteredClientFragment on RegisteredClient {\n  id\n  createdAt\n  updatedAt\n  clientId\n  clientName\n  clientSecret\n  redirectUris\n  scopes\n  description\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}\n\nquery RegisteredClient($id: ID!) {\n  registeredClient(id: $id) {\n    ...RegisteredClientFragment\n  }\n}": types.RegisteredClientFragmentFragmentDoc,
    "query RegisteredClients($fullPath: String!, $first: Int!, $after: String, $filterBy: RegisteredClientFilter, $orderBy: RegisteredClientOrder) {\n  registeredClients(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...RegisteredClientFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.RegisteredClientsDocument,
    "mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}": types.ResetPasswordDocument,
    "query RevisionPath($fullPath: String!, $revisionPath: String) {\n  repository(fullPath: $fullPath) {\n    id\n    revisionPath(revisionPath: $revisionPath) {\n      id\n      revision\n      path\n      type\n    }\n  }\n}": types.RevisionPathDocument,
    "mutation SendActivationEmail($input: SendActivationEmailInput!) {\n  payload: sendActivationEmail(input: $input) {\n    message\n  }\n}": types.SendActivationEmailDocument,
    "mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {\n  payload: sendPasswordResetEmail(input: $input) {\n    message\n  }\n}": types.SendPasswordResetEmailDocument,
    "mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}": types.SetPrimaryEmailDocument,
    "fragment SshKeyFragment on SshKey {\n  id\n  createdAt\n  updatedAt\n  title\n  key\n  fingerprint\n  usages\n  lastUsedAt\n  expiresAt\n  isExpired\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}": types.SshKeyFragmentFragmentDoc,
    "query SshKeys($fullPath: String!, $first: Int!, $after: String, $filterBy: SshKeyFilter, $orderBy: SshKeyOrder) {\n  sshKeys(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...SshKeyFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.SshKeysDocument,
    "fragment TagFragment on Tag {\n  id\n  name\n  commit {\n    ...CommitFragment\n  }\n  tagger {\n    ...GitUserFragment\n  }\n  shortMessage\n  fullMessage\n}": types.TagFragmentFragmentDoc,
    "query Tags($fullPath: String!, $first: Int!, $after: String, $filterBy: TagFilter, $orderBy: TagOrder) {\n  repository(fullPath: $fullPath) {\n    id\n    tags(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n      edges {\n        node {\n          ...TagFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}": types.TagsDocument,
    "fragment TreeEntryFragment on TreeEntry {\n  id\n  name\n  path\n  mode\n  type\n}\n\nquery Tree($fullPath: String!, $revision: String!, $path: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    tree(revision: $revision, path: $path) {\n      edges {\n        node {\n          ...TreeEntryFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}": types.TreeEntryFragmentFragmentDoc,
    "mutation UpdateActivationEmail($input: UpdateActivationEmailInput!) {\n  updateActivationEmail(input: $input) {\n    message\n  }\n}": types.UpdateActivationEmailDocument,
    "mutation UpdateGroup($input: UpdateGroupInput!) {\n  payload: updateGroup(input: $input) {\n    group {\n      ...GroupFragment\n    }\n  }\n}": types.UpdateGroupDocument,
    "mutation UpdateMember($input: UpdateMemberInput!) {\n  payload: updateMember(input: $input) {\n    member {\n      ...MemberFragment\n    }\n  }\n}": types.UpdateMemberDocument,
    "mutation updatePassword($input: UpdatePasswordInput!) {\n  payload: updatePassword(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}": types.UpdatePasswordDocument,
    "mutation UpdatePath($input: UpdatePathInput!) {\n  payload: updatePath(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}": types.UpdatePathDocument,
    "mutation UpdateProject($input: UpdateProjectInput!) {\n  payload: updateProject(input: $input) {\n    project {\n      ...ProjectFragment\n    }\n  }\n}": types.UpdateProjectDocument,
    "mutation UpdateRegisteredClient($input: UpdateRegisteredClientInput!) {\n  payload: updateRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}": types.UpdateRegisteredClientDocument,
    "mutation UpdateSshKey($input: UpdateSshKeyInput!) {\n  payload: updateSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}": types.UpdateSshKeyDocument,
    "mutation UpdateUser($input: UpdateUserInput!) {\n  payload: updateUser(input: $input) {\n    user {\n      ...UserDetailFragment\n    }\n  }\n}": types.UpdateUserDocument,
    "mutation UpdateVisibility($input: UpdateVisibilityInput!) {\n  payload: updateVisibility(input: $input) {\n    namespace {\n      ...UserFragment\n      ...GroupFragment\n      ...ProjectFragment\n    }\n  }\n}": types.UpdateVisibilityDocument,
    "fragment UserFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n}\n\nquery User($username: String!) {\n  user(username: $username) {\n    ...UserFragment\n  }\n}": types.UserFragmentFragmentDoc,
    "fragment UserDetailFragment on User {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  username\n  visibility\n  description\n  avatarUrl\n  location\n  websiteUrl\n}\n\nquery UserDetail($username: String!) {\n  user(username: $username) {\n    ...UserDetailFragment\n  }\n}": types.UserDetailFragmentFragmentDoc,
    "query Users($after: String, $filterBy: UserFilter, $orderBy: UserOrder) {\n  users(after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...UserFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}": types.UsersDocument,
    "query Viewer {\n  viewer {\n    ...UserFragment\n  }\n  viewerPolicy {\n    ...PolicyFragment\n  }\n}": types.ViewerDocument,
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
export function graphql(source: "fragment BlobFragment on Blob {\n  id\n  sha\n  path\n  name\n  size\n  linesCount\n  lines {\n    edges {\n      node {\n        number\n        html\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}\n\nquery Blob($fullPath: String!, $revision: String!, $path: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    blob(revision: $revision, path: $path) {\n      ...BlobFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["fragment BlobFragment on Blob {\n  id\n  sha\n  path\n  name\n  size\n  linesCount\n  lines {\n    edges {\n      node {\n        number\n        html\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}\n\nquery Blob($fullPath: String!, $revision: String!, $path: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    blob(revision: $revision, path: $path) {\n      ...BlobFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BlobLines($fullPath: String!, $revision: String!, $path: String!, $first: Int!, $after: String) {\n  repository(fullPath: $fullPath) {\n    id\n    blob(revision: $revision, path: $path) {\n      id\n      lines(first: $first, after: $after) {\n        edges {\n          node {\n            number\n            html\n          }\n          cursor\n        }\n        pageInfo {\n          ...PageInfoFragment\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query BlobLines($fullPath: String!, $revision: String!, $path: String!, $first: Int!, $after: String) {\n  repository(fullPath: $fullPath) {\n    id\n    blob(revision: $revision, path: $path) {\n      id\n      lines(first: $first, after: $after) {\n        edges {\n          node {\n            number\n            html\n          }\n          cursor\n        }\n        pageInfo {\n          ...PageInfoFragment\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment BranchFragment on Branch {\n  id\n  name\n  commit {\n    ...CommitFragment\n  }\n}"): (typeof documents)["fragment BranchFragment on Branch {\n  id\n  name\n  commit {\n    ...CommitFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Branches($fullPath: String!, $first: Int!, $after: String, $filterBy: BranchFilter, $orderBy: BranchOrder) {\n  repository(fullPath: $fullPath) {\n    id\n    branches(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n      edges {\n        node {\n          ...BranchFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"): (typeof documents)["query Branches($fullPath: String!, $first: Int!, $after: String, $filterBy: BranchFilter, $orderBy: BranchOrder) {\n  repository(fullPath: $fullPath) {\n    id\n    branches(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n      edges {\n        node {\n          ...BranchFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CommitFragment on Commit {\n  id\n  sha\n  parentShas\n  author {\n    ...GitUserFragment\n  }\n  committer {\n    ...GitUserFragment\n  }\n  shortMessage\n  fullMessage\n}\n\nquery Commit($fullPath: String!, $revision: String) {\n  repository(fullPath: $fullPath) {\n    id\n    commit(revision: $revision) {\n      ...CommitFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["fragment CommitFragment on Commit {\n  id\n  sha\n  parentShas\n  author {\n    ...GitUserFragment\n  }\n  committer {\n    ...GitUserFragment\n  }\n  shortMessage\n  fullMessage\n}\n\nquery Commit($fullPath: String!, $revision: String) {\n  repository(fullPath: $fullPath) {\n    id\n    commit(revision: $revision) {\n      ...CommitFragment\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Commits($fullPath: String!, $first: Int!, $after: String, $filterBy: CommitFilter!) {\n  repository(fullPath: $fullPath) {\n    id\n    commits(first: $first, after: $after, filterBy: $filterBy) {\n      edges {\n        node {\n          ...CommitFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"): (typeof documents)["query Commits($fullPath: String!, $first: Int!, $after: String, $filterBy: CommitFilter!) {\n  repository(fullPath: $fullPath) {\n    id\n    commits(first: $first, after: $after, filterBy: $filterBy) {\n      edges {\n        node {\n          ...CommitFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ConfirmEmail($input: ConfirmEmailInput!) {\n  payload: confirmEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"): (typeof documents)["mutation ConfirmEmail($input: ConfirmEmailInput!) {\n  payload: confirmEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateBranch($input: CreateBranchInput!) {\n  payload: createBranch(input: $input) {\n    repositoryId\n    branch {\n      ...BranchFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateBranch($input: CreateBranchInput!) {\n  payload: createBranch(input: $input) {\n    repositoryId\n    branch {\n      ...BranchFragment\n    }\n  }\n}"];
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
export function graphql(source: "mutation CreateRegisteredClient($input: CreateRegisteredClientInput!) {\n  payload: createRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateRegisteredClient($input: CreateRegisteredClientInput!) {\n  payload: createRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateSshKey($input: CreateSshKeyInput!) {\n  payload: createSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateSshKey($input: CreateSshKeyInput!) {\n  payload: createSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateTag($input: CreateTagInput!) {\n  payload: createTag(input: $input) {\n    repositoryId\n    tag {\n      ...TagFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateTag($input: CreateTagInput!) {\n  payload: createTag(input: $input) {\n    repositoryId\n    tag {\n      ...TagFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation CreateUser($input: CreateUserInput!) {\n  payload: createUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteBranch($input: DeleteBranchInput!) {\n  payload: deleteBranch(input: $input) {\n    repositoryId\n    branch {\n      ...BranchFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteBranch($input: DeleteBranchInput!) {\n  payload: deleteBranch(input: $input) {\n    repositoryId\n    branch {\n      ...BranchFragment\n    }\n  }\n}"];
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
export function graphql(source: "mutation DeleteRegisteredClient($input: DeleteRegisteredClientInput!) {\n  payload: deleteRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteRegisteredClient($input: DeleteRegisteredClientInput!) {\n  payload: deleteRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteSshKey($input: DeleteSshKeyInput!) {\n  payload: deleteSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteSshKey($input: DeleteSshKeyInput!) {\n  payload: deleteSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteTag($input: DeleteTagInput!) {\n  payload: deleteTag(input: $input) {\n    repositoryId\n    tag {\n      ...TagFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteTag($input: DeleteTagInput!) {\n  payload: deleteTag(input: $input) {\n    repositoryId\n    tag {\n      ...TagFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"): (typeof documents)["mutation DeleteUser($input: DeleteUserInput!) {\n  payload: deleteUser(input: $input) {\n    user {\n      ...UserFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment DiffFragment on Diff {\n  id\n  type\n  oldPath\n  newPath\n  oldSha\n  newSha\n  lines {\n    type\n    oldNumber\n    newNumber\n    text\n    html\n  }\n}"): (typeof documents)["fragment DiffFragment on Diff {\n  id\n  type\n  oldPath\n  newPath\n  oldSha\n  newSha\n  lines {\n    type\n    oldNumber\n    newNumber\n    text\n    html\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Diffs($fullPath: String!, $after: String, $oldRevision: String, $newRevision: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    diffs(\n      first: 20\n      after: $after\n      oldRevision: $oldRevision\n      newRevision: $newRevision\n    ) {\n      edges {\n        node {\n          ...DiffFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"): (typeof documents)["query Diffs($fullPath: String!, $after: String, $oldRevision: String, $newRevision: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    diffs(\n      first: 20\n      after: $after\n      oldRevision: $oldRevision\n      newRevision: $newRevision\n    ) {\n      edges {\n        node {\n          ...DiffFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"];
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
export function graphql(source: "fragment GitUserFragment on GitUser {\n  name\n  email\n  date\n}"): (typeof documents)["fragment GitUserFragment on GitUser {\n  name\n  email\n  date\n}"];
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
export function graphql(source: "fragment ProjectFragment on Project {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Project($fullPath: String!, $revisionPath: String!) {\n  project(fullPath: $fullPath) {\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n  repository(fullPath: $fullPath) {\n    id\n    empty\n    defaultBranch {\n      name\n    }\n    revisionPath(revisionPath: $revisionPath) {\n      id\n      revision\n      path\n      type\n    }\n  }\n}"): (typeof documents)["fragment ProjectFragment on Project {\n  id\n  createdAt\n  updatedAt\n  name\n  path\n  fullName\n  fullPath\n  visibility\n  description\n}\n\nquery Project($fullPath: String!, $revisionPath: String!) {\n  project(fullPath: $fullPath) {\n    ...ProjectFragment\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n  repository(fullPath: $fullPath) {\n    id\n    empty\n    defaultBranch {\n      name\n    }\n    revisionPath(revisionPath: $revisionPath) {\n      id\n      revision\n      path\n      type\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {\n  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {\n  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n    edges {\n      node {\n        ...ProjectFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegisteredClientFragment on RegisteredClient {\n  id\n  createdAt\n  updatedAt\n  clientId\n  clientName\n  clientSecret\n  redirectUris\n  scopes\n  description\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}\n\nquery RegisteredClient($id: ID!) {\n  registeredClient(id: $id) {\n    ...RegisteredClientFragment\n  }\n}"): (typeof documents)["fragment RegisteredClientFragment on RegisteredClient {\n  id\n  createdAt\n  updatedAt\n  clientId\n  clientName\n  clientSecret\n  redirectUris\n  scopes\n  description\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}\n\nquery RegisteredClient($id: ID!) {\n  registeredClient(id: $id) {\n    ...RegisteredClientFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RegisteredClients($fullPath: String!, $first: Int!, $after: String, $filterBy: RegisteredClientFilter, $orderBy: RegisteredClientOrder) {\n  registeredClients(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...RegisteredClientFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query RegisteredClients($fullPath: String!, $first: Int!, $after: String, $filterBy: RegisteredClientFilter, $orderBy: RegisteredClientOrder) {\n  registeredClients(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...RegisteredClientFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}"): (typeof documents)["mutation ResetPassword($input: ResetPasswordInput!) {\n  payload: resetPassword(input: $input) {\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query RevisionPath($fullPath: String!, $revisionPath: String) {\n  repository(fullPath: $fullPath) {\n    id\n    revisionPath(revisionPath: $revisionPath) {\n      id\n      revision\n      path\n      type\n    }\n  }\n}"): (typeof documents)["query RevisionPath($fullPath: String!, $revisionPath: String) {\n  repository(fullPath: $fullPath) {\n    id\n    revisionPath(revisionPath: $revisionPath) {\n      id\n      revision\n      path\n      type\n    }\n  }\n}"];
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
export function graphql(source: "mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"): (typeof documents)["mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {\n  payload: setPrimaryEmail(input: $input) {\n    email {\n      ...EmailFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment SshKeyFragment on SshKey {\n  id\n  createdAt\n  updatedAt\n  title\n  key\n  fingerprint\n  usages\n  lastUsedAt\n  expiresAt\n  isExpired\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}"): (typeof documents)["fragment SshKeyFragment on SshKey {\n  id\n  createdAt\n  updatedAt\n  title\n  key\n  fingerprint\n  usages\n  lastUsedAt\n  expiresAt\n  isExpired\n  namespace {\n    ...UserFragment\n    ...GroupFragment\n    ...ProjectFragment\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SshKeys($fullPath: String!, $first: Int!, $after: String, $filterBy: SshKeyFilter, $orderBy: SshKeyOrder) {\n  sshKeys(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...SshKeyFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"): (typeof documents)["query SshKeys($fullPath: String!, $first: Int!, $after: String, $filterBy: SshKeyFilter, $orderBy: SshKeyOrder) {\n  sshKeys(\n    fullPath: $fullPath\n    first: $first\n    after: $after\n    filterBy: $filterBy\n    orderBy: $orderBy\n  ) {\n    edges {\n      node {\n        ...SshKeyFragment\n      }\n      cursor\n    }\n    pageInfo {\n      ...PageInfoFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TagFragment on Tag {\n  id\n  name\n  commit {\n    ...CommitFragment\n  }\n  tagger {\n    ...GitUserFragment\n  }\n  shortMessage\n  fullMessage\n}"): (typeof documents)["fragment TagFragment on Tag {\n  id\n  name\n  commit {\n    ...CommitFragment\n  }\n  tagger {\n    ...GitUserFragment\n  }\n  shortMessage\n  fullMessage\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Tags($fullPath: String!, $first: Int!, $after: String, $filterBy: TagFilter, $orderBy: TagOrder) {\n  repository(fullPath: $fullPath) {\n    id\n    tags(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n      edges {\n        node {\n          ...TagFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"): (typeof documents)["query Tags($fullPath: String!, $first: Int!, $after: String, $filterBy: TagFilter, $orderBy: TagOrder) {\n  repository(fullPath: $fullPath) {\n    id\n    tags(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {\n      edges {\n        node {\n          ...TagFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment TreeEntryFragment on TreeEntry {\n  id\n  name\n  path\n  mode\n  type\n}\n\nquery Tree($fullPath: String!, $revision: String!, $path: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    tree(revision: $revision, path: $path) {\n      edges {\n        node {\n          ...TreeEntryFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["fragment TreeEntryFragment on TreeEntry {\n  id\n  name\n  path\n  mode\n  type\n}\n\nquery Tree($fullPath: String!, $revision: String!, $path: String!) {\n  repository(fullPath: $fullPath) {\n    id\n    tree(revision: $revision, path: $path) {\n      edges {\n        node {\n          ...TreeEntryFragment\n        }\n        cursor\n      }\n      pageInfo {\n        ...PageInfoFragment\n      }\n    }\n  }\n  namespacePolicy(fullPath: $fullPath) {\n    ...PolicyFragment\n  }\n}"];
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
export function graphql(source: "mutation UpdateRegisteredClient($input: UpdateRegisteredClientInput!) {\n  payload: updateRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateRegisteredClient($input: UpdateRegisteredClientInput!) {\n  payload: updateRegisteredClient(input: $input) {\n    registeredClient {\n      ...RegisteredClientFragment\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateSshKey($input: UpdateSshKeyInput!) {\n  payload: updateSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}"): (typeof documents)["mutation UpdateSshKey($input: UpdateSshKeyInput!) {\n  payload: updateSshKey(input: $input) {\n    sshKey {\n      ...SshKeyFragment\n    }\n  }\n}"];
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
export function graphql(source: "query Viewer {\n  viewer {\n    ...UserFragment\n  }\n  viewerPolicy {\n    ...PolicyFragment\n  }\n}"): (typeof documents)["query Viewer {\n  viewer {\n    ...UserFragment\n  }\n  viewerPolicy {\n    ...PolicyFragment\n  }\n}"];
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