/* eslint-disable-next-line */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { State } from '@prisma/client';
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
export type EnumResolverSignature<T, AllowedValues = any> = {
  [key in keyof T]?: AllowedValues;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: Date; output: Date };
};

export type CreatePropertyInput = {
  city: Scalars['String']['input'];
  state: State;
  street: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProperty: Property;
  deleteProperty: Scalars['Boolean']['output'];
};

export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};

export type MutationDeletePropertyArgs = {
  id: Scalars['ID']['input'];
};

export type Property = {
  __typename?: 'Property';
  city: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lat: Scalars['Float']['output'];
  long: Scalars['Float']['output'];
  state: State;
  street: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weatherData?: Maybe<WeatherData>;
  zipCode: Scalars['String']['output'];
};

export type PropertyFilter = {
  city?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<State>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type PropertyPageInfo = {
  __typename?: 'PropertyPageInfo';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PropertyPaginatedResult = {
  __typename?: 'PropertyPaginatedResult';
  pageInfo: PropertyPageInfo;
  properties: Array<Property>;
  totalCount: Scalars['Int']['output'];
};

export enum PropertySortField {
  CreatedAt = 'CREATED_AT',
}

export type Query = {
  __typename?: 'Query';
  getProperties: PropertyPaginatedResult;
  getProperty?: Maybe<Property>;
};

export type QueryGetPropertiesArgs = {
  filter?: InputMaybe<PropertyFilter>;
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<PropertySortField>;
  sortOrder?: InputMaybe<SortOrder>;
};

export type QueryGetPropertyArgs = {
  id: Scalars['ID']['input'];
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export { State };

export type WeatherData = {
  __typename?: 'WeatherData';
  cloudCover: Scalars['Int']['output'];
  feelsLike: Scalars['Float']['output'];
  humidity: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isDay: Scalars['String']['output'];
  lastUpdated: Scalars['DateTime']['output'];
  observationTime: Scalars['String']['output'];
  precip: Scalars['Float']['output'];
  pressure: Scalars['Int']['output'];
  propertyId: Scalars['String']['output'];
  temperature: Scalars['Float']['output'];
  uvIndex: Scalars['Int']['output'];
  visibility: Scalars['Int']['output'];
  weatherCode: Scalars['Int']['output'];
  weatherDescriptions: Array<Scalars['String']['output']>;
  windDegree: Scalars['Int']['output'];
  windDir: Scalars['String']['output'];
  windSpeed: Scalars['Float']['output'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreatePropertyInput: CreatePropertyInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Property: ResolverTypeWrapper<Property>;
  PropertyFilter: PropertyFilter;
  PropertyPageInfo: ResolverTypeWrapper<PropertyPageInfo>;
  PropertyPaginatedResult: ResolverTypeWrapper<PropertyPaginatedResult>;
  PropertySortField: PropertySortField;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  State: State;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  WeatherData: ResolverTypeWrapper<WeatherData>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreatePropertyInput: CreatePropertyInput;
  DateTime: Scalars['DateTime']['output'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Property: Property;
  PropertyFilter: PropertyFilter;
  PropertyPageInfo: PropertyPageInfo;
  PropertyPaginatedResult: PropertyPaginatedResult;
  Query: {};
  String: Scalars['String']['output'];
  WeatherData: WeatherData;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createProperty?: Resolver<
    ResolversTypes['Property'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePropertyArgs, 'input'>
  >;
  deleteProperty?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePropertyArgs, 'id'>
  >;
};

export type PropertyResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Property'] = ResolversParentTypes['Property'],
> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  long?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  state?: Resolver<ResolversTypes['State'], ParentType, ContextType>;
  street?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  weatherData?: Resolver<
    Maybe<ResolversTypes['WeatherData']>,
    ParentType,
    ContextType
  >;
  zipCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyPageInfoResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PropertyPageInfo'] = ResolversParentTypes['PropertyPageInfo'],
> = {
  currentPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PropertyPaginatedResultResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PropertyPaginatedResult'] = ResolversParentTypes['PropertyPaginatedResult'],
> = {
  pageInfo?: Resolver<
    ResolversTypes['PropertyPageInfo'],
    ParentType,
    ContextType
  >;
  properties?: Resolver<
    Array<ResolversTypes['Property']>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  getProperties?: Resolver<
    ResolversTypes['PropertyPaginatedResult'],
    ParentType,
    ContextType,
    RequireFields<QueryGetPropertiesArgs, 'page' | 'pageSize'>
  >;
  getProperty?: Resolver<
    Maybe<ResolversTypes['Property']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPropertyArgs, 'id'>
  >;
};

export type StateResolvers = EnumResolverSignature<
  {
    AK?: any;
    AL?: any;
    AR?: any;
    AZ?: any;
    CA?: any;
    CO?: any;
    CT?: any;
    DC?: any;
    DE?: any;
    FL?: any;
    GA?: any;
    HI?: any;
    IA?: any;
    ID?: any;
    IL?: any;
    IN?: any;
    KS?: any;
    KY?: any;
    LA?: any;
    MA?: any;
    MD?: any;
    ME?: any;
    MI?: any;
    MN?: any;
    MO?: any;
    MS?: any;
    MT?: any;
    NC?: any;
    ND?: any;
    NE?: any;
    NH?: any;
    NJ?: any;
    NM?: any;
    NV?: any;
    NY?: any;
    OH?: any;
    OK?: any;
    OR?: any;
    PA?: any;
    PR?: any;
    RI?: any;
    SC?: any;
    SD?: any;
    TN?: any;
    TX?: any;
    UT?: any;
    VA?: any;
    VT?: any;
    WA?: any;
    WI?: any;
    WV?: any;
    WY?: any;
  },
  ResolversTypes['State']
>;

export type WeatherDataResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['WeatherData'] = ResolversParentTypes['WeatherData'],
> = {
  cloudCover?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  feelsLike?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  humidity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isDay?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastUpdated?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  observationTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  precip?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  pressure?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  propertyId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  temperature?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  uvIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  visibility?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  weatherCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  weatherDescriptions?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  windDegree?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  windDir?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  windSpeed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Property?: PropertyResolvers<ContextType>;
  PropertyPageInfo?: PropertyPageInfoResolvers<ContextType>;
  PropertyPaginatedResult?: PropertyPaginatedResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  State?: StateResolvers;
  WeatherData?: WeatherDataResolvers<ContextType>;
};
