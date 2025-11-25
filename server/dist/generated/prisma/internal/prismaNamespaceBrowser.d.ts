import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
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
export declare const ModelName: {
    readonly FoodTruck: "FoodTruck";
    readonly Owner: "Owner";
    readonly OwnerTruckAccess: "OwnerTruckAccess";
    readonly MenuItem: "MenuItem";
    readonly MenuReview: "MenuReview";
    readonly StatusUpdate: "StatusUpdate";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
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
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map