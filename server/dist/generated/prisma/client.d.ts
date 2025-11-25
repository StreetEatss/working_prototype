import * as runtime from "@prisma/client/runtime/library";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FoodTrucks
 * const foodTrucks = await prisma.foodTruck.findMany()
 * ```
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model FoodTruck
 *
 */
export type FoodTruck = Prisma.FoodTruckModel;
/**
 * Model Owner
 *
 */
export type Owner = Prisma.OwnerModel;
/**
 * Model OwnerTruckAccess
 *
 */
export type OwnerTruckAccess = Prisma.OwnerTruckAccessModel;
/**
 * Model MenuItem
 *
 */
export type MenuItem = Prisma.MenuItemModel;
/**
 * Model MenuReview
 *
 */
export type MenuReview = Prisma.MenuReviewModel;
/**
 * Model StatusUpdate
 *
 */
export type StatusUpdate = Prisma.StatusUpdateModel;
//# sourceMappingURL=client.d.ts.map