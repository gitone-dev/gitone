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


export type ConfirmEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'ConfirmEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type CreateEmailMutationVariables = Exact<{
  input: CreateEmailInput;
}>;


export type CreateEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type CreateSessionMutationVariables = Exact<{
  input: CreateSessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateSessionPayload', session?: { __typename?: 'Session', email?: string | null, username: string, active: boolean, header: string, token: string } | null } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'CreateUserPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type DeleteEmailMutationVariables = Exact<{
  input: DeleteEmailInput;
}>;


export type DeleteEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type DeleteSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteSessionMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteSessionPayload', message?: string | null } | null };

export type DeleteUserMutationVariables = Exact<{
  input: DeleteUserInput;
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'DeleteUserPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type EmailFragmentFragment = { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean };

export type ExistEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type ExistEmailQuery = { __typename?: 'Query', existEmail: boolean };

export type ExistFullPathQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type ExistFullPathQuery = { __typename?: 'Query', existFullPath: boolean };

export type NamespaceFragmentFragment = { __typename?: 'Namespace', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility?: Visibility | null, description?: string | null };

export type NamespaceQueryVariables = Exact<{
  fullPath: Scalars['String']['input'];
}>;


export type NamespaceQuery = { __typename?: 'Query', namespace: { __typename?: 'Namespace', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, path?: string | null, fullName?: string | null, fullPath?: string | null, visibility?: Visibility | null, description?: string | null } };

export type PageInfoFragmentFragment = { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null };

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

export type SessionFragmentFragment = { __typename?: 'Session', email?: string | null, username: string, active: boolean, header: string, token: string };

export type SetPrimaryEmailMutationVariables = Exact<{
  input: SetPrimaryEmailInput;
}>;


export type SetPrimaryEmailMutation = { __typename?: 'Mutation', payload?: { __typename?: 'SetPrimaryEmailPayload', email?: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } | null } | null };

export type UpdateActivationEmailMutationVariables = Exact<{
  input: UpdateActivationEmailInput;
}>;


export type UpdateActivationEmailMutation = { __typename?: 'Mutation', updateActivationEmail?: { __typename?: 'UpdateActivationEmailPayload', message?: string | null } | null };

export type UpdatePasswordMutationVariables = Exact<{
  input: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdatePasswordPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateUserPayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null, bio?: string | null, location?: string | null, websiteUrl?: string | null } | null } | null };

export type UpdateUsernameMutationVariables = Exact<{
  input: UpdateUsernameInput;
}>;


export type UpdateUsernameMutation = { __typename?: 'Mutation', payload?: { __typename?: 'UpdateUsernamePayload', user?: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } | null } | null };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null };

export type UserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } };

export type UserDetailFragmentFragment = { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null, bio?: string | null, location?: string | null, websiteUrl?: string | null };

export type UserDetailQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserDetailQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null, bio?: string | null, location?: string | null, websiteUrl?: string | null } };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null } };

export type ViewerDetailQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerDetailQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, createdAt?: any | null, updatedAt?: any | null, name?: string | null, username?: string | null, avatarUrl?: string | null, bio?: string | null, location?: string | null, websiteUrl?: string | null } };

export type ViewerEmailsQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerEmailsQuery = { __typename?: 'Query', viewer: { __typename?: 'User', id: string, emails?: { __typename?: 'EmailConnection', edges?: Array<{ __typename?: 'EmailEdge', cursor: string, node: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null, unconfirmedEmails?: { __typename?: 'EmailConnection', edges?: Array<{ __typename?: 'EmailEdge', cursor: string, node: { __typename?: 'Email', id: string, createdAt?: any | null, updatedAt?: any | null, email: string, primary: boolean } }> | null, pageInfo?: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } | null } | null } };

export const EmailFragmentFragmentDoc = gql`
    fragment EmailFragment on Email {
  id
  createdAt
  updatedAt
  email
  primary
}
    `;
export const NamespaceFragmentFragmentDoc = gql`
    fragment NamespaceFragment on Namespace {
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
export const PageInfoFragmentFragmentDoc = gql`
    fragment PageInfoFragment on PageInfo {
  hasPreviousPage
  hasNextPage
  startCursor
  endCursor
}
    `;
export const SessionFragmentFragmentDoc = gql`
    fragment SessionFragment on Session {
  email
  username
  active
  header
  token
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  createdAt
  updatedAt
  name
  username
  avatarUrl
}
    `;
export const UserDetailFragmentFragmentDoc = gql`
    fragment UserDetailFragment on User {
  id
  createdAt
  updatedAt
  name
  username
  avatarUrl
  bio
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
export const CreateSessionDocument = gql`
    mutation CreateSession($input: CreateSessionInput!) {
  payload: createSession(input: $input) {
    session {
      ...SessionFragment
    }
  }
}
    ${SessionFragmentFragmentDoc}`;
export type CreateSessionMutationFn = Apollo.MutationFunction<CreateSessionMutation, CreateSessionMutationVariables>;

/**
 * __useCreateSessionMutation__
 *
 * To run a mutation, you first call `useCreateSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSessionMutation, { data, loading, error }] = useCreateSessionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSessionMutation, CreateSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSessionMutation, CreateSessionMutationVariables>(CreateSessionDocument, options);
      }
export type CreateSessionMutationHookResult = ReturnType<typeof useCreateSessionMutation>;
export type CreateSessionMutationResult = Apollo.MutationResult<CreateSessionMutation>;
export type CreateSessionMutationOptions = Apollo.BaseMutationOptions<CreateSessionMutation, CreateSessionMutationVariables>;
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
export const DeleteSessionDocument = gql`
    mutation DeleteSession {
  payload: deleteSession {
    message
  }
}
    `;
export type DeleteSessionMutationFn = Apollo.MutationFunction<DeleteSessionMutation, DeleteSessionMutationVariables>;

/**
 * __useDeleteSessionMutation__
 *
 * To run a mutation, you first call `useDeleteSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSessionMutation, { data, loading, error }] = useDeleteSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteSessionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSessionMutation, DeleteSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSessionMutation, DeleteSessionMutationVariables>(DeleteSessionDocument, options);
      }
export type DeleteSessionMutationHookResult = ReturnType<typeof useDeleteSessionMutation>;
export type DeleteSessionMutationResult = Apollo.MutationResult<DeleteSessionMutation>;
export type DeleteSessionMutationOptions = Apollo.BaseMutationOptions<DeleteSessionMutation, DeleteSessionMutationVariables>;
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
export const NamespaceDocument = gql`
    query Namespace($fullPath: String!) {
  namespace(fullPath: $fullPath) {
    ...NamespaceFragment
  }
}
    ${NamespaceFragmentFragmentDoc}`;

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
export const UpdateUsernameDocument = gql`
    mutation UpdateUsername($input: UpdateUsernameInput!) {
  payload: updateUsername(input: $input) {
    user {
      ...UserFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type UpdateUsernameMutationFn = Apollo.MutationFunction<UpdateUsernameMutation, UpdateUsernameMutationVariables>;

/**
 * __useUpdateUsernameMutation__
 *
 * To run a mutation, you first call `useUpdateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsernameMutation, { data, loading, error }] = useUpdateUsernameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUsernameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUsernameMutation, UpdateUsernameMutationVariables>(UpdateUsernameDocument, options);
      }
export type UpdateUsernameMutationHookResult = ReturnType<typeof useUpdateUsernameMutation>;
export type UpdateUsernameMutationResult = Apollo.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = Apollo.BaseMutationOptions<UpdateUsernameMutation, UpdateUsernameMutationVariables>;
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
export const ViewerDocument = gql`
    query Viewer {
  viewer {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

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