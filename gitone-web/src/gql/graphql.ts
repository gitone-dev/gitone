/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A slightly refined version of RFC-3339 compliant DateTime Scalar */
  DateTime: { input: any; output: any; }
  /** A 64-bit signed integer */
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

export type CreateSessionInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateSessionPayload = {
  __typename?: 'CreateSessionPayload';
  session?: Maybe<Session>;
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

export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  message?: Maybe<Scalars['String']['output']>;
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
  /**  session */
  createSession?: Maybe<CreateSessionPayload>;
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
  deleteSession?: Maybe<DeleteSessionPayload>;
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


export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
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
  fullPath: Scalars['String']['input'];
};


export type QueryNamespacePolicyArgs = {
  fullPath: Scalars['String']['input'];
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

/**  session */
export type Session = {
  __typename?: 'Session';
  active: Scalars['Boolean']['output'];
  email?: Maybe<Scalars['String']['output']>;
  header: Scalars['String']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
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

export type BlobFragmentFragment = { __typename?: 'Blob', id: string, sha?: string | null, path?: string | null, name?: string | null, size?: any | null, linesCount?: number | null, lines?: { __typename?: 'BlobLineConnection', edges?: Array<{ __typename?: 'BlobLineEdge', cursor: string, node: { __typename?: 'BlobLine', number?: number | null, html?: string | null } }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null } & { ' $fragmentName'?: 'BlobFragmentFragment' };

export type BlobQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type BlobQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, blob?: (
      { __typename?: 'Blob' }
      & { ' $fragmentRefs'?: { 'BlobFragmentFragment': BlobFragmentFragment } }
    ) | null }, namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type BlobLinesQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  path: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlobLinesQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, blob?: { __typename?: 'Blob', id: string, lines?: { __typename?: 'BlobLineConnection', edges?: Array<{ __typename?: 'BlobLineEdge', cursor: string, node: { __typename?: 'BlobLine', number?: number | null, html?: string | null } }> | null, pageInfo?: (
          { __typename?: 'PageInfo' }
          & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
        ) | null } | null } | null } };

export type BranchFragmentFragment = { __typename?: 'Branch', id: string, name: string, commit?: (
    { __typename?: 'Commit' }
    & { ' $fragmentRefs'?: { 'CommitFragmentFragment': CommitFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'BranchFragmentFragment' };

export type BranchesQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<BranchFilter>;
  orderBy?: InputMaybe<BranchOrder>;
}>;


export type BranchesQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, branches?: { __typename?: 'BranchConnection', edges?: Array<{ __typename?: 'BranchEdge', cursor: string, node: (
          { __typename?: 'Branch' }
          & { ' $fragmentRefs'?: { 'BranchFragmentFragment': BranchFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null } };

export type CommitFragmentFragment = { __typename?: 'Commit', id: string, sha: string, parentShas?: Array<string> | null, shortMessage?: string | null, fullMessage?: string | null, author?: (
    { __typename?: 'GitUser' }
    & { ' $fragmentRefs'?: { 'GitUserFragmentFragment': GitUserFragmentFragment } }
  ) | null, committer?: (
    { __typename?: 'GitUser' }
    & { ' $fragmentRefs'?: { 'GitUserFragmentFragment': GitUserFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'CommitFragmentFragment' };

export type CommitQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision?: InputMaybe<Scalars['String']['input']>;
}>;


export type CommitQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, commit?: (
      { __typename?: 'Commit' }
      & { ' $fragmentRefs'?: { 'CommitFragmentFragment': CommitFragmentFragment } }
    ) | null }, namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type CommitsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy: CommitFilter;
}>;


export type CommitsQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, commits?: { __typename?: 'CommitConnection', edges?: Array<{ __typename?: 'CommitEdge', cursor: string, node: (
          { __typename?: 'Commit' }
          & { ' $fragmentRefs'?: { 'CommitFragmentFragment': CommitFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null } };

export type ConfirmEmailMutationVariables = Exact<{
  input: ConfirmEmailInput;
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ConfirmEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type CreateBranchMutationVariables = Exact<{
  input: CreateBranchInput;
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateBranchPayload', repositoryId: string, branch: (
      { __typename?: 'Branch' }
      & { ' $fragmentRefs'?: { 'BranchFragmentFragment': BranchFragmentFragment } }
    ) } | null };

export type CreateEmailMutationVariables = Exact<{
  input: CreateEmailInput;
}>;


export type CreateEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type CreateGroupMutationVariables = Exact<{
  input: CreateGroupInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateGroupPayload', group?: (
      { __typename?: 'Group' }
      & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
    ) | null } | null };

export type CreateMemberMutationVariables = Exact<{
  input: CreateMemberInput;
}>;


export type CreateMemberMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateMemberPayload', member?: (
      { __typename?: 'Member' }
      & { ' $fragmentRefs'?: { 'MemberFragmentFragment': MemberFragmentFragment } }
    ) | null } | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateProjectPayload', project?: (
      { __typename?: 'Project' }
      & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
    ) | null } | null };

export type CreateSessionMutationVariables = Exact<{
  input: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateSessionPayload', session?: (
      { __typename?: 'Session' }
      & { ' $fragmentRefs'?: { 'SessionFragmentFragment': SessionFragmentFragment } }
    ) | null } | null };

export type CreateSshKeyMutationVariables = Exact<{
  input: CreateSshKeyInput;
}>;


export type CreateSshKeyMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateSshKeyPayload', sshKey?: (
      { __typename?: 'SshKey' }
      & { ' $fragmentRefs'?: { 'SshKeyFragmentFragment': SshKeyFragmentFragment } }
    ) | null } | null };

export type CreateTagMutationVariables = Exact<{
  input: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateTagPayload', repositoryId: string, tag: (
      { __typename?: 'Tag' }
      & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
    ) } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateUserPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type DeleteBranchMutationVariables = Exact<{
  input: DeleteBranchInput;
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteBranchPayload', repositoryId: string, branch: (
      { __typename?: 'Branch' }
      & { ' $fragmentRefs'?: { 'BranchFragmentFragment': BranchFragmentFragment } }
    ) } | null };

export type DeleteEmailMutationVariables = Exact<{
  input: DeleteEmailInput;
}>;


export type DeleteEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type DeleteMemberMutationVariables = Exact<{
  input: DeleteMemberInput;
}>;


export type DeleteMemberMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteMemberPayload', member?: (
      { __typename?: 'Member' }
      & { ' $fragmentRefs'?: { 'MemberFragmentFragment': MemberFragmentFragment } }
    ) | null } | null };

export type DeleteSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteSessionMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteSessionPayload', message?: string | null } | null };

export type DeleteSshKeyMutationVariables = Exact<{
  input: DeleteSshKeyInput;
}>;


export type DeleteSshKeyMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteSshKeyPayload', sshKey?: (
      { __typename?: 'SshKey' }
      & { ' $fragmentRefs'?: { 'SshKeyFragmentFragment': SshKeyFragmentFragment } }
    ) | null } | null };

export type DeleteTagMutationVariables = Exact<{
  input: DeleteTagInput;
}>;


export type DeleteTagMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteTagPayload', repositoryId: string, tag: (
      { __typename?: 'Tag' }
      & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
    ) } | null };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteUserPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type DiffFragmentFragment = { __typename?: 'Diff', id: string, type?: DiffType | null, oldPath?: string | null, newPath?: string | null, oldSha?: string | null, newSha?: string | null, lines?: Array<{ __typename?: 'DiffLine', type: DiffLineType, oldNumber: number, newNumber: number, text?: string | null, html?: string | null }> | null } & { ' $fragmentName'?: 'DiffFragmentFragment' };

export type DiffsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  oldRevision?: InputMaybe<Scalars['String']['input']>;
  newRevision: Scalars['String']['input'];
}>;


export type DiffsQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, diffs?: { __typename?: 'DiffConnection', edges?: Array<{ __typename?: 'DiffEdge', cursor: string, node: (
          { __typename?: 'Diff' }
          & { ' $fragmentRefs'?: { 'DiffFragmentFragment': DiffFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null } };

export type EmailFragmentFragment = { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } & { ' $fragmentName'?: 'EmailFragmentFragment' };

export type ExistEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ExistEmailQuery = { __typename?: 'Query', existEmail: boolean };

export type ExistFullPathQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type ExistFullPathQuery = { __typename?: 'Query', existFullPath: boolean };

export type GitUserFragmentFragment = { __typename?: 'GitUser', name?: string | null, email?: string | null, date?: any | null } & { ' $fragmentName'?: 'GitUserFragmentFragment' };

export type GroupFragmentFragment = { __typename?: 'Group', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } & { ' $fragmentName'?: 'GroupFragmentFragment' };

export type GroupQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type GroupQuery = { __typename?: 'Query', group: (
    { __typename?: 'Group' }
    & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
  ), namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type GroupsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<GroupFilter>;
  orderBy?: InputMaybe<GroupOrder>;
}>;


export type GroupsQuery = { __typename?: 'Query', groups?: { __typename?: 'GroupConnection', edges?: Array<{ __typename?: 'GroupEdge', cursor: string, node: (
        { __typename?: 'Group' }
        & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
      ) }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null };

export type MemberFragmentFragment = { __typename?: 'Member', id: string, createdAt?: any | null, updatedAt?: any | null, access?: Access | null, user?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null, namespace?: (
    { __typename?: 'Group' }
    & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
  ) | (
    { __typename?: 'Project' }
    & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'MemberFragmentFragment' };

export type MembersQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<MemberFilter>;
  orderBy?: InputMaybe<MemberOrder>;
}>;


export type MembersQuery = { __typename?: 'Query', members?: { __typename?: 'MemberConnection', edges?: Array<{ __typename?: 'MemberEdge', cursor: string, node: (
        { __typename?: 'Member' }
        & { ' $fragmentRefs'?: { 'MemberFragmentFragment': MemberFragmentFragment } }
      ) }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null, namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type NamespaceQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type NamespaceQuery = { __typename?: 'Query', namespace: (
    { __typename?: 'Group' }
    & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
  ) | (
    { __typename?: 'Project' }
    & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ), namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type NamespacesQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<NamespaceFilter>;
  orderBy?: InputMaybe<NamespaceOrder>;
}>;


export type NamespacesQuery = { __typename?: 'Query', namespaces?: { __typename?: 'NamespaceConnection', edges?: Array<{ __typename?: 'NamespaceEdge', cursor: string, node: (
        { __typename?: 'Group' }
        & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
      ) | (
        { __typename?: 'Project' }
        & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
      ) | (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
      ) }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null };

export type PageInfoFragmentFragment = { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } & { ' $fragmentName'?: 'PageInfoFragmentFragment' };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };

export type PolicyFragmentFragment = { __typename?: 'Policy', id: string, access: Access, actions: Array<Action> } & { ' $fragmentName'?: 'PolicyFragmentFragment' };

export type ProjectFragmentFragment = { __typename?: 'Project', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility: Visibility, description?: string | null } & { ' $fragmentName'?: 'ProjectFragmentFragment' };

export type ProjectQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revisionPath: Scalars['String']['input'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: (
    { __typename?: 'Project' }
    & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
  ), namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ), repository: { __typename?: 'Repository', id: string, empty?: boolean | null, defaultBranch?: { __typename?: 'Branch', name: string } | null, revisionPath?: { __typename?: 'RevisionPath', id: string, revision: string, path: string, type: string } | null } };

export type ProjectsQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<ProjectFilter>;
  orderBy?: InputMaybe<ProjectOrder>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectConnection', edges?: Array<{ __typename?: 'ProjectEdge', cursor: string, node: (
        { __typename?: 'Project' }
        & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
      ) }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null };

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

export type SessionFragmentFragment = { __typename?: 'Session', username: string, email?: string | null, active: boolean, header: string, token: string } & { ' $fragmentName'?: 'SessionFragmentFragment' };

export type SetPrimaryEmailMutationVariables = Exact<{
  input: SetPrimaryEmailInput;
}>;


export type SetPrimaryEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SetPrimaryEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type SshKeyFragmentFragment = { __typename?: 'SshKey', id: string, createdAt?: any | null, updatedAt?: any | null, title?: string | null, key?: string | null, fingerprint?: string | null, usages?: Array<SshKeyUsage> | null, lastUsedAt?: any | null, expiresAt?: any | null, isExpired?: boolean | null, namespace?: (
    { __typename?: 'Group' }
    & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
  ) | (
    { __typename?: 'Project' }
    & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
  ) | (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'SshKeyFragmentFragment' };

export type SshKeysQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<SshKeyFilter>;
  orderBy?: InputMaybe<SshKeyOrder>;
}>;


export type SshKeysQuery = { __typename?: 'Query', sshKeys?: { __typename?: 'SshKeyConnection', edges?: Array<{ __typename?: 'SshKeyEdge', cursor: string, node: (
        { __typename?: 'SshKey' }
        & { ' $fragmentRefs'?: { 'SshKeyFragmentFragment': SshKeyFragmentFragment } }
      ) }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null };

export type TagFragmentFragment = { __typename?: 'Tag', id: string, name: string, shortMessage?: string | null, fullMessage?: string | null, commit?: (
    { __typename?: 'Commit' }
    & { ' $fragmentRefs'?: { 'CommitFragmentFragment': CommitFragmentFragment } }
  ) | null, tagger?: (
    { __typename?: 'GitUser' }
    & { ' $fragmentRefs'?: { 'GitUserFragmentFragment': GitUserFragmentFragment } }
  ) | null } & { ' $fragmentName'?: 'TagFragmentFragment' };

export type TagsQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  first: Scalars['Int']['input'];
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<TagFilter>;
  orderBy?: InputMaybe<TagOrder>;
}>;


export type TagsQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, tags?: { __typename?: 'TagConnection', edges?: Array<{ __typename?: 'TagEdge', cursor: string, node: (
          { __typename?: 'Tag' }
          & { ' $fragmentRefs'?: { 'TagFragmentFragment': TagFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null } };

export type TreeEntryFragmentFragment = { __typename?: 'TreeEntry', id: string, name?: string | null, path?: string | null, mode?: number | null, type?: string | null } & { ' $fragmentName'?: 'TreeEntryFragmentFragment' };

export type TreeQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
  revision: Scalars['String']['input'];
  path: Scalars['String']['input'];
}>;


export type TreeQuery = { __typename?: 'Query', repository: { __typename?: 'Repository', id: string, tree?: { __typename?: 'TreeEntryConnection', edges?: Array<{ __typename?: 'TreeEntryEdge', cursor: string, node: (
          { __typename?: 'TreeEntry' }
          & { ' $fragmentRefs'?: { 'TreeEntryFragmentFragment': TreeEntryFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null }, namespacePolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type UpdateActivationEmailMutationVariables = Exact<{
  input: UpdateActivationEmailInput;
}>;


export type UpdateActivationEmailMutation = { __typename?: 'Mutation', updateActivationEmail?: { __typename?: 'UpdateActivationEmailPayload', message?: string | null } | null };

export type UpdateGroupMutationVariables = Exact<{
  input: UpdateGroupInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateGroupPayload', group?: (
      { __typename?: 'Group' }
      & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
    ) | null } | null };

export type UpdateMemberMutationVariables = Exact<{
  input: UpdateMemberInput;
}>;


export type UpdateMemberMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateMemberPayload', member?: (
      { __typename?: 'Member' }
      & { ' $fragmentRefs'?: { 'MemberFragmentFragment': MemberFragmentFragment } }
    ) | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdatePasswordPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type UpdatePathMutationVariables = Exact<{
  input: UpdatePathInput;
}>;


export type UpdatePathMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdatePathPayload', namespace?: (
      { __typename?: 'Group' }
      & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
    ) | (
      { __typename?: 'Project' }
      & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
    ) | (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateProjectPayload', project?: (
      { __typename?: 'Project' }
      & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
    ) | null } | null };

export type UpdateSshKeyMutationVariables = Exact<{
  input: UpdateSshKeyInput;
}>;


export type UpdateSshKeyMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateSshKeyPayload', sshKey?: (
      { __typename?: 'SshKey' }
      & { ' $fragmentRefs'?: { 'SshKeyFragmentFragment': SshKeyFragmentFragment } }
    ) | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateUserPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
    ) | null } | null };

export type UpdateVisibilityMutationVariables = Exact<{
  input: UpdateVisibilityInput;
}>;


export type UpdateVisibilityMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateVisibilityPayload', namespace?: (
      { __typename?: 'Group' }
      & { ' $fragmentRefs'?: { 'GroupFragmentFragment': GroupFragmentFragment } }
    ) | (
      { __typename?: 'Project' }
      & { ' $fragmentRefs'?: { 'ProjectFragmentFragment': ProjectFragmentFragment } }
    ) | (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type UserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) };

export type UserDetailFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, username?: string | null, visibility: Visibility, description?: string | null, avatarUrl?: string | null, location?: string | null, websiteUrl?: string | null } & { ' $fragmentName'?: 'UserDetailFragmentFragment' };

export type UserDetailQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserDetailQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) };

export type UsersQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  filterBy?: InputMaybe<UserFilter>;
  orderBy?: InputMaybe<UserOrder>;
}>;


export type UsersQuery = { __typename?: 'Query', users?: { __typename?: 'UserConnection', edges?: Array<{ __typename?: 'UserEdge', cursor: string, node: (
        { __typename?: 'User' }
        & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
      ) }> | null, pageInfo?: (
      { __typename?: 'PageInfo' }
      & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
    ) | null } | null };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ), viewerPolicy: (
    { __typename?: 'Policy' }
    & { ' $fragmentRefs'?: { 'PolicyFragmentFragment': PolicyFragmentFragment } }
  ) };

export type ViewerDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerDetailQuery = { __typename?: 'Query', viewer: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) };

export type ViewerEmailsQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerEmailsQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, emails?: { __typename?: 'EmailConnection', edges?: Array<{ __typename?: 'EmailEdge', cursor: string, node: (
          { __typename?: 'Email' }
          & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null, unconfirmedEmails?: { __typename?: 'EmailConnection', edges?: Array<{ __typename?: 'EmailEdge', cursor: string, node: (
          { __typename?: 'Email' }
          & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
        ) }> | null, pageInfo?: (
        { __typename?: 'PageInfo' }
        & { ' $fragmentRefs'?: { 'PageInfoFragmentFragment': PageInfoFragmentFragment } }
      ) | null } | null } };

export const PageInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<PageInfoFragmentFragment, unknown>;
export const BlobFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlobFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Blob"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"linesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"html"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<BlobFragmentFragment, unknown>;
export const GitUserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]} as unknown as DocumentNode<GitUserFragmentFragment, unknown>;
export const CommitFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]} as unknown as DocumentNode<CommitFragmentFragment, unknown>;
export const BranchFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BranchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Branch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}}]} as unknown as DocumentNode<BranchFragmentFragment, unknown>;
export const DiffFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DiffFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Diff"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"oldPath"}},{"kind":"Field","name":{"kind":"Name","value":"newPath"}},{"kind":"Field","name":{"kind":"Name","value":"oldSha"}},{"kind":"Field","name":{"kind":"Name","value":"newSha"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"oldNumber"}},{"kind":"Field","name":{"kind":"Name","value":"newNumber"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}}]}}]}}]} as unknown as DocumentNode<DiffFragmentFragment, unknown>;
export const EmailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<EmailFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const GroupFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<GroupFragmentFragment, unknown>;
export const ProjectFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<ProjectFragmentFragment, unknown>;
export const MemberFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<MemberFragmentFragment, unknown>;
export const PolicyFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<PolicyFragmentFragment, unknown>;
export const SessionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SessionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Session"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<SessionFragmentFragment, unknown>;
export const SshKeyFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SshKeyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SshKey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"usages"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isExpired"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<SshKeyFragmentFragment, unknown>;
export const TagFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tagger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}}]} as unknown as DocumentNode<TagFragmentFragment, unknown>;
export const TreeEntryFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TreeEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TreeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<TreeEntryFragmentFragment, unknown>;
export const UserDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<UserDetailFragmentFragment, unknown>;
export const ActivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"activateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ActivateUserMutation, ActivateUserMutationVariables>;
export const BlobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Blob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"revision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revision"}}},{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BlobFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BlobFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Blob"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"linesCount"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"html"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<BlobQuery, BlobQueryVariables>;
export const BlobLinesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BlobLines"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"revision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revision"}}},{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"html"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<BlobLinesQuery, BlobLinesQueryVariables>;
export const BranchesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Branches"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BranchFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"BranchOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"branches"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BranchFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BranchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Branch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<BranchesQuery, BranchesQueryVariables>;
export const CommitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Commit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revision"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"revision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revision"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<CommitQuery, CommitQueryVariables>;
export const CommitsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Commits"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommitFilter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"commits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<CommitsQuery, CommitsQueryVariables>;
export const ConfirmEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"confirmEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateBranchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBranch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateBranchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createBranch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BranchFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BranchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Branch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}}]}}]} as unknown as DocumentNode<CreateBranchMutation, CreateBranchMutationVariables>;
export const CreateEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<CreateEmailMutation, CreateEmailMutationVariables>;
export const CreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateGroupMutation, CreateGroupMutationVariables>;
export const CreateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]} as unknown as DocumentNode<CreateMemberMutation, CreateMemberMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SessionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SessionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Session"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const CreateSshKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSshKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSshKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createSshKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sshKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SshKeyFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SshKeyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SshKey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"usages"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isExpired"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]} as unknown as DocumentNode<CreateSshKeyMutation, CreateSshKeyMutationVariables>;
export const CreateTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tagger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}}]} as unknown as DocumentNode<CreateTagMutation, CreateTagMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteBranchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBranch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteBranchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteBranch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}},{"kind":"Field","name":{"kind":"Name","value":"branch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BranchFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BranchFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Branch"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}}]}}]} as unknown as DocumentNode<DeleteBranchMutation, DeleteBranchMutationVariables>;
export const DeleteEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<DeleteEmailMutation, DeleteEmailMutationVariables>;
export const DeleteMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]} as unknown as DocumentNode<DeleteMemberMutation, DeleteMemberMutationVariables>;
export const DeleteSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteSessionMutation, DeleteSessionMutationVariables>;
export const DeleteSshKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSshKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSshKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteSshKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sshKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SshKeyFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SshKeyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SshKey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"usages"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isExpired"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]} as unknown as DocumentNode<DeleteSshKeyMutation, DeleteSshKeyMutationVariables>;
export const DeleteTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}},{"kind":"Field","name":{"kind":"Name","value":"tag"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tagger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}}]} as unknown as DocumentNode<DeleteTagMutation, DeleteTagMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const DiffsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Diffs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"oldRevision"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newRevision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"diffs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"oldRevision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"oldRevision"}}},{"kind":"Argument","name":{"kind":"Name","value":"newRevision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newRevision"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DiffFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DiffFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Diff"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"oldPath"}},{"kind":"Field","name":{"kind":"Name","value":"newPath"}},{"kind":"Field","name":{"kind":"Name","value":"oldSha"}},{"kind":"Field","name":{"kind":"Name","value":"newSha"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"oldNumber"}},{"kind":"Field","name":{"kind":"Name","value":"newNumber"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<DiffsQuery, DiffsQueryVariables>;
export const ExistEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExistEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"existEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ExistEmailQuery, ExistEmailQueryVariables>;
export const ExistFullPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExistFullPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"existFullPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}]}]}}]} as unknown as DocumentNode<ExistFullPathQuery, ExistFullPathQueryVariables>;
export const GroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Group"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<GroupQuery, GroupQueryVariables>;
export const GroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Groups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<GroupsQuery, GroupsQueryVariables>;
export const MembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Members"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<MembersQuery, MembersQueryVariables>;
export const NamespaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Namespace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<NamespaceQuery, NamespaceQueryVariables>;
export const NamespacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Namespaces"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NamespaceFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"NamespaceOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<NamespacesQuery, NamespacesQueryVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"}}]}}]} as unknown as DocumentNode<PingQuery, PingQueryVariables>;
export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revisionPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"empty"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBranch"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"revisionPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"revisionPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revisionPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const RevisionPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RevisionPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revisionPath"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"revisionPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"revisionPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revisionPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"revision"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<RevisionPathQuery, RevisionPathQueryVariables>;
export const SendActivationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendActivationEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendActivationEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendActivationEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendActivationEmailMutation, SendActivationEmailMutationVariables>;
export const SendPasswordResetEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendPasswordResetEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export const SetPrimaryEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetPrimaryEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetPrimaryEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"setPrimaryEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<SetPrimaryEmailMutation, SetPrimaryEmailMutationVariables>;
export const SshKeysDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SshKeys"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SshKeyFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SshKeyOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sshKeys"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SshKeyFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SshKeyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SshKey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"usages"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isExpired"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<SshKeysQuery, SshKeysQueryVariables>;
export const TagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TagFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TagOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TagFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GitUserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GitUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CommitFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commit"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sha"}},{"kind":"Field","name":{"kind":"Name","value":"parentShas"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"committer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TagFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Tag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"commit"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommitFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tagger"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GitUserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fullMessage"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<TagsQuery, TagsQueryVariables>;
export const TreeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tree"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"revision"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repository"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tree"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"revision"},"value":{"kind":"Variable","name":{"kind":"Name","value":"revision"}}},{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TreeEntryFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespacePolicy"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TreeEntryFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TreeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"mode"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<TreeQuery, TreeQueryVariables>;
export const UpdateActivationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateActivationEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateActivationEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateActivationEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateActivationEmailMutation, UpdateActivationEmailMutationVariables>;
export const UpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const UpdateMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MemberFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MemberFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Member"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]} as unknown as DocumentNode<UpdateMemberMutation, UpdateMemberMutationVariables>;
export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdatePathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePathInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updatePath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdatePathMutation, UpdatePathMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateSshKeyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSshKey"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSshKeyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateSshKey"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sshKey"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SshKeyFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SshKeyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SshKey"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"fingerprint"}},{"kind":"Field","name":{"kind":"Name","value":"usages"}},{"kind":"Field","name":{"kind":"Name","value":"lastUsedAt"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"isExpired"}},{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]} as unknown as DocumentNode<UpdateSshKeyMutation, UpdateSshKeyMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateVisibilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVisibility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVisibilityInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateVisibility"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GroupFragment"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GroupFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Group"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Project"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<UpdateVisibilityMutation, UpdateVisibilityMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<UserDetailQuery, UserDetailQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserOrder"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"filterBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filterBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const ViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewerPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PolicyFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PolicyFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Policy"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"access"}},{"kind":"Field","name":{"kind":"Name","value":"actions"}}]}}]} as unknown as DocumentNode<ViewerQuery, ViewerQueryVariables>;
export const ViewerDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<ViewerDetailQuery, ViewerDetailQueryVariables>;
export const ViewerEmailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerEmails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unconfirmedEmails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<ViewerEmailsQuery, ViewerEmailsQueryVariables>;