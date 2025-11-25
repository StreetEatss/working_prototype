import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model FoodTruck
 *
 */
export type FoodTruckModel = runtime.Types.Result.DefaultSelection<Prisma.$FoodTruckPayload>;
export type AggregateFoodTruck = {
    _count: FoodTruckCountAggregateOutputType | null;
    _avg: FoodTruckAvgAggregateOutputType | null;
    _sum: FoodTruckSumAggregateOutputType | null;
    _min: FoodTruckMinAggregateOutputType | null;
    _max: FoodTruckMaxAggregateOutputType | null;
};
export type FoodTruckAvgAggregateOutputType = {
    defaultLatitude: number | null;
    defaultLongitude: number | null;
};
export type FoodTruckSumAggregateOutputType = {
    defaultLatitude: number | null;
    defaultLongitude: number | null;
};
export type FoodTruckMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    cuisineType: string | null;
    imageUrl: string | null;
    venmoHandle: string | null;
    defaultLocation: string | null;
    defaultLatitude: number | null;
    defaultLongitude: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodTruckMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    cuisineType: string | null;
    imageUrl: string | null;
    venmoHandle: string | null;
    defaultLocation: string | null;
    defaultLatitude: number | null;
    defaultLongitude: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodTruckCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    cuisineType: number;
    imageUrl: number;
    venmoHandle: number;
    defaultLocation: number;
    defaultLatitude: number;
    defaultLongitude: number;
    typicalSchedule: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FoodTruckAvgAggregateInputType = {
    defaultLatitude?: true;
    defaultLongitude?: true;
};
export type FoodTruckSumAggregateInputType = {
    defaultLatitude?: true;
    defaultLongitude?: true;
};
export type FoodTruckMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    cuisineType?: true;
    imageUrl?: true;
    venmoHandle?: true;
    defaultLocation?: true;
    defaultLatitude?: true;
    defaultLongitude?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodTruckMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    cuisineType?: true;
    imageUrl?: true;
    venmoHandle?: true;
    defaultLocation?: true;
    defaultLatitude?: true;
    defaultLongitude?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodTruckCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    cuisineType?: true;
    imageUrl?: true;
    venmoHandle?: true;
    defaultLocation?: true;
    defaultLatitude?: true;
    defaultLongitude?: true;
    typicalSchedule?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FoodTruckAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FoodTruck to aggregate.
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodTrucks to fetch.
     */
    orderBy?: Prisma.FoodTruckOrderByWithRelationInput | Prisma.FoodTruckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FoodTruckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodTrucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodTrucks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FoodTrucks
    **/
    _count?: true | FoodTruckCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FoodTruckAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FoodTruckSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FoodTruckMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FoodTruckMaxAggregateInputType;
};
export type GetFoodTruckAggregateType<T extends FoodTruckAggregateArgs> = {
    [P in keyof T & keyof AggregateFoodTruck]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFoodTruck[P]> : Prisma.GetScalarType<T[P], AggregateFoodTruck[P]>;
};
export type FoodTruckGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodTruckWhereInput;
    orderBy?: Prisma.FoodTruckOrderByWithAggregationInput | Prisma.FoodTruckOrderByWithAggregationInput[];
    by: Prisma.FoodTruckScalarFieldEnum[] | Prisma.FoodTruckScalarFieldEnum;
    having?: Prisma.FoodTruckScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FoodTruckCountAggregateInputType | true;
    _avg?: FoodTruckAvgAggregateInputType;
    _sum?: FoodTruckSumAggregateInputType;
    _min?: FoodTruckMinAggregateInputType;
    _max?: FoodTruckMaxAggregateInputType;
};
export type FoodTruckGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    cuisineType: string | null;
    imageUrl: string | null;
    venmoHandle: string | null;
    defaultLocation: string | null;
    defaultLatitude: number | null;
    defaultLongitude: number | null;
    typicalSchedule: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: FoodTruckCountAggregateOutputType | null;
    _avg: FoodTruckAvgAggregateOutputType | null;
    _sum: FoodTruckSumAggregateOutputType | null;
    _min: FoodTruckMinAggregateOutputType | null;
    _max: FoodTruckMaxAggregateOutputType | null;
};
type GetFoodTruckGroupByPayload<T extends FoodTruckGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FoodTruckGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FoodTruckGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FoodTruckGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FoodTruckGroupByOutputType[P]>;
}>>;
export type FoodTruckWhereInput = {
    AND?: Prisma.FoodTruckWhereInput | Prisma.FoodTruckWhereInput[];
    OR?: Prisma.FoodTruckWhereInput[];
    NOT?: Prisma.FoodTruckWhereInput | Prisma.FoodTruckWhereInput[];
    id?: Prisma.StringFilter<"FoodTruck"> | string;
    name?: Prisma.StringFilter<"FoodTruck"> | string;
    description?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    cuisineType?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    venmoHandle?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    defaultLocation?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    defaultLatitude?: Prisma.FloatNullableFilter<"FoodTruck"> | number | null;
    defaultLongitude?: Prisma.FloatNullableFilter<"FoodTruck"> | number | null;
    typicalSchedule?: Prisma.JsonNullableFilter<"FoodTruck">;
    createdAt?: Prisma.DateTimeFilter<"FoodTruck"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodTruck"> | Date | string;
    menuItems?: Prisma.MenuItemListRelationFilter;
    statusUpdates?: Prisma.StatusUpdateListRelationFilter;
    ownerAccess?: Prisma.OwnerTruckAccessListRelationFilter;
};
export type FoodTruckOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    cuisineType?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    venmoHandle?: Prisma.SortOrderInput | Prisma.SortOrder;
    defaultLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    defaultLatitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    typicalSchedule?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    menuItems?: Prisma.MenuItemOrderByRelationAggregateInput;
    statusUpdates?: Prisma.StatusUpdateOrderByRelationAggregateInput;
    ownerAccess?: Prisma.OwnerTruckAccessOrderByRelationAggregateInput;
};
export type FoodTruckWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.FoodTruckWhereInput | Prisma.FoodTruckWhereInput[];
    OR?: Prisma.FoodTruckWhereInput[];
    NOT?: Prisma.FoodTruckWhereInput | Prisma.FoodTruckWhereInput[];
    name?: Prisma.StringFilter<"FoodTruck"> | string;
    description?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    cuisineType?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    venmoHandle?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    defaultLocation?: Prisma.StringNullableFilter<"FoodTruck"> | string | null;
    defaultLatitude?: Prisma.FloatNullableFilter<"FoodTruck"> | number | null;
    defaultLongitude?: Prisma.FloatNullableFilter<"FoodTruck"> | number | null;
    typicalSchedule?: Prisma.JsonNullableFilter<"FoodTruck">;
    createdAt?: Prisma.DateTimeFilter<"FoodTruck"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodTruck"> | Date | string;
    menuItems?: Prisma.MenuItemListRelationFilter;
    statusUpdates?: Prisma.StatusUpdateListRelationFilter;
    ownerAccess?: Prisma.OwnerTruckAccessListRelationFilter;
}, "id">;
export type FoodTruckOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    cuisineType?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    venmoHandle?: Prisma.SortOrderInput | Prisma.SortOrder;
    defaultLocation?: Prisma.SortOrderInput | Prisma.SortOrder;
    defaultLatitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    typicalSchedule?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FoodTruckCountOrderByAggregateInput;
    _avg?: Prisma.FoodTruckAvgOrderByAggregateInput;
    _max?: Prisma.FoodTruckMaxOrderByAggregateInput;
    _min?: Prisma.FoodTruckMinOrderByAggregateInput;
    _sum?: Prisma.FoodTruckSumOrderByAggregateInput;
};
export type FoodTruckScalarWhereWithAggregatesInput = {
    AND?: Prisma.FoodTruckScalarWhereWithAggregatesInput | Prisma.FoodTruckScalarWhereWithAggregatesInput[];
    OR?: Prisma.FoodTruckScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FoodTruckScalarWhereWithAggregatesInput | Prisma.FoodTruckScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FoodTruck"> | string;
    name?: Prisma.StringWithAggregatesFilter<"FoodTruck"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"FoodTruck"> | string | null;
    cuisineType?: Prisma.StringNullableWithAggregatesFilter<"FoodTruck"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"FoodTruck"> | string | null;
    venmoHandle?: Prisma.StringNullableWithAggregatesFilter<"FoodTruck"> | string | null;
    defaultLocation?: Prisma.StringNullableWithAggregatesFilter<"FoodTruck"> | string | null;
    defaultLatitude?: Prisma.FloatNullableWithAggregatesFilter<"FoodTruck"> | number | null;
    defaultLongitude?: Prisma.FloatNullableWithAggregatesFilter<"FoodTruck"> | number | null;
    typicalSchedule?: Prisma.JsonNullableWithAggregatesFilter<"FoodTruck">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FoodTruck"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FoodTruck"> | Date | string;
};
export type FoodTruckCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutTruckInput;
    statusUpdates?: Prisma.StatusUpdateCreateNestedManyWithoutTruckInput;
    ownerAccess?: Prisma.OwnerTruckAccessCreateNestedManyWithoutTruckInput;
};
export type FoodTruckUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutTruckInput;
    statusUpdates?: Prisma.StatusUpdateUncheckedCreateNestedManyWithoutTruckInput;
    ownerAccess?: Prisma.OwnerTruckAccessUncheckedCreateNestedManyWithoutTruckInput;
};
export type FoodTruckUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    menuItems?: Prisma.MenuItemUpdateManyWithoutTruckNestedInput;
    statusUpdates?: Prisma.StatusUpdateUpdateManyWithoutTruckNestedInput;
    ownerAccess?: Prisma.OwnerTruckAccessUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutTruckNestedInput;
    statusUpdates?: Prisma.StatusUpdateUncheckedUpdateManyWithoutTruckNestedInput;
    ownerAccess?: Prisma.OwnerTruckAccessUncheckedUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodTruckUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodTruckUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodTruckCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cuisineType?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    venmoHandle?: Prisma.SortOrder;
    defaultLocation?: Prisma.SortOrder;
    defaultLatitude?: Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrder;
    typicalSchedule?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodTruckAvgOrderByAggregateInput = {
    defaultLatitude?: Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrder;
};
export type FoodTruckMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cuisineType?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    venmoHandle?: Prisma.SortOrder;
    defaultLocation?: Prisma.SortOrder;
    defaultLatitude?: Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodTruckMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    cuisineType?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    venmoHandle?: Prisma.SortOrder;
    defaultLocation?: Prisma.SortOrder;
    defaultLatitude?: Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodTruckSumOrderByAggregateInput = {
    defaultLatitude?: Prisma.SortOrder;
    defaultLongitude?: Prisma.SortOrder;
};
export type FoodTruckScalarRelationFilter = {
    is?: Prisma.FoodTruckWhereInput;
    isNot?: Prisma.FoodTruckWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type FoodTruckCreateNestedOneWithoutOwnerAccessInput = {
    create?: Prisma.XOR<Prisma.FoodTruckCreateWithoutOwnerAccessInput, Prisma.FoodTruckUncheckedCreateWithoutOwnerAccessInput>;
    connectOrCreate?: Prisma.FoodTruckCreateOrConnectWithoutOwnerAccessInput;
    connect?: Prisma.FoodTruckWhereUniqueInput;
};
export type FoodTruckUpdateOneRequiredWithoutOwnerAccessNestedInput = {
    create?: Prisma.XOR<Prisma.FoodTruckCreateWithoutOwnerAccessInput, Prisma.FoodTruckUncheckedCreateWithoutOwnerAccessInput>;
    connectOrCreate?: Prisma.FoodTruckCreateOrConnectWithoutOwnerAccessInput;
    upsert?: Prisma.FoodTruckUpsertWithoutOwnerAccessInput;
    connect?: Prisma.FoodTruckWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodTruckUpdateToOneWithWhereWithoutOwnerAccessInput, Prisma.FoodTruckUpdateWithoutOwnerAccessInput>, Prisma.FoodTruckUncheckedUpdateWithoutOwnerAccessInput>;
};
export type FoodTruckCreateNestedOneWithoutMenuItemsInput = {
    create?: Prisma.XOR<Prisma.FoodTruckCreateWithoutMenuItemsInput, Prisma.FoodTruckUncheckedCreateWithoutMenuItemsInput>;
    connectOrCreate?: Prisma.FoodTruckCreateOrConnectWithoutMenuItemsInput;
    connect?: Prisma.FoodTruckWhereUniqueInput;
};
export type FoodTruckUpdateOneRequiredWithoutMenuItemsNestedInput = {
    create?: Prisma.XOR<Prisma.FoodTruckCreateWithoutMenuItemsInput, Prisma.FoodTruckUncheckedCreateWithoutMenuItemsInput>;
    connectOrCreate?: Prisma.FoodTruckCreateOrConnectWithoutMenuItemsInput;
    upsert?: Prisma.FoodTruckUpsertWithoutMenuItemsInput;
    connect?: Prisma.FoodTruckWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodTruckUpdateToOneWithWhereWithoutMenuItemsInput, Prisma.FoodTruckUpdateWithoutMenuItemsInput>, Prisma.FoodTruckUncheckedUpdateWithoutMenuItemsInput>;
};
export type FoodTruckCreateNestedOneWithoutStatusUpdatesInput = {
    create?: Prisma.XOR<Prisma.FoodTruckCreateWithoutStatusUpdatesInput, Prisma.FoodTruckUncheckedCreateWithoutStatusUpdatesInput>;
    connectOrCreate?: Prisma.FoodTruckCreateOrConnectWithoutStatusUpdatesInput;
    connect?: Prisma.FoodTruckWhereUniqueInput;
};
export type FoodTruckUpdateOneRequiredWithoutStatusUpdatesNestedInput = {
    create?: Prisma.XOR<Prisma.FoodTruckCreateWithoutStatusUpdatesInput, Prisma.FoodTruckUncheckedCreateWithoutStatusUpdatesInput>;
    connectOrCreate?: Prisma.FoodTruckCreateOrConnectWithoutStatusUpdatesInput;
    upsert?: Prisma.FoodTruckUpsertWithoutStatusUpdatesInput;
    connect?: Prisma.FoodTruckWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodTruckUpdateToOneWithWhereWithoutStatusUpdatesInput, Prisma.FoodTruckUpdateWithoutStatusUpdatesInput>, Prisma.FoodTruckUncheckedUpdateWithoutStatusUpdatesInput>;
};
export type FoodTruckCreateWithoutOwnerAccessInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutTruckInput;
    statusUpdates?: Prisma.StatusUpdateCreateNestedManyWithoutTruckInput;
};
export type FoodTruckUncheckedCreateWithoutOwnerAccessInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutTruckInput;
    statusUpdates?: Prisma.StatusUpdateUncheckedCreateNestedManyWithoutTruckInput;
};
export type FoodTruckCreateOrConnectWithoutOwnerAccessInput = {
    where: Prisma.FoodTruckWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodTruckCreateWithoutOwnerAccessInput, Prisma.FoodTruckUncheckedCreateWithoutOwnerAccessInput>;
};
export type FoodTruckUpsertWithoutOwnerAccessInput = {
    update: Prisma.XOR<Prisma.FoodTruckUpdateWithoutOwnerAccessInput, Prisma.FoodTruckUncheckedUpdateWithoutOwnerAccessInput>;
    create: Prisma.XOR<Prisma.FoodTruckCreateWithoutOwnerAccessInput, Prisma.FoodTruckUncheckedCreateWithoutOwnerAccessInput>;
    where?: Prisma.FoodTruckWhereInput;
};
export type FoodTruckUpdateToOneWithWhereWithoutOwnerAccessInput = {
    where?: Prisma.FoodTruckWhereInput;
    data: Prisma.XOR<Prisma.FoodTruckUpdateWithoutOwnerAccessInput, Prisma.FoodTruckUncheckedUpdateWithoutOwnerAccessInput>;
};
export type FoodTruckUpdateWithoutOwnerAccessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    menuItems?: Prisma.MenuItemUpdateManyWithoutTruckNestedInput;
    statusUpdates?: Prisma.StatusUpdateUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckUncheckedUpdateWithoutOwnerAccessInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutTruckNestedInput;
    statusUpdates?: Prisma.StatusUpdateUncheckedUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckCreateWithoutMenuItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    statusUpdates?: Prisma.StatusUpdateCreateNestedManyWithoutTruckInput;
    ownerAccess?: Prisma.OwnerTruckAccessCreateNestedManyWithoutTruckInput;
};
export type FoodTruckUncheckedCreateWithoutMenuItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    statusUpdates?: Prisma.StatusUpdateUncheckedCreateNestedManyWithoutTruckInput;
    ownerAccess?: Prisma.OwnerTruckAccessUncheckedCreateNestedManyWithoutTruckInput;
};
export type FoodTruckCreateOrConnectWithoutMenuItemsInput = {
    where: Prisma.FoodTruckWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodTruckCreateWithoutMenuItemsInput, Prisma.FoodTruckUncheckedCreateWithoutMenuItemsInput>;
};
export type FoodTruckUpsertWithoutMenuItemsInput = {
    update: Prisma.XOR<Prisma.FoodTruckUpdateWithoutMenuItemsInput, Prisma.FoodTruckUncheckedUpdateWithoutMenuItemsInput>;
    create: Prisma.XOR<Prisma.FoodTruckCreateWithoutMenuItemsInput, Prisma.FoodTruckUncheckedCreateWithoutMenuItemsInput>;
    where?: Prisma.FoodTruckWhereInput;
};
export type FoodTruckUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: Prisma.FoodTruckWhereInput;
    data: Prisma.XOR<Prisma.FoodTruckUpdateWithoutMenuItemsInput, Prisma.FoodTruckUncheckedUpdateWithoutMenuItemsInput>;
};
export type FoodTruckUpdateWithoutMenuItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statusUpdates?: Prisma.StatusUpdateUpdateManyWithoutTruckNestedInput;
    ownerAccess?: Prisma.OwnerTruckAccessUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckUncheckedUpdateWithoutMenuItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statusUpdates?: Prisma.StatusUpdateUncheckedUpdateManyWithoutTruckNestedInput;
    ownerAccess?: Prisma.OwnerTruckAccessUncheckedUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckCreateWithoutStatusUpdatesInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutTruckInput;
    ownerAccess?: Prisma.OwnerTruckAccessCreateNestedManyWithoutTruckInput;
};
export type FoodTruckUncheckedCreateWithoutStatusUpdatesInput = {
    id?: string;
    name: string;
    description?: string | null;
    cuisineType?: string | null;
    imageUrl?: string | null;
    venmoHandle?: string | null;
    defaultLocation?: string | null;
    defaultLatitude?: number | null;
    defaultLongitude?: number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutTruckInput;
    ownerAccess?: Prisma.OwnerTruckAccessUncheckedCreateNestedManyWithoutTruckInput;
};
export type FoodTruckCreateOrConnectWithoutStatusUpdatesInput = {
    where: Prisma.FoodTruckWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodTruckCreateWithoutStatusUpdatesInput, Prisma.FoodTruckUncheckedCreateWithoutStatusUpdatesInput>;
};
export type FoodTruckUpsertWithoutStatusUpdatesInput = {
    update: Prisma.XOR<Prisma.FoodTruckUpdateWithoutStatusUpdatesInput, Prisma.FoodTruckUncheckedUpdateWithoutStatusUpdatesInput>;
    create: Prisma.XOR<Prisma.FoodTruckCreateWithoutStatusUpdatesInput, Prisma.FoodTruckUncheckedCreateWithoutStatusUpdatesInput>;
    where?: Prisma.FoodTruckWhereInput;
};
export type FoodTruckUpdateToOneWithWhereWithoutStatusUpdatesInput = {
    where?: Prisma.FoodTruckWhereInput;
    data: Prisma.XOR<Prisma.FoodTruckUpdateWithoutStatusUpdatesInput, Prisma.FoodTruckUncheckedUpdateWithoutStatusUpdatesInput>;
};
export type FoodTruckUpdateWithoutStatusUpdatesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    menuItems?: Prisma.MenuItemUpdateManyWithoutTruckNestedInput;
    ownerAccess?: Prisma.OwnerTruckAccessUpdateManyWithoutTruckNestedInput;
};
export type FoodTruckUncheckedUpdateWithoutStatusUpdatesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    venmoHandle?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLocation?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    defaultLatitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    defaultLongitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    typicalSchedule?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutTruckNestedInput;
    ownerAccess?: Prisma.OwnerTruckAccessUncheckedUpdateManyWithoutTruckNestedInput;
};
/**
 * Count Type FoodTruckCountOutputType
 */
export type FoodTruckCountOutputType = {
    menuItems: number;
    statusUpdates: number;
    ownerAccess: number;
};
export type FoodTruckCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menuItems?: boolean | FoodTruckCountOutputTypeCountMenuItemsArgs;
    statusUpdates?: boolean | FoodTruckCountOutputTypeCountStatusUpdatesArgs;
    ownerAccess?: boolean | FoodTruckCountOutputTypeCountOwnerAccessArgs;
};
/**
 * FoodTruckCountOutputType without action
 */
export type FoodTruckCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruckCountOutputType
     */
    select?: Prisma.FoodTruckCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * FoodTruckCountOutputType without action
 */
export type FoodTruckCountOutputTypeCountMenuItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuItemWhereInput;
};
/**
 * FoodTruckCountOutputType without action
 */
export type FoodTruckCountOutputTypeCountStatusUpdatesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatusUpdateWhereInput;
};
/**
 * FoodTruckCountOutputType without action
 */
export type FoodTruckCountOutputTypeCountOwnerAccessArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OwnerTruckAccessWhereInput;
};
export type FoodTruckSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    cuisineType?: boolean;
    imageUrl?: boolean;
    venmoHandle?: boolean;
    defaultLocation?: boolean;
    defaultLatitude?: boolean;
    defaultLongitude?: boolean;
    typicalSchedule?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    menuItems?: boolean | Prisma.FoodTruck$menuItemsArgs<ExtArgs>;
    statusUpdates?: boolean | Prisma.FoodTruck$statusUpdatesArgs<ExtArgs>;
    ownerAccess?: boolean | Prisma.FoodTruck$ownerAccessArgs<ExtArgs>;
    _count?: boolean | Prisma.FoodTruckCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodTruck"]>;
export type FoodTruckSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    cuisineType?: boolean;
    imageUrl?: boolean;
    venmoHandle?: boolean;
    defaultLocation?: boolean;
    defaultLatitude?: boolean;
    defaultLongitude?: boolean;
    typicalSchedule?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["foodTruck"]>;
export type FoodTruckSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    cuisineType?: boolean;
    imageUrl?: boolean;
    venmoHandle?: boolean;
    defaultLocation?: boolean;
    defaultLatitude?: boolean;
    defaultLongitude?: boolean;
    typicalSchedule?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["foodTruck"]>;
export type FoodTruckSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    cuisineType?: boolean;
    imageUrl?: boolean;
    venmoHandle?: boolean;
    defaultLocation?: boolean;
    defaultLatitude?: boolean;
    defaultLongitude?: boolean;
    typicalSchedule?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FoodTruckOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "cuisineType" | "imageUrl" | "venmoHandle" | "defaultLocation" | "defaultLatitude" | "defaultLongitude" | "typicalSchedule" | "createdAt" | "updatedAt", ExtArgs["result"]["foodTruck"]>;
export type FoodTruckInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menuItems?: boolean | Prisma.FoodTruck$menuItemsArgs<ExtArgs>;
    statusUpdates?: boolean | Prisma.FoodTruck$statusUpdatesArgs<ExtArgs>;
    ownerAccess?: boolean | Prisma.FoodTruck$ownerAccessArgs<ExtArgs>;
    _count?: boolean | Prisma.FoodTruckCountOutputTypeDefaultArgs<ExtArgs>;
};
export type FoodTruckIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type FoodTruckIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $FoodTruckPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FoodTruck";
    objects: {
        menuItems: Prisma.$MenuItemPayload<ExtArgs>[];
        statusUpdates: Prisma.$StatusUpdatePayload<ExtArgs>[];
        ownerAccess: Prisma.$OwnerTruckAccessPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        cuisineType: string | null;
        imageUrl: string | null;
        venmoHandle: string | null;
        defaultLocation: string | null;
        defaultLatitude: number | null;
        defaultLongitude: number | null;
        typicalSchedule: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["foodTruck"]>;
    composites: {};
};
export type FoodTruckGetPayload<S extends boolean | null | undefined | FoodTruckDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload, S>;
export type FoodTruckCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FoodTruckFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FoodTruckCountAggregateInputType | true;
};
export interface FoodTruckDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FoodTruck'];
        meta: {
            name: 'FoodTruck';
        };
    };
    /**
     * Find zero or one FoodTruck that matches the filter.
     * @param {FoodTruckFindUniqueArgs} args - Arguments to find a FoodTruck
     * @example
     * // Get one FoodTruck
     * const foodTruck = await prisma.foodTruck.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodTruckFindUniqueArgs>(args: Prisma.SelectSubset<T, FoodTruckFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FoodTruck that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodTruckFindUniqueOrThrowArgs} args - Arguments to find a FoodTruck
     * @example
     * // Get one FoodTruck
     * const foodTruck = await prisma.foodTruck.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodTruckFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FoodTruckFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FoodTruck that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckFindFirstArgs} args - Arguments to find a FoodTruck
     * @example
     * // Get one FoodTruck
     * const foodTruck = await prisma.foodTruck.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodTruckFindFirstArgs>(args?: Prisma.SelectSubset<T, FoodTruckFindFirstArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FoodTruck that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckFindFirstOrThrowArgs} args - Arguments to find a FoodTruck
     * @example
     * // Get one FoodTruck
     * const foodTruck = await prisma.foodTruck.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodTruckFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FoodTruckFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FoodTrucks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodTrucks
     * const foodTrucks = await prisma.foodTruck.findMany()
     *
     * // Get first 10 FoodTrucks
     * const foodTrucks = await prisma.foodTruck.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const foodTruckWithIdOnly = await prisma.foodTruck.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FoodTruckFindManyArgs>(args?: Prisma.SelectSubset<T, FoodTruckFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FoodTruck.
     * @param {FoodTruckCreateArgs} args - Arguments to create a FoodTruck.
     * @example
     * // Create one FoodTruck
     * const FoodTruck = await prisma.foodTruck.create({
     *   data: {
     *     // ... data to create a FoodTruck
     *   }
     * })
     *
     */
    create<T extends FoodTruckCreateArgs>(args: Prisma.SelectSubset<T, FoodTruckCreateArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FoodTrucks.
     * @param {FoodTruckCreateManyArgs} args - Arguments to create many FoodTrucks.
     * @example
     * // Create many FoodTrucks
     * const foodTruck = await prisma.foodTruck.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FoodTruckCreateManyArgs>(args?: Prisma.SelectSubset<T, FoodTruckCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FoodTrucks and returns the data saved in the database.
     * @param {FoodTruckCreateManyAndReturnArgs} args - Arguments to create many FoodTrucks.
     * @example
     * // Create many FoodTrucks
     * const foodTruck = await prisma.foodTruck.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FoodTrucks and only return the `id`
     * const foodTruckWithIdOnly = await prisma.foodTruck.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FoodTruckCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FoodTruckCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FoodTruck.
     * @param {FoodTruckDeleteArgs} args - Arguments to delete one FoodTruck.
     * @example
     * // Delete one FoodTruck
     * const FoodTruck = await prisma.foodTruck.delete({
     *   where: {
     *     // ... filter to delete one FoodTruck
     *   }
     * })
     *
     */
    delete<T extends FoodTruckDeleteArgs>(args: Prisma.SelectSubset<T, FoodTruckDeleteArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FoodTruck.
     * @param {FoodTruckUpdateArgs} args - Arguments to update one FoodTruck.
     * @example
     * // Update one FoodTruck
     * const foodTruck = await prisma.foodTruck.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FoodTruckUpdateArgs>(args: Prisma.SelectSubset<T, FoodTruckUpdateArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FoodTrucks.
     * @param {FoodTruckDeleteManyArgs} args - Arguments to filter FoodTrucks to delete.
     * @example
     * // Delete a few FoodTrucks
     * const { count } = await prisma.foodTruck.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FoodTruckDeleteManyArgs>(args?: Prisma.SelectSubset<T, FoodTruckDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FoodTrucks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodTrucks
     * const foodTruck = await prisma.foodTruck.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FoodTruckUpdateManyArgs>(args: Prisma.SelectSubset<T, FoodTruckUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FoodTrucks and returns the data updated in the database.
     * @param {FoodTruckUpdateManyAndReturnArgs} args - Arguments to update many FoodTrucks.
     * @example
     * // Update many FoodTrucks
     * const foodTruck = await prisma.foodTruck.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FoodTrucks and only return the `id`
     * const foodTruckWithIdOnly = await prisma.foodTruck.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends FoodTruckUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FoodTruckUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FoodTruck.
     * @param {FoodTruckUpsertArgs} args - Arguments to update or create a FoodTruck.
     * @example
     * // Update or create a FoodTruck
     * const foodTruck = await prisma.foodTruck.upsert({
     *   create: {
     *     // ... data to create a FoodTruck
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodTruck we want to update
     *   }
     * })
     */
    upsert<T extends FoodTruckUpsertArgs>(args: Prisma.SelectSubset<T, FoodTruckUpsertArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FoodTrucks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckCountArgs} args - Arguments to filter FoodTrucks to count.
     * @example
     * // Count the number of FoodTrucks
     * const count = await prisma.foodTruck.count({
     *   where: {
     *     // ... the filter for the FoodTrucks we want to count
     *   }
     * })
    **/
    count<T extends FoodTruckCountArgs>(args?: Prisma.Subset<T, FoodTruckCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FoodTruckCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FoodTruck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodTruckAggregateArgs>(args: Prisma.Subset<T, FoodTruckAggregateArgs>): Prisma.PrismaPromise<GetFoodTruckAggregateType<T>>;
    /**
     * Group by FoodTruck.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodTruckGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends FoodTruckGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FoodTruckGroupByArgs['orderBy'];
    } : {
        orderBy?: FoodTruckGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FoodTruckGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodTruckGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FoodTruck model
     */
    readonly fields: FoodTruckFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FoodTruck.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FoodTruckClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    menuItems<T extends Prisma.FoodTruck$menuItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodTruck$menuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    statusUpdates<T extends Prisma.FoodTruck$statusUpdatesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodTruck$statusUpdatesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    ownerAccess<T extends Prisma.FoodTruck$ownerAccessArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodTruck$ownerAccessArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the FoodTruck model
 */
export interface FoodTruckFieldRefs {
    readonly id: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly name: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly description: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly cuisineType: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly venmoHandle: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly defaultLocation: Prisma.FieldRef<"FoodTruck", 'String'>;
    readonly defaultLatitude: Prisma.FieldRef<"FoodTruck", 'Float'>;
    readonly defaultLongitude: Prisma.FieldRef<"FoodTruck", 'Float'>;
    readonly typicalSchedule: Prisma.FieldRef<"FoodTruck", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"FoodTruck", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FoodTruck", 'DateTime'>;
}
/**
 * FoodTruck findUnique
 */
export type FoodTruckFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * Filter, which FoodTruck to fetch.
     */
    where: Prisma.FoodTruckWhereUniqueInput;
};
/**
 * FoodTruck findUniqueOrThrow
 */
export type FoodTruckFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * Filter, which FoodTruck to fetch.
     */
    where: Prisma.FoodTruckWhereUniqueInput;
};
/**
 * FoodTruck findFirst
 */
export type FoodTruckFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * Filter, which FoodTruck to fetch.
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodTrucks to fetch.
     */
    orderBy?: Prisma.FoodTruckOrderByWithRelationInput | Prisma.FoodTruckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FoodTrucks.
     */
    cursor?: Prisma.FoodTruckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodTrucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodTrucks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FoodTrucks.
     */
    distinct?: Prisma.FoodTruckScalarFieldEnum | Prisma.FoodTruckScalarFieldEnum[];
};
/**
 * FoodTruck findFirstOrThrow
 */
export type FoodTruckFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * Filter, which FoodTruck to fetch.
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodTrucks to fetch.
     */
    orderBy?: Prisma.FoodTruckOrderByWithRelationInput | Prisma.FoodTruckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FoodTrucks.
     */
    cursor?: Prisma.FoodTruckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodTrucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodTrucks.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FoodTrucks.
     */
    distinct?: Prisma.FoodTruckScalarFieldEnum | Prisma.FoodTruckScalarFieldEnum[];
};
/**
 * FoodTruck findMany
 */
export type FoodTruckFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * Filter, which FoodTrucks to fetch.
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodTrucks to fetch.
     */
    orderBy?: Prisma.FoodTruckOrderByWithRelationInput | Prisma.FoodTruckOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FoodTrucks.
     */
    cursor?: Prisma.FoodTruckWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodTrucks from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodTrucks.
     */
    skip?: number;
    distinct?: Prisma.FoodTruckScalarFieldEnum | Prisma.FoodTruckScalarFieldEnum[];
};
/**
 * FoodTruck create
 */
export type FoodTruckCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * The data needed to create a FoodTruck.
     */
    data: Prisma.XOR<Prisma.FoodTruckCreateInput, Prisma.FoodTruckUncheckedCreateInput>;
};
/**
 * FoodTruck createMany
 */
export type FoodTruckCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodTrucks.
     */
    data: Prisma.FoodTruckCreateManyInput | Prisma.FoodTruckCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FoodTruck createManyAndReturn
 */
export type FoodTruckCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * The data used to create many FoodTrucks.
     */
    data: Prisma.FoodTruckCreateManyInput | Prisma.FoodTruckCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FoodTruck update
 */
export type FoodTruckUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * The data needed to update a FoodTruck.
     */
    data: Prisma.XOR<Prisma.FoodTruckUpdateInput, Prisma.FoodTruckUncheckedUpdateInput>;
    /**
     * Choose, which FoodTruck to update.
     */
    where: Prisma.FoodTruckWhereUniqueInput;
};
/**
 * FoodTruck updateMany
 */
export type FoodTruckUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodTrucks.
     */
    data: Prisma.XOR<Prisma.FoodTruckUpdateManyMutationInput, Prisma.FoodTruckUncheckedUpdateManyInput>;
    /**
     * Filter which FoodTrucks to update
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * Limit how many FoodTrucks to update.
     */
    limit?: number;
};
/**
 * FoodTruck updateManyAndReturn
 */
export type FoodTruckUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * The data used to update FoodTrucks.
     */
    data: Prisma.XOR<Prisma.FoodTruckUpdateManyMutationInput, Prisma.FoodTruckUncheckedUpdateManyInput>;
    /**
     * Filter which FoodTrucks to update
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * Limit how many FoodTrucks to update.
     */
    limit?: number;
};
/**
 * FoodTruck upsert
 */
export type FoodTruckUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * The filter to search for the FoodTruck to update in case it exists.
     */
    where: Prisma.FoodTruckWhereUniqueInput;
    /**
     * In case the FoodTruck found by the `where` argument doesn't exist, create a new FoodTruck with this data.
     */
    create: Prisma.XOR<Prisma.FoodTruckCreateInput, Prisma.FoodTruckUncheckedCreateInput>;
    /**
     * In case the FoodTruck was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FoodTruckUpdateInput, Prisma.FoodTruckUncheckedUpdateInput>;
};
/**
 * FoodTruck delete
 */
export type FoodTruckDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
    /**
     * Filter which FoodTruck to delete.
     */
    where: Prisma.FoodTruckWhereUniqueInput;
};
/**
 * FoodTruck deleteMany
 */
export type FoodTruckDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FoodTrucks to delete
     */
    where?: Prisma.FoodTruckWhereInput;
    /**
     * Limit how many FoodTrucks to delete.
     */
    limit?: number;
};
/**
 * FoodTruck.menuItems
 */
export type FoodTruck$menuItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: Prisma.MenuItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: Prisma.MenuItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemInclude<ExtArgs> | null;
    where?: Prisma.MenuItemWhereInput;
    orderBy?: Prisma.MenuItemOrderByWithRelationInput | Prisma.MenuItemOrderByWithRelationInput[];
    cursor?: Prisma.MenuItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MenuItemScalarFieldEnum | Prisma.MenuItemScalarFieldEnum[];
};
/**
 * FoodTruck.statusUpdates
 */
export type FoodTruck$statusUpdatesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusUpdate
     */
    select?: Prisma.StatusUpdateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the StatusUpdate
     */
    omit?: Prisma.StatusUpdateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatusUpdateInclude<ExtArgs> | null;
    where?: Prisma.StatusUpdateWhereInput;
    orderBy?: Prisma.StatusUpdateOrderByWithRelationInput | Prisma.StatusUpdateOrderByWithRelationInput[];
    cursor?: Prisma.StatusUpdateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.StatusUpdateScalarFieldEnum | Prisma.StatusUpdateScalarFieldEnum[];
};
/**
 * FoodTruck.ownerAccess
 */
export type FoodTruck$ownerAccessArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnerTruckAccess
     */
    select?: Prisma.OwnerTruckAccessSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the OwnerTruckAccess
     */
    omit?: Prisma.OwnerTruckAccessOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OwnerTruckAccessInclude<ExtArgs> | null;
    where?: Prisma.OwnerTruckAccessWhereInput;
    orderBy?: Prisma.OwnerTruckAccessOrderByWithRelationInput | Prisma.OwnerTruckAccessOrderByWithRelationInput[];
    cursor?: Prisma.OwnerTruckAccessWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OwnerTruckAccessScalarFieldEnum | Prisma.OwnerTruckAccessScalarFieldEnum[];
};
/**
 * FoodTruck without action
 */
export type FoodTruckDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodTruck
     */
    select?: Prisma.FoodTruckSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodTruck
     */
    omit?: Prisma.FoodTruckOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodTruckInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=FoodTruck.d.ts.map