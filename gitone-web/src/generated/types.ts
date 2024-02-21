import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Long: { input: any; output: any; }
};

/**  member */
export enum Access {
  Maintainer = 'MAINTAINER',
  MinAccess = 'MIN_ACCESS',
  NoAccess = 'NO_ACCESS',
  Owner = 'OWNER',
  Reporter = 'REPORTER'
}

export enum Action {
  CreateMember = 'CREATE_MEMBER',
  Delete = 'DELETE',
  DeleteMember = 'DELETE_MEMBER',
  Read = 'READ',
  ReadMember = 'READ_MEMBER',
  Update = 'UPDATE',
  UpdateMember = 'UPDATE_MEMBER'
}

export type ActivateUserInput = {
  token: Scalars['String']['input'];
};

export type ActivateUserPayload = {
  __typename?: 'ActivateUserPayload';
  message?: Maybe<Scalars['String']['output']>;
};

/**  blob */
export type Blob = Node & {
  __typename?: 'Blob';
  id: Scalars['ID']['output'];
  lines?: Maybe<BlobLineConnection>;
  linesCount?: Maybe<Scalars['Int']['output']>;
  mode?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Long']['output']>;
};


/**  blob */
export type BlobLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
};

export type BlobLine = {
  __typename?: 'BlobLine';
  html?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type BlobLineConnection = {
  __typename?: 'BlobLineConnection';
  edges?: Maybe<Array<BlobLineEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type BlobLineEdge = {
  __typename?: 'BlobLineEdge';
  cursor: Scalars['String']['output'];
  node: BlobLine;
};

/**  branch */
export type Branch = {
  __typename?: 'Branch';
  commit?: Maybe<Commit>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type BranchConnection = {
  __typename?: 'BranchConnection';
  edges?: Maybe<Array<BranchEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type BranchEdge = {
  __typename?: 'BranchEdge';
  cursor: Scalars['String']['output'];
  node: Branch;
};

export type BranchFilter = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type BranchOrder = {
  direction: OrderDirection;
  field: BranchOrderField;
};

export enum BranchOrderField {
  AuthorDate = 'AUTHOR_DATE',
  CommitterDate = 'COMMITTER_DATE',
  Name = 'NAME'
}

/**  commit */
export type Commit = Node & {
  __typename?: 'Commit';
  author?: Maybe<GitUser>;
  committer?: Maybe<GitUser>;
  fullMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  parentShas?: Maybe<Array<Scalars['String']['output']>>;
  sha: Scalars['String']['output'];
  shortMessage?: Maybe<Scalars['String']['output']>;
};

export type CommitConnection = {
  __typename?: 'CommitConnection';
  edges?: Maybe<Array<CommitEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CommitEdge = {
  __typename?: 'CommitEdge';
  cursor: Scalars['String']['output'];
  node: Commit;
};

export type CommitFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  revision: Scalars['String']['input'];
};

export type ConfirmEmailInput = {
  token: Scalars['String']['input'];
};

export type ConfirmEmailPayload = {
  __typename?: 'ConfirmEmailPayload';
  email?: Maybe<Email>;
};

export type CreateBranchInput = {
  fullPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
  revision: Scalars['String']['input'];
};

export type CreateBranchPayload = {
  __typename?: 'CreateBranchPayload';
  branch: Branch;
  repositoryId: Scalars['ID']['output'];
};

export type CreateEmailInput = {
  email: Scalars['String']['input'];
};

export type CreateEmailPayload = {
  __typename?: 'CreateEmailPayload';
  email?: Maybe<Email>;
};

export type CreateGroupInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentId?: InputMaybe<Scalars['ID']['input']>;
  path: Scalars['String']['input'];
  visibility: Visibility;
};

export type CreateGroupPayload = {
  __typename?: 'CreateGroupPayload';
  group?: Maybe<Group>;
};

export type CreateMemberInput = {
  access: Access;
  fullPath: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type CreateMemberPayload = {
  __typename?: 'CreateMemberPayload';
  member?: Maybe<Member>;
};

export type CreateProjectInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  parentId: Scalars['ID']['input'];
  path: Scalars['String']['input'];
  visibility: Visibility;
};

export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  project?: Maybe<Project>;
};

export type CreateRegisteredClientInput = {
  clientName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fullPath: Scalars['String']['input'];
  redirectUris: Array<Scalars['String']['input']>;
  scopes: Array<Scalars['String']['input']>;
};

export type CreateRegisteredClientPayload = {
  __typename?: 'CreateRegisteredClientPayload';
  registeredClient?: Maybe<RegisteredClient>;
};

export type CreateSshKeyInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  fullPath: Scalars['String']['input'];
  key: Scalars['String']['input'];
  title: Scalars['String']['input'];
  usages: Array<SshKeyUsage>;
};

export type CreateSshKeyPayload = {
  __typename?: 'CreateSshKeyPayload';
  sshKey?: Maybe<SshKey>;
};

export type CreateTagInput = {
  fullPath: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
  revision: Scalars['String']['input'];
};

export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  repositoryId: Scalars['ID']['output'];
  tag: Tag;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  user?: Maybe<User>;
};

export type DeleteBranchInput = {
  fullPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DeleteBranchPayload = {
  __typename?: 'DeleteBranchPayload';
  branch: Branch;
  repositoryId: Scalars['ID']['output'];
};

export type DeleteEmailInput = {
  email: Scalars['String']['input'];
};

export type DeleteEmailPayload = {
  __typename?: 'DeleteEmailPayload';
  email?: Maybe<Email>;
};

export type DeleteGroupInput = {
  id: Scalars['ID']['input'];
};

export type DeleteGroupPayload = {
  __typename?: 'DeleteGroupPayload';
  group?: Maybe<Group>;
};

export type DeleteMemberInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMemberPayload = {
  __typename?: 'DeleteMemberPayload';
  member?: Maybe<Member>;
};

export type DeleteProjectInput = {
  id: Scalars['ID']['input'];
};

export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  project?: Maybe<Project>;
};

export type DeleteRegisteredClientInput = {
  id: Scalars['ID']['input'];
};

export type DeleteRegisteredClientPayload = {
  __typename?: 'DeleteRegisteredClientPayload';
  registeredClient?: Maybe<RegisteredClient>;
};

export type DeleteSshKeyInput = {
  id: Scalars['ID']['input'];
};

export type DeleteSshKeyPayload = {
  __typename?: 'DeleteSshKeyPayload';
  sshKey?: Maybe<SshKey>;
};

export type DeleteTagInput = {
  fullPath: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  repositoryId: Scalars['ID']['output'];
  tag: Tag;
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user?: Maybe<User>;
};

export type Diff = Node & {
  __typename?: 'Diff';
  diff?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lines?: Maybe<Array<DiffLine>>;
  newMode?: Maybe<Scalars['Int']['output']>;
  newPath?: Maybe<Scalars['String']['output']>;
  newSha?: Maybe<Scalars['String']['output']>;
  oldMode?: Maybe<Scalars['Int']['output']>;
  oldPath?: Maybe<Scalars['String']['output']>;
  oldSha?: Maybe<Scalars['String']['output']>;
  type?: Maybe<DiffType>;
};

export type DiffConnection = {
  __typename?: 'DiffConnection';
  edges?: Maybe<Array<DiffEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type DiffEdge = {
  __typename?: 'DiffEdge';
  cursor: Scalars['String']['output'];
  node: Diff;
};

export type DiffLine = {
  __typename?: 'DiffLine';
  html?: Maybe<Scalars['String']['output']>;
  newNumber: Scalars['Int']['output'];
  oldNumber: Scalars['Int']['output'];
  text?: Maybe<Scalars['String']['output']>;
  type: DiffLineType;
};

export enum DiffLineType {
  Add = 'ADD',
  Delete = 'DELETE',
  Expand = 'EXPAND',
  Match = 'MATCH',
  Meta = 'META'
}

/**  diff */
export enum DiffType {
  Add = 'ADD',
  Copy = 'COPY',
  Delete = 'DELETE',
  Modify = 'MODIFY',
  Rename = 'RENAME'
}

/**  email */
export type Email = Node & {
  __typename?: 'Email';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  primary: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EmailConnection = {
  __typename?: 'EmailConnection';
  edges?: Maybe<Array<EmailEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type EmailEdge = {
  __typename?: 'EmailEdge';
  cursor: Scalars['String']['output'];
  node: Email;
};

/**  git user */
export type GitUser = {
  __typename?: 'GitUser';
  date?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/**  group */
export type Group = Namespace & Node & {
  __typename?: 'Group';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  fullPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visibility: Visibility;
};

export type GroupConnection = {
  __typename?: 'GroupConnection';
  edges?: Maybe<Array<GroupEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type GroupEdge = {
  __typename?: 'GroupEdge';
  cursor: Scalars['String']['output'];
  node: Group;
};

export type GroupFilter = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<Visibility>;
};

export type GroupOrder = {
  direction: OrderDirection;
  field: GroupOrderField;
};

export enum GroupOrderField {
  CreatedAt = 'CREATED_AT',
  Path = 'PATH',
  UpdatedAt = 'UPDATED_AT'
}

export type Member = {
  __typename?: 'Member';
  access?: Maybe<Access>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  namespace?: Maybe<Namespace>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user?: Maybe<User>;
};

export type MemberConnection = {
  __typename?: 'MemberConnection';
  edges?: Maybe<Array<MemberEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type MemberEdge = {
  __typename?: 'MemberEdge';
  cursor: Scalars['String']['output'];
  node: Member;
};

export type MemberFilter = {
  access?: InputMaybe<Access>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type MemberOrder = {
  direction: OrderDirection;
  field: MemberOrderField;
};

export enum MemberOrderField {
  Access = 'ACCESS',
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
  Username = 'USERNAME'
}

export type Mutation = {
  __typename?: 'Mutation';
  activateUser?: Maybe<ActivateUserPayload>;
  confirmEmail?: Maybe<ConfirmEmailPayload>;
  /**  repository */
  createBranch?: Maybe<CreateBranchPayload>;
  createEmail?: Maybe<CreateEmailPayload>;
  /**  group */
  createGroup?: Maybe<CreateGroupPayload>;
  /**  member */
  createMember?: Maybe<CreateMemberPayload>;
  /**  project */
  createProject?: Maybe<CreateProjectPayload>;
  /**  oauth2 / open connect id */
  createRegisteredClient?: Maybe<CreateRegisteredClientPayload>;
  /**  ssh key */
  createSshKey?: Maybe<CreateSshKeyPayload>;
  createTag?: Maybe<CreateTagPayload>;
  /**  user */
  createUser?: Maybe<CreateUserPayload>;
  deleteBranch?: Maybe<DeleteBranchPayload>;
  deleteEmail?: Maybe<DeleteEmailPayload>;
  deleteGroup?: Maybe<DeleteGroupPayload>;
  deleteMember?: Maybe<DeleteMemberPayload>;
  deleteProject?: Maybe<DeleteProjectPayload>;
  deleteRegisteredClient?: Maybe<DeleteRegisteredClientPayload>;
  deleteSshKey?: Maybe<DeleteSshKeyPayload>;
  deleteTag?: Maybe<DeleteTagPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  resetPassword?: Maybe<ResetPasswordPayload>;
  sendActivationEmail?: Maybe<SendActivationEmailPayload>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>;
  setPrimaryEmail?: Maybe<SetPrimaryEmailPayload>;
  updateActivationEmail?: Maybe<UpdateActivationEmailPayload>;
  updateGroup?: Maybe<UpdateGroupPayload>;
  updateMember?: Maybe<UpdateMemberPayload>;
  updatePassword?: Maybe<UpdatePasswordPayload>;
  updatePath?: Maybe<UpdatePathPayload>;
  updateProject?: Maybe<UpdateProjectPayload>;
  updateRegisteredClient?: Maybe<UpdateRegisteredClientPayload>;
  updateSshKey?: Maybe<UpdateSshKeyPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  /**  namespaces */
  updateVisibility?: Maybe<UpdateVisibilityPayload>;
};


export type MutationActivateUserArgs = {
  input: ActivateUserInput;
};


export type MutationConfirmEmailArgs = {
  input: ConfirmEmailInput;
};


export type MutationCreateBranchArgs = {
  input: CreateBranchInput;
};


export type MutationCreateEmailArgs = {
  input: CreateEmailInput;
};


export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateRegisteredClientArgs = {
  input: CreateRegisteredClientInput;
};


export type MutationCreateSshKeyArgs = {
  input: CreateSshKeyInput;
};


export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteBranchArgs = {
  input: DeleteBranchInput;
};


export type MutationDeleteEmailArgs = {
  input: DeleteEmailInput;
};


export type MutationDeleteGroupArgs = {
  input: DeleteGroupInput;
};


export type MutationDeleteMemberArgs = {
  input: DeleteMemberInput;
};


export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


export type MutationDeleteRegisteredClientArgs = {
  input: DeleteRegisteredClientInput;
};


export type MutationDeleteSshKeyArgs = {
  input: DeleteSshKeyInput;
};


export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
};


export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendActivationEmailArgs = {
  input: SendActivationEmailInput;
};


export type MutationSendPasswordResetEmailArgs = {
  input: SendPasswordResetEmailInput;
};


export type MutationSetPrimaryEmailArgs = {
  input: SetPrimaryEmailInput;
};


export type MutationUpdateActivationEmailArgs = {
  input: UpdateActivationEmailInput;
};


export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};


export type MutationUpdateMemberArgs = {
  input: UpdateMemberInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdatePathArgs = {
  input: UpdatePathInput;
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


export type MutationUpdateRegisteredClientArgs = {
  input: UpdateRegisteredClientInput;
};


export type MutationUpdateSshKeyArgs = {
  input: UpdateSshKeyInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateVisibilityArgs = {
  input: UpdateVisibilityInput;
};

export type Namespace = {
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  fullPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visibility: Visibility;
};

export type NamespaceConnection = {
  __typename?: 'NamespaceConnection';
  edges?: Maybe<Array<NamespaceEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type NamespaceEdge = {
  __typename?: 'NamespaceEdge';
  cursor: Scalars['String']['output'];
  node: Namespace;
};

export type NamespaceFilter = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
  types?: InputMaybe<Array<NamespaceType>>;
  username?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<Visibility>;
};

export type NamespaceOrder = {
  direction: OrderDirection;
  field: NamespaceOrderField;
};

export enum NamespaceOrderField {
  CreatedAt = 'CREATED_AT',
  Path = 'PATH',
  UpdatedAt = 'UPDATED_AT'
}

/**  namespace */
export enum NamespaceType {
  Group = 'GROUP',
  Project = 'PROJECT',
  User = 'USER'
}

export type Node = {
  id: Scalars['ID']['output'];
};

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Policy = Node & {
  __typename?: 'Policy';
  access: Access;
  actions: Array<Action>;
  id: Scalars['ID']['output'];
};

/**  project */
export type Project = Namespace & Node & {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  fullPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visibility: Visibility;
};

export type ProjectConnection = {
  __typename?: 'ProjectConnection';
  edges?: Maybe<Array<ProjectEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type ProjectEdge = {
  __typename?: 'ProjectEdge';
  cursor: Scalars['String']['output'];
  node: Project;
};

export type ProjectFilter = {
  parentId?: InputMaybe<Scalars['ID']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  recursive?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<Visibility>;
};

export type ProjectOrder = {
  direction: OrderDirection;
  field: ProjectOrderField;
};

export enum ProjectOrderField {
  CreatedAt = 'CREATED_AT',
  Path = 'PATH',
  UpdatedAt = 'UPDATED_AT'
}

export type Query = {
  __typename?: 'Query';
  existEmail: Scalars['Boolean']['output'];
  existFullPath: Scalars['Boolean']['output'];
  group: Group;
  groups?: Maybe<GroupConnection>;
  members?: Maybe<MemberConnection>;
  namespace: Namespace;
  namespacePolicy: Policy;
  namespaces?: Maybe<NamespaceConnection>;
  ping: Scalars['String']['output'];
  project: Project;
  projects?: Maybe<ProjectConnection>;
  registeredClient: RegisteredClient;
  registeredClients?: Maybe<RegisteredClientConnection>;
  repository: Repository;
  sshKeys?: Maybe<SshKeyConnection>;
  user: User;
  users?: Maybe<UserConnection>;
  viewer: User;
  viewerPolicy: Policy;
};


export type QueryExistEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryExistFullPathArgs = {
  fullPath: Scalars['String']['input'];
};


export type QueryGroupArgs = {
  fullPath: Scalars['String']['input'];
};


export type QueryGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<GroupFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<GroupOrder>;
};


export type QueryMembersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<MemberFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  fullPath: Scalars['String']['input'];
  orderBy?: InputMaybe<MemberOrder>;
};


export type QueryNamespaceArgs = {
  fullPath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNamespacePolicyArgs = {
  fullPath?: InputMaybe<Scalars['String']['input']>;
};


export type QueryNamespacesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<NamespaceFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<NamespaceOrder>;
};


export type QueryProjectArgs = {
  fullPath: Scalars['String']['input'];
};


export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProjectOrder>;
};


export type QueryRegisteredClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRegisteredClientsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<RegisteredClientFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  fullPath: Scalars['String']['input'];
  orderBy?: InputMaybe<RegisteredClientOrder>;
};


export type QueryRepositoryArgs = {
  fullPath: Scalars['String']['input'];
};


export type QuerySshKeysArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<SshKeyFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  fullPath: Scalars['String']['input'];
  orderBy?: InputMaybe<SshKeyOrder>;
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<UserOrder>;
};

/**  oauth2 */
export type RegisteredClient = Node & {
  __typename?: 'RegisteredClient';
  clientId?: Maybe<Scalars['String']['output']>;
  clientName?: Maybe<Scalars['String']['output']>;
  clientSecret?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  namespace?: Maybe<Namespace>;
  redirectUris?: Maybe<Array<Scalars['String']['output']>>;
  scopes?: Maybe<Array<Scalars['String']['output']>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type RegisteredClientConnection = {
  __typename?: 'RegisteredClientConnection';
  edges?: Maybe<Array<RegisteredClientEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type RegisteredClientEdge = {
  __typename?: 'RegisteredClientEdge';
  cursor: Scalars['String']['output'];
  node: RegisteredClient;
};

export type RegisteredClientFilter = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type RegisteredClientOrder = {
  direction: OrderDirection;
  field: RegisteredClientOrderField;
};

export enum RegisteredClientOrderField {
  ClientId = 'CLIENT_ID',
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

/**  repository */
export type Repository = Node & {
  __typename?: 'Repository';
  blob?: Maybe<Blob>;
  branches?: Maybe<BranchConnection>;
  commit?: Maybe<Commit>;
  commits?: Maybe<CommitConnection>;
  defaultBranch?: Maybe<Branch>;
  diffs?: Maybe<DiffConnection>;
  empty?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  revisionPath?: Maybe<RevisionPath>;
  tags?: Maybe<TagConnection>;
  tree?: Maybe<TreeEntryConnection>;
};


/**  repository */
export type RepositoryBlobArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['String']['input']>;
};


/**  repository */
export type RepositoryBranchesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<BranchFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<BranchOrder>;
};


/**  repository */
export type RepositoryCommitArgs = {
  revision?: InputMaybe<Scalars['String']['input']>;
};


/**  repository */
export type RepositoryCommitsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy: CommitFilter;
  first?: InputMaybe<Scalars['Int']['input']>;
};


/**  repository */
export type RepositoryDiffsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  newRevision: Scalars['String']['input'];
  oldRevision?: InputMaybe<Scalars['String']['input']>;
};


/**  repository */
export type RepositoryRevisionPathArgs = {
  revisionPath?: InputMaybe<Scalars['String']['input']>;
};


/**  repository */
export type RepositoryTagsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<TagFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<TagOrder>;
};


/**  repository */
export type RepositoryTreeArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
  revision?: InputMaybe<Scalars['String']['input']>;
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  message?: Maybe<Scalars['String']['output']>;
};

/**  revision path */
export type RevisionPath = Node & {
  __typename?: 'RevisionPath';
  id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
  revision: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type SendActivationEmailInput = {
  email?: InputMaybe<Scalars['String']['input']>;
};

export type SendActivationEmailPayload = {
  __typename?: 'SendActivationEmailPayload';
  message?: Maybe<Scalars['String']['output']>;
};

export type SendPasswordResetEmailInput = {
  email: Scalars['String']['input'];
};

export type SendPasswordResetEmailPayload = {
  __typename?: 'SendPasswordResetEmailPayload';
  message?: Maybe<Scalars['String']['output']>;
};

export type SetPrimaryEmailInput = {
  email: Scalars['String']['input'];
};

export type SetPrimaryEmailPayload = {
  __typename?: 'SetPrimaryEmailPayload';
  email?: Maybe<Email>;
};

export type SshKey = Node & {
  __typename?: 'SshKey';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  fingerprint?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isExpired?: Maybe<Scalars['Boolean']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  namespace?: Maybe<Namespace>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  usages?: Maybe<Array<SshKeyUsage>>;
};

export type SshKeyConnection = {
  __typename?: 'SshKeyConnection';
  edges?: Maybe<Array<SshKeyEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type SshKeyEdge = {
  __typename?: 'SshKeyEdge';
  cursor: Scalars['String']['output'];
  node: SshKey;
};

export type SshKeyFilter = {
  fingerprint?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type SshKeyOrder = {
  direction: OrderDirection;
  field: SshKeyOrderField;
};

export enum SshKeyOrderField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT'
}

/**  ssh key */
export enum SshKeyUsage {
  Read = 'READ',
  Write = 'WRITE'
}

/**  tag */
export type Tag = {
  __typename?: 'Tag';
  commit?: Maybe<Commit>;
  fullMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  shortMessage?: Maybe<Scalars['String']['output']>;
  tagger?: Maybe<GitUser>;
};

export type TagConnection = {
  __typename?: 'TagConnection';
  edges?: Maybe<Array<TagEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TagEdge = {
  __typename?: 'TagEdge';
  cursor: Scalars['String']['output'];
  node: Tag;
};

export type TagFilter = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type TagOrder = {
  direction: OrderDirection;
  field: TagOrderField;
};

export enum TagOrderField {
  AuthorDate = 'AUTHOR_DATE',
  CommitterDate = 'COMMITTER_DATE',
  Name = 'NAME'
}

/**  tree */
export type TreeEntry = Node & {
  __typename?: 'TreeEntry';
  id: Scalars['ID']['output'];
  mode?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  sha?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type TreeEntryConnection = {
  __typename?: 'TreeEntryConnection';
  edges?: Maybe<Array<TreeEntryEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type TreeEntryEdge = {
  __typename?: 'TreeEntryEdge';
  cursor: Scalars['String']['output'];
  node: TreeEntry;
};

export type UpdateActivationEmailInput = {
  email: Scalars['String']['input'];
};

export type UpdateActivationEmailPayload = {
  __typename?: 'UpdateActivationEmailPayload';
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateGroupInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateGroupPayload = {
  __typename?: 'UpdateGroupPayload';
  group?: Maybe<Group>;
};

export type UpdateMemberInput = {
  access: Access;
  id: Scalars['ID']['input'];
};

export type UpdateMemberPayload = {
  __typename?: 'UpdateMemberPayload';
  member?: Maybe<Member>;
};

export type UpdatePasswordInput = {
  oldPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  passwordConfirmation: Scalars['String']['input'];
};

export type UpdatePasswordPayload = {
  __typename?: 'UpdatePasswordPayload';
  user?: Maybe<User>;
};

export type UpdatePathInput = {
  fullPath: Scalars['String']['input'];
  path: Scalars['String']['input'];
};

export type UpdatePathPayload = {
  __typename?: 'UpdatePathPayload';
  namespace?: Maybe<Namespace>;
};

export type UpdateProjectInput = {
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  project?: Maybe<Project>;
};

export type UpdateRegisteredClientInput = {
  clientName: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  redirectUris: Array<Scalars['String']['input']>;
  scopes: Array<Scalars['String']['input']>;
};

export type UpdateRegisteredClientPayload = {
  __typename?: 'UpdateRegisteredClientPayload';
  registeredClient?: Maybe<RegisteredClient>;
};

export type UpdateSshKeyInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  title: Scalars['String']['input'];
  usages: Array<SshKeyUsage>;
};

export type UpdateSshKeyPayload = {
  __typename?: 'UpdateSshKeyPayload';
  sshKey?: Maybe<SshKey>;
};

export type UpdateUserInput = {
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  websiteUrl: Scalars['String']['input'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<User>;
};

export type UpdateVisibilityInput = {
  fullPath: Scalars['String']['input'];
  visibility: Visibility;
};

export type UpdateVisibilityPayload = {
  __typename?: 'UpdateVisibilityPayload';
  namespace?: Maybe<Namespace>;
};

/**  user */
export type User = Namespace & Node & {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  emails?: Maybe<EmailConnection>;
  fullName?: Maybe<Scalars['String']['output']>;
  fullPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Role>;
  unconfirmedEmails?: Maybe<EmailConnection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  visibility: Visibility;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges?: Maybe<Array<UserEdge>>;
  pageInfo?: Maybe<PageInfo>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String']['output'];
  node: User;
};

export type UserFilter = {
  query?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrder = {
  direction: OrderDirection;
  field: UserOrderField;
};

export enum UserOrderField {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
  Username = 'USERNAME'
}

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ActivateUserMutationVariables = Exact<{
  input: ActivateUserInput;
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ActivateUserPayload', message?: string | null } | null };

export type BlobFragmentFragment = { __typename?: 'Blob', id: string, sha?: string | null, path?: string | null, name?: string | null, size?: any | null, linesCount?: number | null, lines?: { __typename?: 'BlobLineConnection', edges?: Array<{ __typename?: 'BlobLineEdge', cursor: string, node: { __typename?: 'BlobLine', number?: number | null, html?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type BlobQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type BlobQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, blob?: { __typename?: 'Blob', id: string, sha?: string | null, path?: string | null, name?: string | null, size?: any | null, linesCount?: number | null, lines?: { __typename?: 'BlobLineConnection', edges?: Array<{ __typename?: 'BlobLineEdge', cursor: string, node: { __typename?: 'BlobLine', number?: number | null, html?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } | null }, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type BlobLinesQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  path: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlobLinesQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, blob?: { __typename?: 'Blob', id: string, lines?: { __typename?: 'BlobLineConnection', edges?: Array<{ __typename?: 'BlobLineEdge', cursor: string, node: { __typename?: 'BlobLine', number?: number | null, html?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } | null } };

export type BranchFragmentFragment = { __typename?: 'Branch', id: string, name: string, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null };

export type BranchesQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<BranchFilter>;
  orderBy?: InputMaybe<BranchOrder>;
}>;


export type BranchesQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, branches?: { __typename?: 'BranchConnection', edges?: Array<{ __typename?: 'BranchEdge', cursor: string, node: { __typename?: 'Branch', id: string, name: string, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } };

export type CommitFragmentFragment = { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null };

export type CommitQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision?: InputMaybe<Scalars['String']['input']>;
}>;


export type CommitQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null }, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type CommitsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy: CommitFilter;
}>;


export type CommitsQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, commits?: { __typename?: 'CommitConnection', edges?: Array<{ __typename?: 'CommitEdge', cursor: string, node: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } };

export type ConfirmEmailMutationVariables = Exact<{
  input: ConfirmEmailInput;
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ConfirmEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type CreateBranchMutationVariables = Exact<{
  input: CreateBranchInput;
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateBranchPayload', repositoryId: string, branch: { __typename?: 'Branch', id: string, name: string, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null } } | null };

export type CreateEmailMutationVariables = Exact<{
  input: CreateEmailInput;
}>;


export type CreateEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateGroupPayload', group?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | null } | null };

export type CreateMemberMutationVariables = Exact<{
  input: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateMemberPayload', member?: { __typename?: 'Member', id: string, createdAt?: any | null, updatedAt?: any | null, access?: Access | null, user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateProjectPayload', project?: { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | null } | null };

export type CreateRegisteredClientMutationVariables = Exact<{
  input: CreateRegisteredClientInput;
}>;


export type CreateRegisteredClientMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateRegisteredClientPayload', registeredClient?: { __typename?: 'RegisteredClient', id: string, createdAt?: any | null, updatedAt?: any | null, clientId?: string | null, clientName?: string | null, clientSecret?: string | null, redirectUris?: Array<string> | null, scopes?: Array<string> | null, description?: string | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type CreateSshKeyMutationVariables = Exact<{
  input: CreateSshKeyInput;
}>;


export type CreateSshKeyMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateSshKeyPayload', sshKey?: { __typename?: 'SshKey', id: string, createdAt?: any | null, updatedAt?: any | null, title?: string | null, key?: string | null, fingerprint?: string | null, usages?: Array<SshKeyUsage> | null, lastUsedAt?: any | null, expiresAt?: any | null, isExpired?: boolean | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateTagPayload', repositoryId: string, tag: { __typename?: 'Tag', id: string, name: string, shortMessage?: string | null, fullMessage?: string | null, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null, tagger?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null };

export type DeleteBranchMutationVariables = Exact<{
  input: DeleteBranchInput;
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteBranchPayload', repositoryId: string, branch: { __typename?: 'Branch', id: string, name: string, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null } } | null };

export type DeleteEmailMutationVariables = Exact<{
  input: DeleteEmailInput;
}>;


export type DeleteEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type DeleteMemberMutationVariables = Exact<{
  input: DeleteMemberInput;
}>;


export type DeleteMemberMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteMemberPayload', member?: { __typename?: 'Member', id: string, createdAt?: any | null, updatedAt?: any | null, access?: Access | null, user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type DeleteRegisteredClientMutationVariables = Exact<{
  input: DeleteRegisteredClientInput;
}>;


export type DeleteRegisteredClientMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteRegisteredClientPayload', registeredClient?: { __typename?: 'RegisteredClient', id: string, createdAt?: any | null, updatedAt?: any | null, clientId?: string | null, clientName?: string | null, clientSecret?: string | null, redirectUris?: Array<string> | null, scopes?: Array<string> | null, description?: string | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type DeleteSshKeyMutationVariables = Exact<{
  input: DeleteSshKeyInput;
}>;


export type DeleteSshKeyMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteSshKeyPayload', sshKey?: { __typename?: 'SshKey', id: string, createdAt?: any | null, updatedAt?: any | null, title?: string | null, key?: string | null, fingerprint?: string | null, usages?: Array<SshKeyUsage> | null, lastUsedAt?: any | null, expiresAt?: any | null, isExpired?: boolean | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type DeleteTagMutationVariables = Exact<{
  input: DeleteTagInput;
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteTagPayload', repositoryId: string, tag: { __typename?: 'Tag', id: string, name: string, shortMessage?: string | null, fullMessage?: string | null, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null, tagger?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } } | null };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteUserPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null };

export type DiffFragmentFragment = { __typename?: 'Diff', id: string, type?: DiffType | null, oldPath?: string | null, newPath?: string | null, oldSha?: string | null, newSha?: string | null, lines?: Array<{ __typename?: 'DiffLine', type: DiffLineType, oldNumber: number, newNumber: number, text?: string | null, html?: string | null }> | null };

export type DiffsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  oldRevision?: InputMaybe<Scalars['String']['input']>;
  newRevision: Scalars['String']['input'];
}>;


export type DiffsQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, diffs?: { __typename?: 'DiffConnection', edges?: Array<{ __typename?: 'DiffEdge', cursor: string, node: { __typename?: 'Diff', id: string, type?: DiffType | null, oldPath?: string | null, newPath?: string | null, oldSha?: string | null, newSha?: string | null, lines?: Array<{ __typename?: 'DiffLine', type: DiffLineType, oldNumber: number, newNumber: number, text?: string | null, html?: string | null }> | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } };

export type EmailFragmentFragment = { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean };

export type ExistEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ExistEmailQuery = { __typename?: 'Query', existEmail: boolean };

export type ExistFullPathQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type ExistFullPathQuery = { __typename?: 'Query', existFullPath: boolean };

export type GitUserFragmentFragment = { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null };

export type GroupFragmentFragment = { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null };

export type GroupQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type GroupQuery = { __typename?: 'Query', group: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null }, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type GroupsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<GroupFilter>;
  orderBy?: InputMaybe<GroupOrder>;
}>;


export type GroupsQuery = { __typename?: 'Query', groups?: { __typename?: 'GroupConnection', edges?: Array<{ __typename?: 'GroupEdge', cursor: string, node: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type MemberFragmentFragment = { __typename?: 'Member', id: string, createdAt?: any | null, updatedAt?: any | null, access?: Access | null, user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null };

export type MembersQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<MemberFilter>;
  orderBy?: InputMaybe<MemberOrder>;
}>;


export type MembersQuery = { __typename?: 'Query', members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', cursor: string, node: { __typename?: 'Member', id: string, createdAt?: any | null, updatedAt?: any | null, access?: Access | null, user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type NamespaceQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type NamespaceQuery = { __typename?: 'Query', namespace: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null }, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type NamespacesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<NamespaceFilter>;
  orderBy?: InputMaybe<NamespaceOrder>;
}>;


export type NamespacesQuery = { __typename?: 'Query', namespaces?: { __typename?: 'NamespaceConnection', edges?: Array<{ __typename?: 'NamespaceEdge', cursor: string, node: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type PageInfoFragmentFragment = { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };

export type PolicyFragmentFragment = { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> };

export type ProjectFragmentFragment = { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null };

export type ProjectQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revisionPath: Scalars['String']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null }, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> }, repository: { __typename?: 'Repository', id: string, empty?: boolean | null, defaultBranch?: { __typename?: 'Branch', name: string } | null, revisionPath?: { __typename?: 'RevisionPath', id: string, revision: string, path: string, type: string } | null } };

export type ProjectsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<ProjectFilter>;
  orderBy?: InputMaybe<ProjectOrder>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor: string, node: { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type RegisteredClientFragmentFragment = { __typename?: 'RegisteredClient', id: string, createdAt?: any | null, updatedAt?: any | null, clientId?: string | null, clientName?: string | null, clientSecret?: string | null, redirectUris?: Array<string> | null, scopes?: Array<string> | null, description?: string | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null };

export type RegisteredClientQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RegisteredClientQuery = { __typename?: 'Query', registeredClient: { __typename?: 'RegisteredClient', id: string, createdAt?: any | null, updatedAt?: any | null, clientId?: string | null, clientName?: string | null, clientSecret?: string | null, redirectUris?: Array<string> | null, scopes?: Array<string> | null, description?: string | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } };

export type RegisteredClientsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<RegisteredClientFilter>;
  orderBy?: InputMaybe<RegisteredClientOrder>;
}>;


export type RegisteredClientsQuery = { __typename?: 'Query', registeredClients?: { __typename?: 'RegisteredClientConnection', edges?: Array<{ __typename?: 'RegisteredClientEdge', cursor: string, node: { __typename?: 'RegisteredClient', id: string, createdAt?: any | null, updatedAt?: any | null, clientId?: string | null, clientName?: string | null, clientSecret?: string | null, redirectUris?: Array<string> | null, scopes?: Array<string> | null, description?: string | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ResetPasswordPayload', message?: string | null } | null };

export type RevisionPathQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revisionPath?: InputMaybe<Scalars['String']['input']>;
}>;


export type RevisionPathQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, revisionPath?: { __typename?: 'RevisionPath', id: string, revision: string, path: string, type: string } | null } };

export type SendActivationEmailMutationVariables = Exact<{
  input: SendActivationEmailInput;
}>;


export type SendActivationEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SendActivationEmailPayload', message?: string | null } | null };

export type SendPasswordResetEmailMutationVariables = Exact<{
  input: SendPasswordResetEmailInput;
}>;


export type SendPasswordResetEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SendPasswordResetEmailPayload', message?: string | null } | null };

export type SetPrimaryEmailMutationVariables = Exact<{
  input: SetPrimaryEmailInput;
}>;


export type SetPrimaryEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SetPrimaryEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type SshKeyFragmentFragment = { __typename?: 'SshKey', id: string, createdAt?: any | null, updatedAt?: any | null, title?: string | null, key?: string | null, fingerprint?: string | null, usages?: Array<SshKeyUsage> | null, lastUsedAt?: any | null, expiresAt?: any | null, isExpired?: boolean | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null };

export type SshKeysQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<SshKeyFilter>;
  orderBy?: InputMaybe<SshKeyOrder>;
}>;


export type SshKeysQuery = { __typename?: 'Query', sshKeys?: { __typename?: 'SshKeyConnection', edges?: Array<{ __typename?: 'SshKeyEdge', cursor: string, node: { __typename?: 'SshKey', id: string, createdAt?: any | null, updatedAt?: any | null, title?: string | null, key?: string | null, fingerprint?: string | null, usages?: Array<SshKeyUsage> | null, lastUsedAt?: any | null, expiresAt?: any | null, isExpired?: boolean | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type TagFragmentFragment = { __typename?: 'Tag', id: string, name: string, shortMessage?: string | null, fullMessage?: string | null, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null, tagger?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null };

export type TagsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<TagFilter>;
  orderBy?: InputMaybe<TagOrder>;
}>;


export type TagsQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, tags?: { __typename?: 'TagConnection', edges?: Array<{ __typename?: 'TagEdge', cursor: string, node: { __typename?: 'Tag', id: string, name: string, shortMessage?: string | null, fullMessage?: string | null, commit?: { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null, committer?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } | null, tagger?: { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } };

export type TreeEntryFragmentFragment = { __typename?: 'TreeEntry', id: string, name?: string | null, path?: string | null, mode?: number | null, type?: string | null };

export type TreeQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type TreeQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, tree?: { __typename?: 'TreeEntryConnection', edges?: Array<{ __typename?: 'TreeEntryEdge', cursor: string, node: { __typename?: 'TreeEntry', id: string, name?: string | null, path?: string | null, mode?: number | null, type?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null }, namespacePolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type UpdateActivationEmailMutationVariables = Exact<{
  input: UpdateActivationEmailInput;
}>;


export type UpdateActivationEmailMutation = { __typename?: 'Mutation', updateActivationEmail?: { __typename?: 'UpdateActivationEmailPayload', message?: string | null } | null };

export type UpdateGroupMutationVariables = Exact<{
  input: UpdateGroupInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateGroupPayload', group?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | null } | null };

export type UpdateMemberMutationVariables = Exact<{
  input: UpdateMemberInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateMemberPayload', member?: { __typename?: 'Member', id: string, createdAt?: any | null, updatedAt?: any | null, access?: Access | null, user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdatePasswordPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null };

export type UpdatePathMutationVariables = Exact<{
  input: UpdatePathInput;
}>;


export type UpdatePathMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdatePathPayload', namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateProjectPayload', project?: { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | null } | null };

export type UpdateRegisteredClientMutationVariables = Exact<{
  input: UpdateRegisteredClientInput;
}>;


export type UpdateRegisteredClientMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateRegisteredClientPayload', registeredClient?: { __typename?: 'RegisteredClient', id: string, createdAt?: any | null, updatedAt?: any | null, clientId?: string | null, clientName?: string | null, clientSecret?: string | null, redirectUris?: Array<string> | null, scopes?: Array<string> | null, description?: string | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type UpdateSshKeyMutationVariables = Exact<{
  input: UpdateSshKeyInput;
}>;


export type UpdateSshKeyMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateSshKeyPayload', sshKey?: { __typename?: 'SshKey', id: string, createdAt?: any | null, updatedAt?: any | null, title?: string | null, key?: string | null, fingerprint?: string | null, usages?: Array<SshKeyUsage> | null, lastUsedAt?: any | null, expiresAt?: any | null, isExpired?: boolean | null, namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateUserPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null, location?: string | null, websiteUrl?: string | null } | null } | null };

export type UpdateVisibilityMutationVariables = Exact<{
  input: UpdateVisibilityInput;
}>;


export type UpdateVisibilityMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateVisibilityPayload', namespace?: { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } | { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } | null } | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null };

export type UserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } };

export type UserDetailFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null, location?: string | null, websiteUrl?: string | null };

export type UserDetailQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserDetailQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null, location?: string | null, websiteUrl?: string | null } };

export type UsersQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<UserOrder>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserConnection', edges?: Array<{ __typename?: 'UserEdge', cursor: string, node: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null }, viewerPolicy: { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } };

export type ViewerDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerDetailQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null, location?: string | null, websiteUrl?: string | null } };

export type ViewerEmailsQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerEmailsQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, emails?: { __typename?: 'EmailConnection', edges?: Array<{ __typename?: 'EmailEdge', cursor: string, node: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null, unconfirmedEmails?: { __typename?: 'EmailConnection', edges?: Array<{ __typename?: 'EmailEdge', cursor: string, node: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } };

export const PageInfoFragmentFragmentDoc = gql`
    fragment PageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `;
export const BlobFragmentFragmentDoc = gql`
    fragment BlobFragment on Blob {
  id
  sha
  path
  name
  size
  linesCount
  lines {
    edges {
      node {
        number
        html
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${PageInfoFragmentFragmentDoc}`;
export const GitUserFragmentFragmentDoc = gql`
    fragment GitUserFragment on GitUser {
  name
  email
  date
}
    `;
export const CommitFragmentFragmentDoc = gql`
    fragment CommitFragment on Commit {
  id
  sha
  parentShas
  author {
    ...GitUserFragment
  }
  committer {
    ...GitUserFragment
  }
  shortMessage
  fullMessage
}
    ${GitUserFragmentFragmentDoc}`;
export const BranchFragmentFragmentDoc = gql`
    fragment BranchFragment on Branch {
  id
  name
  commit {
    ...CommitFragment
  }
}
    ${CommitFragmentFragmentDoc}`;
export const DiffFragmentFragmentDoc = gql`
    fragment DiffFragment on Diff {
  id
  type
  oldPath
  newPath
  oldSha
  newSha
  lines {
    type
    oldNumber
    newNumber
    text
    html
  }
}
    `;
export const EmailFragmentFragmentDoc = gql`
    fragment EmailFragment on Email {
  id
  createdAt
  updatedAt
  email
  primary
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  createdAt
  updatedAt
  name
  path
  fullName
  fullPath
  username
  visibility
  description
  avatarUrl
}
    `;
export const GroupFragmentFragmentDoc = gql`
    fragment GroupFragment on Group {
  id
  createdAt
  updatedAt
  name
  path
  fullName
  fullPath
  visibility
  description
}
    `;
export const ProjectFragmentFragmentDoc = gql`
    fragment ProjectFragment on Project {
  id
  createdAt
  updatedAt
  name
  path
  fullName
  fullPath
  visibility
  description
}
    `;
export const MemberFragmentFragmentDoc = gql`
    fragment MemberFragment on Member {
  id
  createdAt
  updatedAt
  access
  user {
    ...UserFragment
  }
  namespace {
    ...UserFragment
    ...GroupFragment
    ...ProjectFragment
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export const PolicyFragmentFragmentDoc = gql`
    fragment PolicyFragment on Policy {
  id
  access
  actions
}
    `;
export const RegisteredClientFragmentFragmentDoc = gql`
    fragment RegisteredClientFragment on RegisteredClient {
  id
  createdAt
  updatedAt
  clientId
  clientName
  clientSecret
  redirectUris
  scopes
  description
  namespace {
    ...UserFragment
    ...GroupFragment
    ...ProjectFragment
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export const SshKeyFragmentFragmentDoc = gql`
    fragment SshKeyFragment on SshKey {
  id
  createdAt
  updatedAt
  title
  key
  fingerprint
  usages
  lastUsedAt
  expiresAt
  isExpired
  namespace {
    ...UserFragment
    ...GroupFragment
    ...ProjectFragment
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export const TagFragmentFragmentDoc = gql`
    fragment TagFragment on Tag {
  id
  name
  commit {
    ...CommitFragment
  }
  tagger {
    ...GitUserFragment
  }
  shortMessage
  fullMessage
}
    ${CommitFragmentFragmentDoc}
${GitUserFragmentFragmentDoc}`;
export const TreeEntryFragmentFragmentDoc = gql`
    fragment TreeEntryFragment on TreeEntry {
  id
  name
  path
  mode
  type
}
    `;
export const UserDetailFragmentFragmentDoc = gql`
    fragment UserDetailFragment on User {
  id
  createdAt
  updatedAt
  name
  path
  fullName
  fullPath
  username
  visibility
  description
  avatarUrl
  location
  websiteUrl
}
    `;
export const ActivateUserDocument = gql`
    mutation ActivateUser($input: ActivateUserInput!) {
  payload: activateUser(input: $input) {
    message
  }
}
    `;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const BlobDocument = gql`
    query Blob($fullPath: String!, $revision: String!, $path: String!) {
  repository(fullPath: $fullPath) {
    id
    blob(revision: $revision, path: $path) {
      ...BlobFragment
    }
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
}
    ${BlobFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useBlobQuery__
 *
 * To run a query within a React component, call `useBlobQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlobQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      revision: // value for 'revision'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useBlobQuery(baseOptions: Apollo.QueryHookOptions<BlobQuery, BlobQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlobQuery, BlobQueryVariables>(BlobDocument, options);
      }
export function useBlobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlobQuery, BlobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlobQuery, BlobQueryVariables>(BlobDocument, options);
        }
export type BlobQueryHookResult = ReturnType<typeof useBlobQuery>;
export type BlobLazyQueryHookResult = ReturnType<typeof useBlobLazyQuery>;
export type BlobQueryResult = Apollo.QueryResult<BlobQuery, BlobQueryVariables>;
export const BlobLinesDocument = gql`
    query BlobLines($fullPath: String!, $revision: String!, $path: String!, $first: Int!, $after: String) {
  repository(fullPath: $fullPath) {
    id
    blob(revision: $revision, path: $path) {
      id
      lines(first: $first, after: $after) {
        edges {
          node {
            number
            html
          }
          cursor
        }
        pageInfo {
          ...PageInfoFragment
        }
      }
    }
  }
}
    ${PageInfoFragmentFragmentDoc}`;

/**
 * __useBlobLinesQuery__
 *
 * To run a query within a React component, call `useBlobLinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlobLinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlobLinesQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      revision: // value for 'revision'
 *      path: // value for 'path'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useBlobLinesQuery(baseOptions: Apollo.QueryHookOptions<BlobLinesQuery, BlobLinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlobLinesQuery, BlobLinesQueryVariables>(BlobLinesDocument, options);
      }
export function useBlobLinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlobLinesQuery, BlobLinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlobLinesQuery, BlobLinesQueryVariables>(BlobLinesDocument, options);
        }
export type BlobLinesQueryHookResult = ReturnType<typeof useBlobLinesQuery>;
export type BlobLinesLazyQueryHookResult = ReturnType<typeof useBlobLinesLazyQuery>;
export type BlobLinesQueryResult = Apollo.QueryResult<BlobLinesQuery, BlobLinesQueryVariables>;
export const BranchesDocument = gql`
    query Branches($fullPath: String!, $first: Int!, $after: String, $filterBy: BranchFilter, $orderBy: BranchOrder) {
  repository(fullPath: $fullPath) {
    id
    branches(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {
      edges {
        node {
          ...BranchFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
}
    ${BranchFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useBranchesQuery__
 *
 * To run a query within a React component, call `useBranchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBranchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBranchesQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useBranchesQuery(baseOptions: Apollo.QueryHookOptions<BranchesQuery, BranchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, options);
      }
export function useBranchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BranchesQuery, BranchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BranchesQuery, BranchesQueryVariables>(BranchesDocument, options);
        }
export type BranchesQueryHookResult = ReturnType<typeof useBranchesQuery>;
export type BranchesLazyQueryHookResult = ReturnType<typeof useBranchesLazyQuery>;
export type BranchesQueryResult = Apollo.QueryResult<BranchesQuery, BranchesQueryVariables>;
export const CommitDocument = gql`
    query Commit($fullPath: String!, $revision: String) {
  repository(fullPath: $fullPath) {
    id
    commit(revision: $revision) {
      ...CommitFragment
    }
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
}
    ${CommitFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useCommitQuery__
 *
 * To run a query within a React component, call `useCommitQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommitQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      revision: // value for 'revision'
 *   },
 * });
 */
export function useCommitQuery(baseOptions: Apollo.QueryHookOptions<CommitQuery, CommitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommitQuery, CommitQueryVariables>(CommitDocument, options);
      }
export function useCommitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommitQuery, CommitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommitQuery, CommitQueryVariables>(CommitDocument, options);
        }
export type CommitQueryHookResult = ReturnType<typeof useCommitQuery>;
export type CommitLazyQueryHookResult = ReturnType<typeof useCommitLazyQuery>;
export type CommitQueryResult = Apollo.QueryResult<CommitQuery, CommitQueryVariables>;
export const CommitsDocument = gql`
    query Commits($fullPath: String!, $first: Int!, $after: String, $filterBy: CommitFilter!) {
  repository(fullPath: $fullPath) {
    id
    commits(first: $first, after: $after, filterBy: $filterBy) {
      edges {
        node {
          ...CommitFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
}
    ${CommitFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useCommitsQuery__
 *
 * To run a query within a React component, call `useCommitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommitsQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *   },
 * });
 */
export function useCommitsQuery(baseOptions: Apollo.QueryHookOptions<CommitsQuery, CommitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommitsQuery, CommitsQueryVariables>(CommitsDocument, options);
      }
export function useCommitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommitsQuery, CommitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommitsQuery, CommitsQueryVariables>(CommitsDocument, options);
        }
export type CommitsQueryHookResult = ReturnType<typeof useCommitsQuery>;
export type CommitsLazyQueryHookResult = ReturnType<typeof useCommitsLazyQuery>;
export type CommitsQueryResult = Apollo.QueryResult<CommitsQuery, CommitsQueryVariables>;
export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($input: ConfirmEmailInput!) {
  payload: confirmEmail(input: $input) {
    email {
      ...EmailFragment
    }
  }
}
    ${EmailFragmentFragmentDoc}`;
export type ConfirmEmailMutationFn = Apollo.MutationFunction<ConfirmEmailMutation, ConfirmEmailMutationVariables>;

/**
 * __useConfirmEmailMutation__
 *
 * To run a mutation, you first call `useConfirmEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmEmailMutation, { data, loading, error }] = useConfirmEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmEmailMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument, options);
      }
export type ConfirmEmailMutationHookResult = ReturnType<typeof useConfirmEmailMutation>;
export type ConfirmEmailMutationResult = Apollo.MutationResult<ConfirmEmailMutation>;
export type ConfirmEmailMutationOptions = Apollo.BaseMutationOptions<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateBranchDocument = gql`
    mutation CreateBranch($input: CreateBranchInput!) {
  payload: createBranch(input: $input) {
    repositoryId
    branch {
      ...BranchFragment
    }
  }
}
    ${BranchFragmentFragmentDoc}`;
export type CreateBranchMutationFn = Apollo.MutationFunction<CreateBranchMutation, CreateBranchMutationVariables>;

/**
 * __useCreateBranchMutation__
 *
 * To run a mutation, you first call `useCreateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchMutation, { data, loading, error }] = useCreateBranchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBranchMutation(baseOptions?: Apollo.MutationHookOptions<CreateBranchMutation, CreateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBranchMutation, CreateBranchMutationVariables>(CreateBranchDocument, options);
      }
export type CreateBranchMutationHookResult = ReturnType<typeof useCreateBranchMutation>;
export type CreateBranchMutationResult = Apollo.MutationResult<CreateBranchMutation>;
export type CreateBranchMutationOptions = Apollo.BaseMutationOptions<CreateBranchMutation, CreateBranchMutationVariables>;
export const CreateEmailDocument = gql`
    mutation CreateEmail($input: CreateEmailInput!) {
  payload: createEmail(input: $input) {
    email {
      ...EmailFragment
    }
  }
}
    ${EmailFragmentFragmentDoc}`;
export type CreateEmailMutationFn = Apollo.MutationFunction<CreateEmailMutation, CreateEmailMutationVariables>;

/**
 * __useCreateEmailMutation__
 *
 * To run a mutation, you first call `useCreateEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEmailMutation, { data, loading, error }] = useCreateEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEmailMutation(baseOptions?: Apollo.MutationHookOptions<CreateEmailMutation, CreateEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateEmailMutation, CreateEmailMutationVariables>(CreateEmailDocument, options);
      }
export type CreateEmailMutationHookResult = ReturnType<typeof useCreateEmailMutation>;
export type CreateEmailMutationResult = Apollo.MutationResult<CreateEmailMutation>;
export type CreateEmailMutationOptions = Apollo.BaseMutationOptions<CreateEmailMutation, CreateEmailMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($input: CreateGroupInput!) {
  payload: createGroup(input: $input) {
    group {
      ...GroupFragment
    }
  }
}
    ${GroupFragmentFragmentDoc}`;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateMemberDocument = gql`
    mutation CreateMember($input: CreateMemberInput!) {
  payload: createMember(input: $input) {
    member {
      ...MemberFragment
    }
  }
}
    ${MemberFragmentFragmentDoc}`;
export type CreateMemberMutationFn = Apollo.MutationFunction<CreateMemberMutation, CreateMemberMutationVariables>;

/**
 * __useCreateMemberMutation__
 *
 * To run a mutation, you first call `useCreateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberMutation, { data, loading, error }] = useCreateMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMemberMutation(baseOptions?: Apollo.MutationHookOptions<CreateMemberMutation, CreateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMemberMutation, CreateMemberMutationVariables>(CreateMemberDocument, options);
      }
export type CreateMemberMutationHookResult = ReturnType<typeof useCreateMemberMutation>;
export type CreateMemberMutationResult = Apollo.MutationResult<CreateMemberMutation>;
export type CreateMemberMutationOptions = Apollo.BaseMutationOptions<CreateMemberMutation, CreateMemberMutationVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($input: CreateProjectInput!) {
  payload: createProject(input: $input) {
    project {
      ...ProjectFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateRegisteredClientDocument = gql`
    mutation CreateRegisteredClient($input: CreateRegisteredClientInput!) {
  payload: createRegisteredClient(input: $input) {
    registeredClient {
      ...RegisteredClientFragment
    }
  }
}
    ${RegisteredClientFragmentFragmentDoc}`;
export type CreateRegisteredClientMutationFn = Apollo.MutationFunction<CreateRegisteredClientMutation, CreateRegisteredClientMutationVariables>;

/**
 * __useCreateRegisteredClientMutation__
 *
 * To run a mutation, you first call `useCreateRegisteredClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRegisteredClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRegisteredClientMutation, { data, loading, error }] = useCreateRegisteredClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRegisteredClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateRegisteredClientMutation, CreateRegisteredClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRegisteredClientMutation, CreateRegisteredClientMutationVariables>(CreateRegisteredClientDocument, options);
      }
export type CreateRegisteredClientMutationHookResult = ReturnType<typeof useCreateRegisteredClientMutation>;
export type CreateRegisteredClientMutationResult = Apollo.MutationResult<CreateRegisteredClientMutation>;
export type CreateRegisteredClientMutationOptions = Apollo.BaseMutationOptions<CreateRegisteredClientMutation, CreateRegisteredClientMutationVariables>;
export const CreateSshKeyDocument = gql`
    mutation CreateSshKey($input: CreateSshKeyInput!) {
  payload: createSshKey(input: $input) {
    sshKey {
      ...SshKeyFragment
    }
  }
}
    ${SshKeyFragmentFragmentDoc}`;
export type CreateSshKeyMutationFn = Apollo.MutationFunction<CreateSshKeyMutation, CreateSshKeyMutationVariables>;

/**
 * __useCreateSshKeyMutation__
 *
 * To run a mutation, you first call `useCreateSshKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSshKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSshKeyMutation, { data, loading, error }] = useCreateSshKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSshKeyMutation(baseOptions?: Apollo.MutationHookOptions<CreateSshKeyMutation, CreateSshKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSshKeyMutation, CreateSshKeyMutationVariables>(CreateSshKeyDocument, options);
      }
export type CreateSshKeyMutationHookResult = ReturnType<typeof useCreateSshKeyMutation>;
export type CreateSshKeyMutationResult = Apollo.MutationResult<CreateSshKeyMutation>;
export type CreateSshKeyMutationOptions = Apollo.BaseMutationOptions<CreateSshKeyMutation, CreateSshKeyMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($input: CreateTagInput!) {
  payload: createTag(input: $input) {
    repositoryId
    tag {
      ...TagFragment
    }
  }
}
    ${TagFragmentFragmentDoc}`;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  payload: createUser(input: $input) {
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteBranchDocument = gql`
    mutation DeleteBranch($input: DeleteBranchInput!) {
  payload: deleteBranch(input: $input) {
    repositoryId
    branch {
      ...BranchFragment
    }
  }
}
    ${BranchFragmentFragmentDoc}`;
export type DeleteBranchMutationFn = Apollo.MutationFunction<DeleteBranchMutation, DeleteBranchMutationVariables>;

/**
 * __useDeleteBranchMutation__
 *
 * To run a mutation, you first call `useDeleteBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBranchMutation, { data, loading, error }] = useDeleteBranchMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteBranchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBranchMutation, DeleteBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBranchMutation, DeleteBranchMutationVariables>(DeleteBranchDocument, options);
      }
export type DeleteBranchMutationHookResult = ReturnType<typeof useDeleteBranchMutation>;
export type DeleteBranchMutationResult = Apollo.MutationResult<DeleteBranchMutation>;
export type DeleteBranchMutationOptions = Apollo.BaseMutationOptions<DeleteBranchMutation, DeleteBranchMutationVariables>;
export const DeleteEmailDocument = gql`
    mutation DeleteEmail($input: DeleteEmailInput!) {
  payload: deleteEmail(input: $input) {
    email {
      ...EmailFragment
    }
  }
}
    ${EmailFragmentFragmentDoc}`;
export type DeleteEmailMutationFn = Apollo.MutationFunction<DeleteEmailMutation, DeleteEmailMutationVariables>;

/**
 * __useDeleteEmailMutation__
 *
 * To run a mutation, you first call `useDeleteEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEmailMutation, { data, loading, error }] = useDeleteEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteEmailMutation(baseOptions?: Apollo.MutationHookOptions<DeleteEmailMutation, DeleteEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteEmailMutation, DeleteEmailMutationVariables>(DeleteEmailDocument, options);
      }
export type DeleteEmailMutationHookResult = ReturnType<typeof useDeleteEmailMutation>;
export type DeleteEmailMutationResult = Apollo.MutationResult<DeleteEmailMutation>;
export type DeleteEmailMutationOptions = Apollo.BaseMutationOptions<DeleteEmailMutation, DeleteEmailMutationVariables>;
export const DeleteMemberDocument = gql`
    mutation DeleteMember($input: DeleteMemberInput!) {
  payload: deleteMember(input: $input) {
    member {
      ...MemberFragment
    }
  }
}
    ${MemberFragmentFragmentDoc}`;
export type DeleteMemberMutationFn = Apollo.MutationFunction<DeleteMemberMutation, DeleteMemberMutationVariables>;

/**
 * __useDeleteMemberMutation__
 *
 * To run a mutation, you first call `useDeleteMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMemberMutation, { data, loading, error }] = useDeleteMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteMemberMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMemberMutation, DeleteMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMemberMutation, DeleteMemberMutationVariables>(DeleteMemberDocument, options);
      }
export type DeleteMemberMutationHookResult = ReturnType<typeof useDeleteMemberMutation>;
export type DeleteMemberMutationResult = Apollo.MutationResult<DeleteMemberMutation>;
export type DeleteMemberMutationOptions = Apollo.BaseMutationOptions<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const DeleteRegisteredClientDocument = gql`
    mutation DeleteRegisteredClient($input: DeleteRegisteredClientInput!) {
  payload: deleteRegisteredClient(input: $input) {
    registeredClient {
      ...RegisteredClientFragment
    }
  }
}
    ${RegisteredClientFragmentFragmentDoc}`;
export type DeleteRegisteredClientMutationFn = Apollo.MutationFunction<DeleteRegisteredClientMutation, DeleteRegisteredClientMutationVariables>;

/**
 * __useDeleteRegisteredClientMutation__
 *
 * To run a mutation, you first call `useDeleteRegisteredClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRegisteredClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRegisteredClientMutation, { data, loading, error }] = useDeleteRegisteredClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteRegisteredClientMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRegisteredClientMutation, DeleteRegisteredClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRegisteredClientMutation, DeleteRegisteredClientMutationVariables>(DeleteRegisteredClientDocument, options);
      }
export type DeleteRegisteredClientMutationHookResult = ReturnType<typeof useDeleteRegisteredClientMutation>;
export type DeleteRegisteredClientMutationResult = Apollo.MutationResult<DeleteRegisteredClientMutation>;
export type DeleteRegisteredClientMutationOptions = Apollo.BaseMutationOptions<DeleteRegisteredClientMutation, DeleteRegisteredClientMutationVariables>;
export const DeleteSshKeyDocument = gql`
    mutation DeleteSshKey($input: DeleteSshKeyInput!) {
  payload: deleteSshKey(input: $input) {
    sshKey {
      ...SshKeyFragment
    }
  }
}
    ${SshKeyFragmentFragmentDoc}`;
export type DeleteSshKeyMutationFn = Apollo.MutationFunction<DeleteSshKeyMutation, DeleteSshKeyMutationVariables>;

/**
 * __useDeleteSshKeyMutation__
 *
 * To run a mutation, you first call `useDeleteSshKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSshKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSshKeyMutation, { data, loading, error }] = useDeleteSshKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSshKeyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSshKeyMutation, DeleteSshKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSshKeyMutation, DeleteSshKeyMutationVariables>(DeleteSshKeyDocument, options);
      }
export type DeleteSshKeyMutationHookResult = ReturnType<typeof useDeleteSshKeyMutation>;
export type DeleteSshKeyMutationResult = Apollo.MutationResult<DeleteSshKeyMutation>;
export type DeleteSshKeyMutationOptions = Apollo.BaseMutationOptions<DeleteSshKeyMutation, DeleteSshKeyMutationVariables>;
export const DeleteTagDocument = gql`
    mutation DeleteTag($input: DeleteTagInput!) {
  payload: deleteTag(input: $input) {
    repositoryId
    tag {
      ...TagFragment
    }
  }
}
    ${TagFragmentFragmentDoc}`;
export type DeleteTagMutationFn = Apollo.MutationFunction<DeleteTagMutation, DeleteTagMutationVariables>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagMutation, DeleteTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(DeleteTagDocument, options);
      }
export type DeleteTagMutationHookResult = ReturnType<typeof useDeleteTagMutation>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<DeleteTagMutation, DeleteTagMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($input: DeleteUserInput!) {
  payload: deleteUser(input: $input) {
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const DiffsDocument = gql`
    query Diffs($fullPath: String!, $after: String, $oldRevision: String, $newRevision: String!) {
  repository(fullPath: $fullPath) {
    id
    diffs(
      first: 20
      after: $after
      oldRevision: $oldRevision
      newRevision: $newRevision
    ) {
      edges {
        node {
          ...DiffFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
}
    ${DiffFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useDiffsQuery__
 *
 * To run a query within a React component, call `useDiffsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDiffsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDiffsQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      after: // value for 'after'
 *      oldRevision: // value for 'oldRevision'
 *      newRevision: // value for 'newRevision'
 *   },
 * });
 */
export function useDiffsQuery(baseOptions: Apollo.QueryHookOptions<DiffsQuery, DiffsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DiffsQuery, DiffsQueryVariables>(DiffsDocument, options);
      }
export function useDiffsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DiffsQuery, DiffsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DiffsQuery, DiffsQueryVariables>(DiffsDocument, options);
        }
export type DiffsQueryHookResult = ReturnType<typeof useDiffsQuery>;
export type DiffsLazyQueryHookResult = ReturnType<typeof useDiffsLazyQuery>;
export type DiffsQueryResult = Apollo.QueryResult<DiffsQuery, DiffsQueryVariables>;
export const ExistEmailDocument = gql`
    query ExistEmail($email: String!) {
  existEmail(email: $email)
}
    `;

/**
 * __useExistEmailQuery__
 *
 * To run a query within a React component, call `useExistEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useExistEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExistEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useExistEmailQuery(baseOptions: Apollo.QueryHookOptions<ExistEmailQuery, ExistEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExistEmailQuery, ExistEmailQueryVariables>(ExistEmailDocument, options);
      }
export function useExistEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExistEmailQuery, ExistEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExistEmailQuery, ExistEmailQueryVariables>(ExistEmailDocument, options);
        }
export type ExistEmailQueryHookResult = ReturnType<typeof useExistEmailQuery>;
export type ExistEmailLazyQueryHookResult = ReturnType<typeof useExistEmailLazyQuery>;
export type ExistEmailQueryResult = Apollo.QueryResult<ExistEmailQuery, ExistEmailQueryVariables>;
export const ExistFullPathDocument = gql`
    query ExistFullPath($fullPath: String!) {
  existFullPath(fullPath: $fullPath)
}
    `;

/**
 * __useExistFullPathQuery__
 *
 * To run a query within a React component, call `useExistFullPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useExistFullPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExistFullPathQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *   },
 * });
 */
export function useExistFullPathQuery(baseOptions: Apollo.QueryHookOptions<ExistFullPathQuery, ExistFullPathQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExistFullPathQuery, ExistFullPathQueryVariables>(ExistFullPathDocument, options);
      }
export function useExistFullPathLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExistFullPathQuery, ExistFullPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExistFullPathQuery, ExistFullPathQueryVariables>(ExistFullPathDocument, options);
        }
export type ExistFullPathQueryHookResult = ReturnType<typeof useExistFullPathQuery>;
export type ExistFullPathLazyQueryHookResult = ReturnType<typeof useExistFullPathLazyQuery>;
export type ExistFullPathQueryResult = Apollo.QueryResult<ExistFullPathQuery, ExistFullPathQueryVariables>;
export const GroupDocument = gql`
    query Group($fullPath: String!) {
  group(fullPath: $fullPath) {
    ...GroupFragment
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
}
    ${GroupFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *   },
 * });
 */
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;
export const GroupsDocument = gql`
    query Groups($first: Int!, $after: String, $filterBy: GroupFilter, $orderBy: GroupOrder) {
  groups(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {
    edges {
      node {
        ...GroupFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${GroupFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGroupsQuery(baseOptions: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
export const MembersDocument = gql`
    query Members($fullPath: String!, $first: Int!, $after: String, $filterBy: MemberFilter, $orderBy: MemberOrder) {
  members(
    fullPath: $fullPath
    first: $first
    after: $after
    filterBy: $filterBy
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...MemberFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
}
    ${MemberFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useMembersQuery__
 *
 * To run a query within a React component, call `useMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMembersQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useMembersQuery(baseOptions: Apollo.QueryHookOptions<MembersQuery, MembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
      }
export function useMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MembersQuery, MembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MembersQuery, MembersQueryVariables>(MembersDocument, options);
        }
export type MembersQueryHookResult = ReturnType<typeof useMembersQuery>;
export type MembersLazyQueryHookResult = ReturnType<typeof useMembersLazyQuery>;
export type MembersQueryResult = Apollo.QueryResult<MembersQuery, MembersQueryVariables>;
export const NamespaceDocument = gql`
    query Namespace($fullPath: String!) {
  namespace(fullPath: $fullPath) {
    ...UserFragment
    ...GroupFragment
    ...ProjectFragment
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useNamespaceQuery__
 *
 * To run a query within a React component, call `useNamespaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNamespaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNamespaceQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *   },
 * });
 */
export function useNamespaceQuery(baseOptions: Apollo.QueryHookOptions<NamespaceQuery, NamespaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NamespaceQuery, NamespaceQueryVariables>(NamespaceDocument, options);
      }
export function useNamespaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NamespaceQuery, NamespaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NamespaceQuery, NamespaceQueryVariables>(NamespaceDocument, options);
        }
export type NamespaceQueryHookResult = ReturnType<typeof useNamespaceQuery>;
export type NamespaceLazyQueryHookResult = ReturnType<typeof useNamespaceLazyQuery>;
export type NamespaceQueryResult = Apollo.QueryResult<NamespaceQuery, NamespaceQueryVariables>;
export const NamespacesDocument = gql`
    query Namespaces($first: Int!, $after: String, $filterBy: NamespaceFilter, $orderBy: NamespaceOrder) {
  namespaces(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {
    edges {
      node {
        ...UserFragment
        ...GroupFragment
        ...ProjectFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useNamespacesQuery__
 *
 * To run a query within a React component, call `useNamespacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useNamespacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNamespacesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useNamespacesQuery(baseOptions: Apollo.QueryHookOptions<NamespacesQuery, NamespacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, options);
      }
export function useNamespacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NamespacesQuery, NamespacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NamespacesQuery, NamespacesQueryVariables>(NamespacesDocument, options);
        }
export type NamespacesQueryHookResult = ReturnType<typeof useNamespacesQuery>;
export type NamespacesLazyQueryHookResult = ReturnType<typeof useNamespacesLazyQuery>;
export type NamespacesQueryResult = Apollo.QueryResult<NamespacesQuery, NamespacesQueryVariables>;
export const PingDocument = gql`
    query Ping {
  ping
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
      }
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;
export const ProjectDocument = gql`
    query Project($fullPath: String!, $revisionPath: String!) {
  project(fullPath: $fullPath) {
    ...ProjectFragment
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
  repository(fullPath: $fullPath) {
    id
    empty
    defaultBranch {
      name
    }
    revisionPath(revisionPath: $revisionPath) {
      id
      revision
      path
      type
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      revisionPath: // value for 'revisionPath'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($first: Int!, $after: String, $filterBy: ProjectFilter, $orderBy: ProjectOrder) {
  projects(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {
    edges {
      node {
        ...ProjectFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;
export const RegisteredClientDocument = gql`
    query RegisteredClient($id: ID!) {
  registeredClient(id: $id) {
    ...RegisteredClientFragment
  }
}
    ${RegisteredClientFragmentFragmentDoc}`;

/**
 * __useRegisteredClientQuery__
 *
 * To run a query within a React component, call `useRegisteredClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegisteredClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegisteredClientQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRegisteredClientQuery(baseOptions: Apollo.QueryHookOptions<RegisteredClientQuery, RegisteredClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RegisteredClientQuery, RegisteredClientQueryVariables>(RegisteredClientDocument, options);
      }
export function useRegisteredClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RegisteredClientQuery, RegisteredClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RegisteredClientQuery, RegisteredClientQueryVariables>(RegisteredClientDocument, options);
        }
export type RegisteredClientQueryHookResult = ReturnType<typeof useRegisteredClientQuery>;
export type RegisteredClientLazyQueryHookResult = ReturnType<typeof useRegisteredClientLazyQuery>;
export type RegisteredClientQueryResult = Apollo.QueryResult<RegisteredClientQuery, RegisteredClientQueryVariables>;
export const RegisteredClientsDocument = gql`
    query RegisteredClients($fullPath: String!, $first: Int!, $after: String, $filterBy: RegisteredClientFilter, $orderBy: RegisteredClientOrder) {
  registeredClients(
    fullPath: $fullPath
    first: $first
    after: $after
    filterBy: $filterBy
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...RegisteredClientFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${RegisteredClientFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useRegisteredClientsQuery__
 *
 * To run a query within a React component, call `useRegisteredClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegisteredClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegisteredClientsQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useRegisteredClientsQuery(baseOptions: Apollo.QueryHookOptions<RegisteredClientsQuery, RegisteredClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RegisteredClientsQuery, RegisteredClientsQueryVariables>(RegisteredClientsDocument, options);
      }
export function useRegisteredClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RegisteredClientsQuery, RegisteredClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RegisteredClientsQuery, RegisteredClientsQueryVariables>(RegisteredClientsDocument, options);
        }
export type RegisteredClientsQueryHookResult = ReturnType<typeof useRegisteredClientsQuery>;
export type RegisteredClientsLazyQueryHookResult = ReturnType<typeof useRegisteredClientsLazyQuery>;
export type RegisteredClientsQueryResult = Apollo.QueryResult<RegisteredClientsQuery, RegisteredClientsQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  payload: resetPassword(input: $input) {
    message
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RevisionPathDocument = gql`
    query RevisionPath($fullPath: String!, $revisionPath: String) {
  repository(fullPath: $fullPath) {
    id
    revisionPath(revisionPath: $revisionPath) {
      id
      revision
      path
      type
    }
  }
}
    `;

/**
 * __useRevisionPathQuery__
 *
 * To run a query within a React component, call `useRevisionPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useRevisionPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRevisionPathQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      revisionPath: // value for 'revisionPath'
 *   },
 * });
 */
export function useRevisionPathQuery(baseOptions: Apollo.QueryHookOptions<RevisionPathQuery, RevisionPathQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RevisionPathQuery, RevisionPathQueryVariables>(RevisionPathDocument, options);
      }
export function useRevisionPathLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RevisionPathQuery, RevisionPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RevisionPathQuery, RevisionPathQueryVariables>(RevisionPathDocument, options);
        }
export type RevisionPathQueryHookResult = ReturnType<typeof useRevisionPathQuery>;
export type RevisionPathLazyQueryHookResult = ReturnType<typeof useRevisionPathLazyQuery>;
export type RevisionPathQueryResult = Apollo.QueryResult<RevisionPathQuery, RevisionPathQueryVariables>;
export const SendActivationEmailDocument = gql`
    mutation SendActivationEmail($input: SendActivationEmailInput!) {
  payload: sendActivationEmail(input: $input) {
    message
  }
}
    `;
export type SendActivationEmailMutationFn = Apollo.MutationFunction<SendActivationEmailMutation, SendActivationEmailMutationVariables>;

/**
 * __useSendActivationEmailMutation__
 *
 * To run a mutation, you first call `useSendActivationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendActivationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendActivationEmailMutation, { data, loading, error }] = useSendActivationEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendActivationEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendActivationEmailMutation, SendActivationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendActivationEmailMutation, SendActivationEmailMutationVariables>(SendActivationEmailDocument, options);
      }
export type SendActivationEmailMutationHookResult = ReturnType<typeof useSendActivationEmailMutation>;
export type SendActivationEmailMutationResult = Apollo.MutationResult<SendActivationEmailMutation>;
export type SendActivationEmailMutationOptions = Apollo.BaseMutationOptions<SendActivationEmailMutation, SendActivationEmailMutationVariables>;
export const SendPasswordResetEmailDocument = gql`
    mutation SendPasswordResetEmail($input: SendPasswordResetEmailInput!) {
  payload: sendPasswordResetEmail(input: $input) {
    message
  }
}
    `;
export type SendPasswordResetEmailMutationFn = Apollo.MutationFunction<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;

/**
 * __useSendPasswordResetEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordResetEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordResetEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordResetEmailMutation, { data, loading, error }] = useSendPasswordResetEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendPasswordResetEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>(SendPasswordResetEmailDocument, options);
      }
export type SendPasswordResetEmailMutationHookResult = ReturnType<typeof useSendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationResult = Apollo.MutationResult<SendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationOptions = Apollo.BaseMutationOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export const SetPrimaryEmailDocument = gql`
    mutation SetPrimaryEmail($input: SetPrimaryEmailInput!) {
  payload: setPrimaryEmail(input: $input) {
    email {
      ...EmailFragment
    }
  }
}
    ${EmailFragmentFragmentDoc}`;
export type SetPrimaryEmailMutationFn = Apollo.MutationFunction<SetPrimaryEmailMutation, SetPrimaryEmailMutationVariables>;

/**
 * __useSetPrimaryEmailMutation__
 *
 * To run a mutation, you first call `useSetPrimaryEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPrimaryEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPrimaryEmailMutation, { data, loading, error }] = useSetPrimaryEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetPrimaryEmailMutation(baseOptions?: Apollo.MutationHookOptions<SetPrimaryEmailMutation, SetPrimaryEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetPrimaryEmailMutation, SetPrimaryEmailMutationVariables>(SetPrimaryEmailDocument, options);
      }
export type SetPrimaryEmailMutationHookResult = ReturnType<typeof useSetPrimaryEmailMutation>;
export type SetPrimaryEmailMutationResult = Apollo.MutationResult<SetPrimaryEmailMutation>;
export type SetPrimaryEmailMutationOptions = Apollo.BaseMutationOptions<SetPrimaryEmailMutation, SetPrimaryEmailMutationVariables>;
export const SshKeysDocument = gql`
    query SshKeys($fullPath: String!, $first: Int!, $after: String, $filterBy: SshKeyFilter, $orderBy: SshKeyOrder) {
  sshKeys(
    fullPath: $fullPath
    first: $first
    after: $after
    filterBy: $filterBy
    orderBy: $orderBy
  ) {
    edges {
      node {
        ...SshKeyFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${SshKeyFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useSshKeysQuery__
 *
 * To run a query within a React component, call `useSshKeysQuery` and pass it any options that fit your needs.
 * When your component renders, `useSshKeysQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSshKeysQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useSshKeysQuery(baseOptions: Apollo.QueryHookOptions<SshKeysQuery, SshKeysQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SshKeysQuery, SshKeysQueryVariables>(SshKeysDocument, options);
      }
export function useSshKeysLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SshKeysQuery, SshKeysQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SshKeysQuery, SshKeysQueryVariables>(SshKeysDocument, options);
        }
export type SshKeysQueryHookResult = ReturnType<typeof useSshKeysQuery>;
export type SshKeysLazyQueryHookResult = ReturnType<typeof useSshKeysLazyQuery>;
export type SshKeysQueryResult = Apollo.QueryResult<SshKeysQuery, SshKeysQueryVariables>;
export const TagsDocument = gql`
    query Tags($fullPath: String!, $first: Int!, $after: String, $filterBy: TagFilter, $orderBy: TagOrder) {
  repository(fullPath: $fullPath) {
    id
    tags(first: $first, after: $after, filterBy: $filterBy, orderBy: $orderBy) {
      edges {
        node {
          ...TagFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
}
    ${TagFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useTagsQuery(baseOptions: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const TreeDocument = gql`
    query Tree($fullPath: String!, $revision: String!, $path: String!) {
  repository(fullPath: $fullPath) {
    id
    tree(revision: $revision, path: $path) {
      edges {
        node {
          ...TreeEntryFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
  namespacePolicy(fullPath: $fullPath) {
    ...PolicyFragment
  }
}
    ${TreeEntryFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useTreeQuery__
 *
 * To run a query within a React component, call `useTreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTreeQuery({
 *   variables: {
 *      fullPath: // value for 'fullPath'
 *      revision: // value for 'revision'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useTreeQuery(baseOptions: Apollo.QueryHookOptions<TreeQuery, TreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TreeQuery, TreeQueryVariables>(TreeDocument, options);
      }
export function useTreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TreeQuery, TreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TreeQuery, TreeQueryVariables>(TreeDocument, options);
        }
export type TreeQueryHookResult = ReturnType<typeof useTreeQuery>;
export type TreeLazyQueryHookResult = ReturnType<typeof useTreeLazyQuery>;
export type TreeQueryResult = Apollo.QueryResult<TreeQuery, TreeQueryVariables>;
export const UpdateActivationEmailDocument = gql`
    mutation UpdateActivationEmail($input: UpdateActivationEmailInput!) {
  updateActivationEmail(input: $input) {
    message
  }
}
    `;
export type UpdateActivationEmailMutationFn = Apollo.MutationFunction<UpdateActivationEmailMutation, UpdateActivationEmailMutationVariables>;

/**
 * __useUpdateActivationEmailMutation__
 *
 * To run a mutation, you first call `useUpdateActivationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateActivationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateActivationEmailMutation, { data, loading, error }] = useUpdateActivationEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateActivationEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateActivationEmailMutation, UpdateActivationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateActivationEmailMutation, UpdateActivationEmailMutationVariables>(UpdateActivationEmailDocument, options);
      }
export type UpdateActivationEmailMutationHookResult = ReturnType<typeof useUpdateActivationEmailMutation>;
export type UpdateActivationEmailMutationResult = Apollo.MutationResult<UpdateActivationEmailMutation>;
export type UpdateActivationEmailMutationOptions = Apollo.BaseMutationOptions<UpdateActivationEmailMutation, UpdateActivationEmailMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($input: UpdateGroupInput!) {
  payload: updateGroup(input: $input) {
    group {
      ...GroupFragment
    }
  }
}
    ${GroupFragmentFragmentDoc}`;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateMemberDocument = gql`
    mutation UpdateMember($input: UpdateMemberInput!) {
  payload: updateMember(input: $input) {
    member {
      ...MemberFragment
    }
  }
}
    ${MemberFragmentFragmentDoc}`;
export type UpdateMemberMutationFn = Apollo.MutationFunction<UpdateMemberMutation, UpdateMemberMutationVariables>;

/**
 * __useUpdateMemberMutation__
 *
 * To run a mutation, you first call `useUpdateMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemberMutation, { data, loading, error }] = useUpdateMemberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMemberMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMemberMutation, UpdateMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMemberMutation, UpdateMemberMutationVariables>(UpdateMemberDocument, options);
      }
export type UpdateMemberMutationHookResult = ReturnType<typeof useUpdateMemberMutation>;
export type UpdateMemberMutationResult = Apollo.MutationResult<UpdateMemberMutation>;
export type UpdateMemberMutationOptions = Apollo.BaseMutationOptions<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation updatePassword($input: UpdatePasswordInput!) {
  payload: updatePassword(input: $input) {
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, options);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdatePathDocument = gql`
    mutation UpdatePath($input: UpdatePathInput!) {
  payload: updatePath(input: $input) {
    namespace {
      ...UserFragment
      ...GroupFragment
      ...ProjectFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export type UpdatePathMutationFn = Apollo.MutationFunction<UpdatePathMutation, UpdatePathMutationVariables>;

/**
 * __useUpdatePathMutation__
 *
 * To run a mutation, you first call `useUpdatePathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePathMutation, { data, loading, error }] = useUpdatePathMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePathMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePathMutation, UpdatePathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePathMutation, UpdatePathMutationVariables>(UpdatePathDocument, options);
      }
export type UpdatePathMutationHookResult = ReturnType<typeof useUpdatePathMutation>;
export type UpdatePathMutationResult = Apollo.MutationResult<UpdatePathMutation>;
export type UpdatePathMutationOptions = Apollo.BaseMutationOptions<UpdatePathMutation, UpdatePathMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($input: UpdateProjectInput!) {
  payload: updateProject(input: $input) {
    project {
      ...ProjectFragment
    }
  }
}
    ${ProjectFragmentFragmentDoc}`;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateRegisteredClientDocument = gql`
    mutation UpdateRegisteredClient($input: UpdateRegisteredClientInput!) {
  payload: updateRegisteredClient(input: $input) {
    registeredClient {
      ...RegisteredClientFragment
    }
  }
}
    ${RegisteredClientFragmentFragmentDoc}`;
export type UpdateRegisteredClientMutationFn = Apollo.MutationFunction<UpdateRegisteredClientMutation, UpdateRegisteredClientMutationVariables>;

/**
 * __useUpdateRegisteredClientMutation__
 *
 * To run a mutation, you first call `useUpdateRegisteredClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRegisteredClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRegisteredClientMutation, { data, loading, error }] = useUpdateRegisteredClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRegisteredClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRegisteredClientMutation, UpdateRegisteredClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRegisteredClientMutation, UpdateRegisteredClientMutationVariables>(UpdateRegisteredClientDocument, options);
      }
export type UpdateRegisteredClientMutationHookResult = ReturnType<typeof useUpdateRegisteredClientMutation>;
export type UpdateRegisteredClientMutationResult = Apollo.MutationResult<UpdateRegisteredClientMutation>;
export type UpdateRegisteredClientMutationOptions = Apollo.BaseMutationOptions<UpdateRegisteredClientMutation, UpdateRegisteredClientMutationVariables>;
export const UpdateSshKeyDocument = gql`
    mutation UpdateSshKey($input: UpdateSshKeyInput!) {
  payload: updateSshKey(input: $input) {
    sshKey {
      ...SshKeyFragment
    }
  }
}
    ${SshKeyFragmentFragmentDoc}`;
export type UpdateSshKeyMutationFn = Apollo.MutationFunction<UpdateSshKeyMutation, UpdateSshKeyMutationVariables>;

/**
 * __useUpdateSshKeyMutation__
 *
 * To run a mutation, you first call `useUpdateSshKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSshKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSshKeyMutation, { data, loading, error }] = useUpdateSshKeyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSshKeyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSshKeyMutation, UpdateSshKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSshKeyMutation, UpdateSshKeyMutationVariables>(UpdateSshKeyDocument, options);
      }
export type UpdateSshKeyMutationHookResult = ReturnType<typeof useUpdateSshKeyMutation>;
export type UpdateSshKeyMutationResult = Apollo.MutationResult<UpdateSshKeyMutation>;
export type UpdateSshKeyMutationOptions = Apollo.BaseMutationOptions<UpdateSshKeyMutation, UpdateSshKeyMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  payload: updateUser(input: $input) {
    user {
      ...UserDetailFragment
    }
  }
}
    ${UserDetailFragmentFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateVisibilityDocument = gql`
    mutation UpdateVisibility($input: UpdateVisibilityInput!) {
  payload: updateVisibility(input: $input) {
    namespace {
      ...UserFragment
      ...GroupFragment
      ...ProjectFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${GroupFragmentFragmentDoc}
${ProjectFragmentFragmentDoc}`;
export type UpdateVisibilityMutationFn = Apollo.MutationFunction<UpdateVisibilityMutation, UpdateVisibilityMutationVariables>;

/**
 * __useUpdateVisibilityMutation__
 *
 * To run a mutation, you first call `useUpdateVisibilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisibilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisibilityMutation, { data, loading, error }] = useUpdateVisibilityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateVisibilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisibilityMutation, UpdateVisibilityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisibilityMutation, UpdateVisibilityMutationVariables>(UpdateVisibilityDocument, options);
      }
export type UpdateVisibilityMutationHookResult = ReturnType<typeof useUpdateVisibilityMutation>;
export type UpdateVisibilityMutationResult = Apollo.MutationResult<UpdateVisibilityMutation>;
export type UpdateVisibilityMutationOptions = Apollo.BaseMutationOptions<UpdateVisibilityMutation, UpdateVisibilityMutationVariables>;
export const UserDocument = gql`
    query User($username: String!) {
  user(username: $username) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserDetailDocument = gql`
    query UserDetail($username: String!) {
  user(username: $username) {
    ...UserDetailFragment
  }
}
    ${UserDetailFragmentFragmentDoc}`;

/**
 * __useUserDetailQuery__
 *
 * To run a query within a React component, call `useUserDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserDetailQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUserDetailQuery(baseOptions: Apollo.QueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
      }
export function useUserDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserDetailQuery, UserDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserDetailQuery, UserDetailQueryVariables>(UserDetailDocument, options);
        }
export type UserDetailQueryHookResult = ReturnType<typeof useUserDetailQuery>;
export type UserDetailLazyQueryHookResult = ReturnType<typeof useUserDetailLazyQuery>;
export type UserDetailQueryResult = Apollo.QueryResult<UserDetailQuery, UserDetailQueryVariables>;
export const UsersDocument = gql`
    query Users($after: String, $filterBy: UserFilter, $orderBy: UserOrder) {
  users(after: $after, filterBy: $filterBy, orderBy: $orderBy) {
    edges {
      node {
        ...UserFragment
      }
      cursor
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      filterBy: // value for 'filterBy'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const ViewerDocument = gql`
    query Viewer {
  viewer {
    ...UserFragment
  }
  viewerPolicy {
    ...PolicyFragment
  }
}
    ${UserFragmentFragmentDoc}
${PolicyFragmentFragmentDoc}`;

/**
 * __useViewerQuery__
 *
 * To run a query within a React component, call `useViewerQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerQuery(baseOptions?: Apollo.QueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
      }
export function useViewerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerQuery, ViewerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerQuery, ViewerQueryVariables>(ViewerDocument, options);
        }
export type ViewerQueryHookResult = ReturnType<typeof useViewerQuery>;
export type ViewerLazyQueryHookResult = ReturnType<typeof useViewerLazyQuery>;
export type ViewerQueryResult = Apollo.QueryResult<ViewerQuery, ViewerQueryVariables>;
export const ViewerDetailDocument = gql`
    query ViewerDetail {
  viewer {
    ...UserDetailFragment
  }
}
    ${UserDetailFragmentFragmentDoc}`;

/**
 * __useViewerDetailQuery__
 *
 * To run a query within a React component, call `useViewerDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerDetailQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerDetailQuery(baseOptions?: Apollo.QueryHookOptions<ViewerDetailQuery, ViewerDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerDetailQuery, ViewerDetailQueryVariables>(ViewerDetailDocument, options);
      }
export function useViewerDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerDetailQuery, ViewerDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerDetailQuery, ViewerDetailQueryVariables>(ViewerDetailDocument, options);
        }
export type ViewerDetailQueryHookResult = ReturnType<typeof useViewerDetailQuery>;
export type ViewerDetailLazyQueryHookResult = ReturnType<typeof useViewerDetailLazyQuery>;
export type ViewerDetailQueryResult = Apollo.QueryResult<ViewerDetailQuery, ViewerDetailQueryVariables>;
export const ViewerEmailsDocument = gql`
    query ViewerEmails {
  viewer {
    id
    emails {
      edges {
        node {
          ...EmailFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
    unconfirmedEmails {
      edges {
        node {
          ...EmailFragment
        }
        cursor
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
}
    ${EmailFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;

/**
 * __useViewerEmailsQuery__
 *
 * To run a query within a React component, call `useViewerEmailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewerEmailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewerEmailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useViewerEmailsQuery(baseOptions?: Apollo.QueryHookOptions<ViewerEmailsQuery, ViewerEmailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewerEmailsQuery, ViewerEmailsQueryVariables>(ViewerEmailsDocument, options);
      }
export function useViewerEmailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewerEmailsQuery, ViewerEmailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewerEmailsQuery, ViewerEmailsQueryVariables>(ViewerEmailsDocument, options);
        }
export type ViewerEmailsQueryHookResult = ReturnType<typeof useViewerEmailsQuery>;
export type ViewerEmailsLazyQueryHookResult = ReturnType<typeof useViewerEmailsLazyQuery>;
export type ViewerEmailsQueryResult = Apollo.QueryResult<ViewerEmailsQuery, ViewerEmailsQueryVariables>;