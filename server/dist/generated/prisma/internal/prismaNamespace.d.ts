import * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
 * Metrics
 */
export type Metrics = runtime.Metrics;
export type Metric<T> = runtime.Metric<T>;
export type MetricHistogram = runtime.MetricHistogram;
export type MetricHistogramBucket = runtime.MetricHistogramBucket;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 6.19.0
 * Query Engine version: 2ba551f319ab1df4bc874a89965d8b3641056773
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.objectEnumValues.instances.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: {
    "__#private@#private": any;
    _getNamespace(): string;
    _getName(): string;
    toString(): string;
};
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly FoodTruck: "FoodTruck";
    readonly Owner: "Owner";
    readonly OwnerTruckAccess: "OwnerTruckAccess";
    readonly MenuItem: "MenuItem";
    readonly MenuReview: "MenuReview";
    readonly StatusUpdate: "StatusUpdate";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "foodTruck" | "owner" | "ownerTruckAccess" | "menuItem" | "menuReview" | "statusUpdate";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        FoodTruck: {
            payload: Prisma.$FoodTruckPayload<ExtArgs>;
            fields: Prisma.FoodTruckFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FoodTruckFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FoodTruckFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>;
                };
                findFirst: {
                    args: Prisma.FoodTruckFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FoodTruckFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>;
                };
                findMany: {
                    args: Prisma.FoodTruckFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>[];
                };
                create: {
                    args: Prisma.FoodTruckCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>;
                };
                createMany: {
                    args: Prisma.FoodTruckCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FoodTruckCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>[];
                };
                delete: {
                    args: Prisma.FoodTruckDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>;
                };
                update: {
                    args: Prisma.FoodTruckUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>;
                };
                deleteMany: {
                    args: Prisma.FoodTruckDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FoodTruckUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FoodTruckUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>[];
                };
                upsert: {
                    args: Prisma.FoodTruckUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodTruckPayload>;
                };
                aggregate: {
                    args: Prisma.FoodTruckAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFoodTruck>;
                };
                groupBy: {
                    args: Prisma.FoodTruckGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodTruckGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FoodTruckCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodTruckCountAggregateOutputType> | number;
                };
            };
        };
        Owner: {
            payload: Prisma.$OwnerPayload<ExtArgs>;
            fields: Prisma.OwnerFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OwnerFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OwnerFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>;
                };
                findFirst: {
                    args: Prisma.OwnerFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OwnerFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>;
                };
                findMany: {
                    args: Prisma.OwnerFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>[];
                };
                create: {
                    args: Prisma.OwnerCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>;
                };
                createMany: {
                    args: Prisma.OwnerCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OwnerCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>[];
                };
                delete: {
                    args: Prisma.OwnerDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>;
                };
                update: {
                    args: Prisma.OwnerUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>;
                };
                deleteMany: {
                    args: Prisma.OwnerDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OwnerUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OwnerUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>[];
                };
                upsert: {
                    args: Prisma.OwnerUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerPayload>;
                };
                aggregate: {
                    args: Prisma.OwnerAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOwner>;
                };
                groupBy: {
                    args: Prisma.OwnerGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OwnerGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OwnerCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OwnerCountAggregateOutputType> | number;
                };
            };
        };
        OwnerTruckAccess: {
            payload: Prisma.$OwnerTruckAccessPayload<ExtArgs>;
            fields: Prisma.OwnerTruckAccessFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OwnerTruckAccessFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OwnerTruckAccessFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>;
                };
                findFirst: {
                    args: Prisma.OwnerTruckAccessFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OwnerTruckAccessFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>;
                };
                findMany: {
                    args: Prisma.OwnerTruckAccessFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>[];
                };
                create: {
                    args: Prisma.OwnerTruckAccessCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>;
                };
                createMany: {
                    args: Prisma.OwnerTruckAccessCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OwnerTruckAccessCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>[];
                };
                delete: {
                    args: Prisma.OwnerTruckAccessDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>;
                };
                update: {
                    args: Prisma.OwnerTruckAccessUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>;
                };
                deleteMany: {
                    args: Prisma.OwnerTruckAccessDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OwnerTruckAccessUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OwnerTruckAccessUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>[];
                };
                upsert: {
                    args: Prisma.OwnerTruckAccessUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OwnerTruckAccessPayload>;
                };
                aggregate: {
                    args: Prisma.OwnerTruckAccessAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOwnerTruckAccess>;
                };
                groupBy: {
                    args: Prisma.OwnerTruckAccessGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OwnerTruckAccessGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OwnerTruckAccessCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OwnerTruckAccessCountAggregateOutputType> | number;
                };
            };
        };
        MenuItem: {
            payload: Prisma.$MenuItemPayload<ExtArgs>;
            fields: Prisma.MenuItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MenuItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MenuItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                findFirst: {
                    args: Prisma.MenuItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MenuItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                findMany: {
                    args: Prisma.MenuItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>[];
                };
                create: {
                    args: Prisma.MenuItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                createMany: {
                    args: Prisma.MenuItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MenuItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>[];
                };
                delete: {
                    args: Prisma.MenuItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                update: {
                    args: Prisma.MenuItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                deleteMany: {
                    args: Prisma.MenuItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MenuItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MenuItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>[];
                };
                upsert: {
                    args: Prisma.MenuItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                aggregate: {
                    args: Prisma.MenuItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMenuItem>;
                };
                groupBy: {
                    args: Prisma.MenuItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MenuItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MenuItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MenuItemCountAggregateOutputType> | number;
                };
            };
        };
        MenuReview: {
            payload: Prisma.$MenuReviewPayload<ExtArgs>;
            fields: Prisma.MenuReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MenuReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MenuReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>;
                };
                findFirst: {
                    args: Prisma.MenuReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MenuReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>;
                };
                findMany: {
                    args: Prisma.MenuReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>[];
                };
                create: {
                    args: Prisma.MenuReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>;
                };
                createMany: {
                    args: Prisma.MenuReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MenuReviewCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>[];
                };
                delete: {
                    args: Prisma.MenuReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>;
                };
                update: {
                    args: Prisma.MenuReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.MenuReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MenuReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MenuReviewUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>[];
                };
                upsert: {
                    args: Prisma.MenuReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuReviewPayload>;
                };
                aggregate: {
                    args: Prisma.MenuReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMenuReview>;
                };
                groupBy: {
                    args: Prisma.MenuReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MenuReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MenuReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MenuReviewCountAggregateOutputType> | number;
                };
            };
        };
        StatusUpdate: {
            payload: Prisma.$StatusUpdatePayload<ExtArgs>;
            fields: Prisma.StatusUpdateFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.StatusUpdateFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.StatusUpdateFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>;
                };
                findFirst: {
                    args: Prisma.StatusUpdateFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.StatusUpdateFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>;
                };
                findMany: {
                    args: Prisma.StatusUpdateFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>[];
                };
                create: {
                    args: Prisma.StatusUpdateCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>;
                };
                createMany: {
                    args: Prisma.StatusUpdateCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.StatusUpdateCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>[];
                };
                delete: {
                    args: Prisma.StatusUpdateDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>;
                };
                update: {
                    args: Prisma.StatusUpdateUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>;
                };
                deleteMany: {
                    args: Prisma.StatusUpdateDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.StatusUpdateUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.StatusUpdateUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>[];
                };
                upsert: {
                    args: Prisma.StatusUpdateUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$StatusUpdatePayload>;
                };
                aggregate: {
                    args: Prisma.StatusUpdateAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateStatusUpdate>;
                };
                groupBy: {
                    args: Prisma.StatusUpdateGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StatusUpdateGroupByOutputType>[];
                };
                count: {
                    args: Prisma.StatusUpdateCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.StatusUpdateCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const FoodTruckScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly cuisineType: "cuisineType";
    readonly imageUrl: "imageUrl";
    readonly venmoHandle: "venmoHandle";
    readonly defaultLocation: "defaultLocation";
    readonly defaultLatitude: "defaultLatitude";
    readonly defaultLongitude: "defaultLongitude";
    readonly typicalSchedule: "typicalSchedule";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FoodTruckScalarFieldEnum = (typeof FoodTruckScalarFieldEnum)[keyof typeof FoodTruckScalarFieldEnum];
export declare const OwnerScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly createdAt: "createdAt";
};
export type OwnerScalarFieldEnum = (typeof OwnerScalarFieldEnum)[keyof typeof OwnerScalarFieldEnum];
export declare const OwnerTruckAccessScalarFieldEnum: {
    readonly id: "id";
    readonly ownerId: "ownerId";
    readonly truckId: "truckId";
    readonly role: "role";
    readonly createdAt: "createdAt";
};
export type OwnerTruckAccessScalarFieldEnum = (typeof OwnerTruckAccessScalarFieldEnum)[keyof typeof OwnerTruckAccessScalarFieldEnum];
export declare const MenuItemScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly priceCents: "priceCents";
    readonly imageUrl: "imageUrl";
    readonly truckId: "truckId";
    readonly isFeatured: "isFeatured";
};
export type MenuItemScalarFieldEnum = (typeof MenuItemScalarFieldEnum)[keyof typeof MenuItemScalarFieldEnum];
export declare const MenuReviewScalarFieldEnum: {
    readonly id: "id";
    readonly menuItemId: "menuItemId";
    readonly rating: "rating";
    readonly tasteRating: "tasteRating";
    readonly valueRating: "valueRating";
    readonly comment: "comment";
    readonly photoUrl: "photoUrl";
    readonly reporterName: "reporterName";
    readonly createdAt: "createdAt";
    readonly locationSource: "locationSource";
};
export type MenuReviewScalarFieldEnum = (typeof MenuReviewScalarFieldEnum)[keyof typeof MenuReviewScalarFieldEnum];
export declare const StatusUpdateScalarFieldEnum: {
    readonly id: "id";
    readonly truckId: "truckId";
    readonly status: "status";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly note: "note";
    readonly reporterName: "reporterName";
    readonly reliability: "reliability";
    readonly photoUrl: "photoUrl";
    readonly createdAt: "createdAt";
    readonly source: "source";
};
export type StatusUpdateScalarFieldEnum = (typeof StatusUpdateScalarFieldEnum)[keyof typeof StatusUpdateScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly JsonNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
    readonly AnyNull: {
        "__#private@#private": any;
        _getNamespace(): string;
        _getName(): string;
        toString(): string;
    };
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'OwnerRole'
 */
export type EnumOwnerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OwnerRole'>;
/**
 * Reference to a field of type 'OwnerRole[]'
 */
export type ListEnumOwnerRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OwnerRole[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'TruckStatus'
 */
export type EnumTruckStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TruckStatus'>;
/**
 * Reference to a field of type 'TruckStatus[]'
 */
export type ListEnumTruckStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TruckStatus[]'>;
/**
 * Reference to a field of type 'StatusSource'
 */
export type EnumStatusSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusSource'>;
/**
 * Reference to a field of type 'StatusSource[]'
 */
export type ListEnumStatusSourceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusSource[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export type Datasource = {
    url?: string;
};
export type Datasources = {
    db?: Datasource;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null;
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
}
export type GlobalOmitConfig = {
    foodTruck?: Prisma.FoodTruckOmit;
    owner?: Prisma.OwnerOmit;
    ownerTruckAccess?: Prisma.OwnerTruckAccessOmit;
    menuItem?: Prisma.MenuItemOmit;
    menuReview?: Prisma.MenuReviewOmit;
    statusUpdate?: Prisma.StatusUpdateOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map