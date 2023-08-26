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
};

export type ActivateUserInput = {
  token: Scalars['String']['input'];
};

export type ActivateUserPayload = {
  __typename?: 'ActivateUserPayload';
  message?: Maybe<Scalars['String']['output']>;
};

export type ConfirmEmailInput = {
  token: Scalars['String']['input'];
};

export type ConfirmEmailPayload = {
  __typename?: 'ConfirmEmailPayload';
  email?: Maybe<Email>;
};

export type CreateEmailInput = {
  email: Scalars['String']['input'];
};

export type CreateEmailPayload = {
  __typename?: 'CreateEmailPayload';
  email?: Maybe<Email>;
};

export type CreateSessionInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateSessionPayload = {
  __typename?: 'CreateSessionPayload';
  session?: Maybe<Session>;
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

export type DeleteEmailInput = {
  email: Scalars['String']['input'];
};

export type DeleteEmailPayload = {
  __typename?: 'DeleteEmailPayload';
  email?: Maybe<Email>;
};

export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  message?: Maybe<Scalars['String']['output']>;
};

export type DeleteUserInput = {
  id: Scalars['ID']['input'];
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  user?: Maybe<User>;
};

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

export type Mutation = {
  __typename?: 'Mutation';
  activateUser?: Maybe<ActivateUserPayload>;
  confirmEmail?: Maybe<ConfirmEmailPayload>;
  createEmail?: Maybe<CreateEmailPayload>;
  /**  session */
  createSession?: Maybe<CreateSessionPayload>;
  /**  user */
  createUser?: Maybe<CreateUserPayload>;
  deleteEmail?: Maybe<DeleteEmailPayload>;
  deleteSession?: Maybe<DeleteSessionPayload>;
  deleteUser?: Maybe<DeleteUserPayload>;
  resetPassword?: Maybe<ResetPasswordPayload>;
  sendActivationEmail?: Maybe<SendActivationEmailPayload>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmailPayload>;
  setPrimaryEmail?: Maybe<SetPrimaryEmailPayload>;
  updateActivationEmail?: Maybe<UpdateActivationEmailPayload>;
  updatePassword?: Maybe<UpdatePasswordPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
  updateUsername?: Maybe<UpdateUsernamePayload>;
};


export type MutationActivateUserArgs = {
  input: ActivateUserInput;
};


export type MutationConfirmEmailArgs = {
  input: ConfirmEmailInput;
};


export type MutationCreateEmailArgs = {
  input: CreateEmailInput;
};


export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteEmailArgs = {
  input: DeleteEmailInput;
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


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUsernameArgs = {
  input: UpdateUsernameInput;
};

/**  namespace */
export type Namespace = Node & {
  __typename?: 'Namespace';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  fullPath?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  visibility?: Maybe<Visibility>;
};

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

export type Query = {
  __typename?: 'Query';
  existEmail: Scalars['Boolean']['output'];
  existFullPath: Scalars['Boolean']['output'];
  namespace: Namespace;
  ping: Scalars['String']['output'];
  user: User;
  viewer: User;
};


export type QueryExistEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryExistFullPathArgs = {
  fullPath: Scalars['String']['input'];
};


export type QueryNamespaceArgs = {
  fullPath: Scalars['String']['input'];
};


export type QueryUserArgs = {
  username: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ResetPasswordPayload = {
  __typename?: 'ResetPasswordPayload';
  message?: Maybe<Scalars['String']['output']>;
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

export type UpdateActivationEmailInput = {
  email: Scalars['String']['input'];
};

export type UpdateActivationEmailPayload = {
  __typename?: 'UpdateActivationEmailPayload';
  message?: Maybe<Scalars['String']['output']>;
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

export type UpdateUserInput = {
  bio: Scalars['String']['input'];
  location: Scalars['String']['input'];
  name: Scalars['String']['input'];
  websiteUrl: Scalars['String']['input'];
};

export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  user?: Maybe<User>;
};

export type UpdateUsernameInput = {
  username: Scalars['String']['input'];
};

export type UpdateUsernamePayload = {
  __typename?: 'UpdateUsernamePayload';
  user?: Maybe<User>;
};

/**  user */
export type User = Node & {
  __typename?: 'User';
  active?: Maybe<Scalars['Boolean']['output']>;
  avatarUrl?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  emails?: Maybe<EmailConnection>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  namespace?: Maybe<Namespace>;
  role?: Maybe<Role>;
  unconfirmedEmails?: Maybe<EmailConnection>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  websiteUrl?: Maybe<Scalars['String']['output']>;
};

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type ActivateUserMutationVariables = Exact<{
  input: ActivateUserInput;
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ActivateUserPayload', message?: string | null } | null };

export type ConfirmEmailMutationVariables = Exact<{
  input: ConfirmEmailInput;
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ConfirmEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type CreateEmailMutationVariables = Exact<{
  input: CreateEmailInput;
}>;


export type CreateEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type CreateSessionMutationVariables = Exact<{
  input: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateSessionPayload', session?: (
      { __typename?: 'Session' }
      & { ' $fragmentRefs'?: { 'SessionFragmentFragment': SessionFragmentFragment } }
    ) | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateUserPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type DeleteEmailMutationVariables = Exact<{
  input: DeleteEmailInput;
}>;


export type DeleteEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type DeleteSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteSessionMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteSessionPayload', message?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteUserPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type EmailFragmentFragment = { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } & { ' $fragmentName'?: 'EmailFragmentFragment' };

export type ExistEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ExistEmailQuery = { __typename?: 'Query', existEmail: boolean };

export type ExistFullPathQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type ExistFullPathQuery = { __typename?: 'Query', existFullPath: boolean };

export type NamespaceFragmentFragment = { __typename?: 'Namespace', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility?: Visibility | null, description?: string | null } & { ' $fragmentName'?: 'NamespaceFragmentFragment' };

export type NamespaceQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type NamespaceQuery = { __typename?: 'Query', namespace: (
    { __typename?: 'Namespace' }
    & { ' $fragmentRefs'?: { 'NamespaceFragmentFragment': NamespaceFragmentFragment } }
  ) };

export type PageInfoFragmentFragment = { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } & { ' $fragmentName'?: 'PageInfoFragmentFragment' };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', ping: string };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ResetPasswordPayload', message?: string | null } | null };

export type SendActivationEmailMutationVariables = Exact<{
  input: SendActivationEmailInput;
}>;


export type SendActivationEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SendActivationEmailPayload', message?: string | null } | null };

export type SendPasswordResetEmailMutationVariables = Exact<{
  input: SendPasswordResetEmailInput;
}>;


export type SendPasswordResetEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SendPasswordResetEmailPayload', message?: string | null } | null };

export type SessionFragmentFragment = { __typename?: 'Session', email?: string | null, username: string, active: boolean, header: string, token: string } & { ' $fragmentName'?: 'SessionFragmentFragment' };

export type SetPrimaryEmailMutationVariables = Exact<{
  input: SetPrimaryEmailInput;
}>;


export type SetPrimaryEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SetPrimaryEmailPayload', email?: (
      { __typename?: 'Email' }
      & { ' $fragmentRefs'?: { 'EmailFragmentFragment': EmailFragmentFragment } }
    ) | null } | null };

export type UpdateActivationEmailMutationVariables = Exact<{
  input: UpdateActivationEmailInput;
}>;


export type UpdateActivationEmailMutation = { __typename?: 'Mutation', updateActivationEmail?: { __typename?: 'UpdateActivationEmailPayload', message?: string | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdatePasswordPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateUserPayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
    ) | null } | null };

export type UpdateUsernameMutationVariables = Exact<{
  input: UpdateUsernameInput;
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateUsernamePayload', user?: (
      { __typename?: 'User' }
      & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
    ) | null } | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } & { ' $fragmentName'?: 'UserFragmentFragment' };

export type UserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
  ) };

export type UserDetailFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null, bio?: string | null, location?: string | null, websiteUrl?: string | null } & { ' $fragmentName'?: 'UserDetailFragmentFragment' };

export type UserDetailQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserDetailQuery = { __typename?: 'Query', user: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailFragmentFragment': UserDetailFragmentFragment } }
  ) };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserFragmentFragment': UserFragmentFragment } }
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

export const EmailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<EmailFragmentFragment, unknown>;
export const NamespaceFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NamespaceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Namespace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<NamespaceFragmentFragment, unknown>;
export const PageInfoFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<PageInfoFragmentFragment, unknown>;
export const SessionFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SessionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Session"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<SessionFragmentFragment, unknown>;
export const UserFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UserFragmentFragment, unknown>;
export const UserDetailFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<UserDetailFragmentFragment, unknown>;
export const ActivateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ActivateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActivateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"activateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ActivateUserMutation, ActivateUserMutationVariables>;
export const ConfirmEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ConfirmEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"confirmEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<ConfirmEmailMutation, ConfirmEmailMutationVariables>;
export const CreateEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<CreateEmailMutation, CreateEmailMutationVariables>;
export const CreateSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"session"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SessionFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SessionFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Session"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<CreateSessionMutation, CreateSessionMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<DeleteEmailMutation, DeleteEmailMutationVariables>;
export const DeleteSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteSessionMutation, DeleteSessionMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const ExistEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExistEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"existEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<ExistEmailQuery, ExistEmailQueryVariables>;
export const ExistFullPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExistFullPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"existFullPath"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}]}]}}]} as unknown as DocumentNode<ExistFullPathQuery, ExistFullPathQueryVariables>;
export const NamespaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Namespace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullPath"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullPath"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NamespaceFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NamespaceFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Namespace"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"fullPath"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]} as unknown as DocumentNode<NamespaceQuery, NamespaceQueryVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"}}]}}]} as unknown as DocumentNode<PingQuery, PingQueryVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendActivationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendActivationEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendActivationEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendActivationEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendActivationEmailMutation, SendActivationEmailMutationVariables>;
export const SendPasswordResetEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendPasswordResetEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendPasswordResetEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"sendPasswordResetEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export const SetPrimaryEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetPrimaryEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetPrimaryEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"setPrimaryEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}}]} as unknown as DocumentNode<SetPrimaryEmailMutation, SetPrimaryEmailMutationVariables>;
export const UpdateActivationEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateActivationEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateActivationEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateActivationEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<UpdateActivationEmailMutation, UpdateActivationEmailMutationVariables>;
export const UpdatePasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updatePassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUsernameInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"payload"},"name":{"kind":"Name","value":"updateUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const UserDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<UserDetailQuery, UserDetailQueryVariables>;
export const ViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}}]}}]} as unknown as DocumentNode<ViewerQuery, ViewerQueryVariables>;
export const ViewerDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerDetail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetailFragment"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"websiteUrl"}}]}}]} as unknown as DocumentNode<ViewerDetailQuery, ViewerDetailQueryVariables>;
export const ViewerEmailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ViewerEmails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"emails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"unconfirmedEmails"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailFragment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfoFragment"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Email"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"primary"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfoFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]} as unknown as DocumentNode<ViewerEmailsQuery, ViewerEmailsQueryVariables>;