/* eslint-disable unicorn/no-abusive-eslint-disable */
/*  eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from './context';
import { z } from 'zod'
import { PhoneNumber } from 'libphonenumber-js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error. */
  DateTime: Date;
  /** A field whose value conforms to the standard internet email address format as specified in {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address HTML Spec}. */
  Email: string;
  /** The JSON scalar type represents JSON values as specified by {@link http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf ECMA-404}. */
  JSON: Record<string | number, any>;
  /** A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character */
  Password: string;
  /** A field whose value conforms to the standard Phone number format (based on Google's Phone Number Library) format. The very powerful {@link https://github.com/googlei18n/libphonenumber libphonenumber } library is available to take that format, parse and display it in whatever display format you want. It can also be used to parse user input and get the E.164 format to pass into a schema. */
  PhoneNumber: PhoneNumber;
  /** A field whose value conforms to the Postal Code of the Address component */
  PostalCode: string;
  /** A field whose value conforms to the standard URL format as specified in {@link https://www.ietf.org/rfc/rfc3986.txt RFC3986}, and it uses real JavaScript URL objects. */
  URL: URL;
};

export type Activity = {
  __typename?: 'Activity';
  _id: Scalars['ID'];
  payload?: Maybe<Scalars['JSON']>;
  type: Scalars['String'];
  user: User;
};

export type LogInActivity = {
  __typename?: 'LogInActivity';
  _id: Scalars['ID'];
  timestamp: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  refreshToken: SignInResponse;
  sendFriendRequest: Activity;
  signIn: SignInResponse;
  signUp: Scalars['String'];
  updatePassword?: Maybe<User>;
  verifyPhoneNumber?: Maybe<User>;
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String'];
};


export type MutationSendFriendRequestArgs = {
  toUserId: Scalars['String'];
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdatePasswordArgs = {
  _id: Scalars['String'];
  input: UpdatePasswordInput;
};


export type MutationVerifyPhoneNumberArgs = {
  _id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['ID'];
  content: Scalars['String'];
  creator: User;
  likes?: Maybe<Array<User>>;
};

export type Query = {
  __typename?: 'Query';
  getUser: User;
};


export type QueryGetUserArgs = {
  where: UserQueryArgs;
};

export type Role =
  | 'ADMIN'
  | 'USER';

export type SignInInput = {
  password: Scalars['String'];
  userName: Scalars['String'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  refreshToken: Scalars['String'];
  status: Scalars['String'];
  token: Scalars['String'];
};

export type SignUpInput = {
  dateOfBirth: Scalars['String'];
  firebaseUserId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phoneNumber: Scalars['PhoneNumber'];
  profileImage?: InputMaybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type UpdatePasswordInput = {
  firebaseUserId?: InputMaybe<Scalars['String']>;
  newPassword: Scalars['Password'];
  oldPassword?: InputMaybe<Scalars['Password']>;
  resetPassword?: InputMaybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  dateOfBirth: Scalars['DateTime'];
  firebaseUserId: Scalars['String'];
  firstName: Scalars['String'];
  friends?: Maybe<Array<User>>;
  lastLogin?: Maybe<LogInActivity>;
  lastName: Scalars['String'];
  loginHistory?: Maybe<Array<LogInActivity>>;
  notifications?: Maybe<Array<Activity>>;
  phoneNumber: Scalars['PhoneNumber'];
  posts?: Maybe<Array<Post>>;
  profileImage?: Maybe<Scalars['String']>;
  userName: Scalars['String'];
  verification: UserVerification;
};

export type UserQueryArgs = {
  __typename?: 'UserQueryArgs';
  _id?: Maybe<Scalars['String']>;
  firebaseUserId?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['PhoneNumber']>;
  userName?: Maybe<Scalars['String']>;
};

export type UserVerification = {
  __typename?: 'UserVerification';
  phoneNumber: Scalars['Boolean'];
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<Activity>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Email: ResolverTypeWrapper<Scalars['Email']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LogInActivity: ResolverTypeWrapper<LogInActivity>;
  Mutation: ResolverTypeWrapper<{}>;
  Password: ResolverTypeWrapper<Scalars['Password']>;
  PhoneNumber: ResolverTypeWrapper<Scalars['PhoneNumber']>;
  Post: ResolverTypeWrapper<Post>;
  PostalCode: ResolverTypeWrapper<Scalars['PostalCode']>;
  Query: ResolverTypeWrapper<{}>;
  Role: Role;
  SignInInput: SignInInput;
  SignInResponse: ResolverTypeWrapper<SignInResponse>;
  SignUpInput: SignUpInput;
  URL: ResolverTypeWrapper<Scalars['URL']>;
  UpdatePasswordInput: UpdatePasswordInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  User: ResolverTypeWrapper<User>;
  UserQueryArgs: ResolverTypeWrapper<UserQueryArgs>;
  UserVerification: ResolverTypeWrapper<UserVerification>;
  AdditionalEntityFields: AdditionalEntityFields;
  Int: ResolverTypeWrapper<Scalars['Int']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Activity;
  ID: Scalars['ID'];
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Email: Scalars['Email'];
  JSON: Scalars['JSON'];
  LogInActivity: LogInActivity;
  Mutation: {};
  Password: Scalars['Password'];
  PhoneNumber: Scalars['PhoneNumber'];
  Post: Post;
  PostalCode: Scalars['PostalCode'];
  Query: {};
  SignInInput: SignInInput;
  SignInResponse: SignInResponse;
  SignUpInput: SignUpInput;
  URL: Scalars['URL'];
  UpdatePasswordInput: UpdatePasswordInput;
  Boolean: Scalars['Boolean'];
  User: User;
  UserQueryArgs: UserQueryArgs;
  UserVerification: UserVerification;
  AdditionalEntityFields: AdditionalEntityFields;
  Int: Scalars['Int'];
};

export type AuthDirectiveArgs = {
  requires?: Maybe<Role>;
};

export type AuthDirectiveResolver<Result, Parent, ContextType = Context, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = Context, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = Context, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExternalDirectiveArgs = { };

export type ExternalDirectiveResolver<Result, Parent, ContextType = Context, Args = ExternalDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = Context, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ValidationDirectiveArgs = {
  default?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
  pattern?: Maybe<Scalars['String']>;
  requiredMessage?: Maybe<Scalars['String']>;
  trim?: Maybe<Scalars['Boolean']>;
  typeOf?: Maybe<Scalars['String']>;
};

export type ValidationDirectiveResolver<Result, Parent, ContextType = Context, Args = ValidationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = Context, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = Context, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = Context, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = Context, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = Context, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ActivityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payload?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LogInActivityResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LogInActivity'] = ResolversParentTypes['LogInActivity']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  refreshToken?: Resolver<ResolversTypes['SignInResponse'], ParentType, ContextType, RequireFields<MutationRefreshTokenArgs, 'token'>>;
  sendFriendRequest?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationSendFriendRequestArgs, 'toUserId'>>;
  signIn?: Resolver<ResolversTypes['SignInResponse'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'input'>>;
  signUp?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'input'>>;
  updatePassword?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, '_id' | 'input'>>;
  verifyPhoneNumber?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationVerifyPhoneNumberArgs, '_id'>>;
};

export interface PasswordScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Password'], any> {
  name: 'Password';
}

export interface PhoneNumberScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PhoneNumber'], any> {
  name: 'PhoneNumber';
}

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  likes?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface PostalCodeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['PostalCode'], any> {
  name: 'PostalCode';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'where'>>;
};

export type SignInResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignInResponse'] = ResolversParentTypes['SignInResponse']> = {
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UrlScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['URL'], any> {
  name: 'URL';
}

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  dateOfBirth?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  firebaseUserId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['LogInActivity']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  loginHistory?: Resolver<Maybe<Array<ResolversTypes['LogInActivity']>>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<Array<ResolversTypes['Activity']>>, ParentType, ContextType>;
  phoneNumber?: Resolver<ResolversTypes['PhoneNumber'], ParentType, ContextType>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType>;
  profileImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  verification?: Resolver<ResolversTypes['UserVerification'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserQueryArgsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserQueryArgs'] = ResolversParentTypes['UserQueryArgs']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firebaseUserId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phoneNumber?: Resolver<Maybe<ResolversTypes['PhoneNumber']>, ParentType, ContextType>;
  userName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserVerificationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserVerification'] = ResolversParentTypes['UserVerification']> = {
  phoneNumber?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Activity?: ActivityResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  LogInActivity?: LogInActivityResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Password?: GraphQLScalarType;
  PhoneNumber?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  PostalCode?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  SignInResponse?: SignInResponseResolvers<ContextType>;
  URL?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserQueryArgs?: UserQueryArgsResolvers<ContextType>;
  UserVerification?: UserVerificationResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = Context> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  external?: ExternalDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  validation?: ValidationDirectiveResolver<any, any, ContextType>;
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K], any, T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny => v !== undefined && v !== null;

export const definedNonNullAnySchema = z.any().refine((v) => isDefinedNonNullAny(v));

export const RoleSchema = z.enum(['ADMIN', 'USER']);

export function SignInInputSchema(): z.ZodObject<Properties<SignInInput>> {
  return z.object<Properties<SignInInput>>({
    password: z.string(),
    userName: z.string()
  })
}

export function SignUpInputSchema(): z.ZodObject<Properties<SignUpInput>> {
  return z.object<Properties<SignUpInput>>({
    dateOfBirth: z.string(),
    firebaseUserId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string(),
    phoneNumber: z.custom<PhoneNumber>((value) => value),
    profileImage: z.string().nullish(),
    userName: z.string()
  })
}

export function UpdatePasswordInputSchema(): z.ZodObject<Properties<UpdatePasswordInput>> {
  return z.object<Properties<UpdatePasswordInput>>({
    firebaseUserId: z.string().nullish(),
    newPassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/).trim(),
    oldPassword: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[!#$%&*?@^-]).{8,}$/).trim().nullish(),
    resetPassword: z.boolean().nullish()
  })
}

export function AdditionalEntityFieldsSchema(): z.ZodObject<Properties<AdditionalEntityFields>> {
  return z.object<Properties<AdditionalEntityFields>>({
    path: z.string().nullish(),
    type: z.string().nullish()
  })
}


export type ActivityInDb = {
  _id: string,
  payload?: Maybe<Record<string | number, any>>,
  type: string,
  user: User,
  createdAt: Date,
  updatedAt?: Maybe<Date>,
};

export type LogInActivityInDb = {
  _id: string,
  timestamp: Date,
  userId: string,
  createdAt: Date,
  updatedAt?: Maybe<Date>,
};

export type PostInDb = {
  _id: string,
  content: string,
  creator: User,
  likes?: Maybe<Array<User>>,
  createdAt: Date,
  updatedAt?: Maybe<Date>,
};

export type UserInDb = {
  _id: string,
  dateOfBirth: Date,
  firebaseUserId: string,
  firstName: string,
  friends?: Maybe<Array<User>>,
  lastName: string,
  phoneNumber: PhoneNumber,
  posts?: Maybe<Array<Post>>,
  profileImage?: Maybe<string>,
  userName: string,
  verification: UserVerification,
  createdAt: Date,
  updatedAt?: Maybe<Date>,
  password: string,
};

/**
 * @typedef {Object} Activity
 * @property {string} _id
 * @property {JSON} [payload]
 * @property {string} type
 * @property {User} user
 */

/**
 * JavaScript Date instances and timestamps (represented as 32-bit signed integers) are coerced to RFC 3339 compliant date-time strings. Invalid Date instances raise a field error.
 * @typedef {*} DateTime
 */

/**
 * A field whose value conforms to the standard internet email address format as specified in {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address HTML Spec}.
 * @typedef {*} Email
 */

/**
 * The JSON scalar type represents JSON values as specified by {@link http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf ECMA-404}.
 * @typedef {*} JSON
 */

/**
 * @typedef {Object} LogInActivity
 * @property {string} _id
 * @property {DateTime} timestamp
 * @property {string} userId
 */

/**
 * @typedef {Object} Mutation
 * @property {SignInResponse} refreshToken
 * @property {Activity} sendFriendRequest
 * @property {SignInResponse} signIn
 * @property {string} signUp
 * @property {User} [updatePassword]
 * @property {User} [verifyPhoneNumber]
 */

/**
 * A field whose value is a valid password. It must be at least 8 characters long and contain at least one number and one letter and one special character
 * @typedef {*} Password
 */

/**
 * A field whose value conforms to the standard Phone number format (based on Google's Phone Number Library) format. The very powerful {@link https://github.com/googlei18n/libphonenumber libphonenumber } library is available to take that format, parse and display it in whatever display format you want. It can also be used to parse user input and get the E.164 format to pass into a schema.
 * @typedef {*} PhoneNumber
 */

/**
 * @typedef {Object} Post
 * @property {string} _id
 * @property {string} content
 * @property {User} creator
 * @property {Array<User>} [likes]
 */

/**
 * A field whose value conforms to the Postal Code of the Address component
 * @typedef {*} PostalCode
 */

/**
 * @typedef {Object} Query
 * @property {User} getUser
 */

/**
 * @typedef {("ADMIN"|"USER")} Role
 */

/**
 * @typedef {Object} SignInInput
 * @property {string} password
 * @property {string} userName
 */

/**
 * @typedef {Object} SignInResponse
 * @property {string} refreshToken
 * @property {string} status
 * @property {string} token
 */

/**
 * @typedef {Object} SignUpInput
 * @property {string} dateOfBirth
 * @property {string} firebaseUserId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} password
 * @property {PhoneNumber} phoneNumber
 * @property {string} [profileImage]
 * @property {string} userName
 */

/**
 * A field whose value conforms to the standard URL format as specified in {@link https://www.ietf.org/rfc/rfc3986.txt RFC3986}, and it uses real JavaScript URL objects.
 * @typedef {*} URL
 */

/**
 * @typedef {Object} UpdatePasswordInput
 * @property {string} [firebaseUserId]
 * @property {Password} newPassword
 * @property {Password} [oldPassword]
 * @property {boolean} [resetPassword]
 */

/**
 * @typedef {Object} User
 * @property {string} _id
 * @property {DateTime} dateOfBirth
 * @property {string} firebaseUserId
 * @property {string} firstName
 * @property {Array<User>} [friends]
 * @property {LogInActivity} [lastLogin]
 * @property {string} lastName
 * @property {Array<LogInActivity>} [loginHistory]
 * @property {Array<Activity>} [notifications]
 * @property {PhoneNumber} phoneNumber
 * @property {Array<Post>} [posts]
 * @property {string} [profileImage]
 * @property {string} userName
 * @property {UserVerification} verification
 */

/**
 * @typedef {Object} UserQueryArgs
 * @property {string} [_id]
 * @property {string} [firebaseUserId]
 * @property {PhoneNumber} [phoneNumber]
 * @property {string} [userName]
 */

/**
 * @typedef {Object} UserVerification
 * @property {boolean} phoneNumber
 */

/**
 * @typedef {Object} AdditionalEntityFields
 * @property {string} [path]
 * @property {string} [type]
 */