import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model OwnerTruckAccess
 *
 */
export type OwnerTruckAccessModel = runtime.Types.Result.DefaultSelection<Prisma.$OwnerTruckAccessPayload>;
export type AggregateOwnerTruckAccess = {
    _count: OwnerTruckAccessCountAggregateOutputType | null;
    _min: OwnerTruckAccessMinAggregateOutputType | null;
    _max: OwnerTruckAccessMaxAggregateOutputType | null;
};
export type OwnerTruckAccessMinAggregateOutputType = {
    id: string | null;
    ownerId: string | null;
    truckId: string | null;
    role: $Enums.OwnerRole | null;
    createdAt: Date | null;
};
export type OwnerTruckAccessMaxAggregateOutputType = {
    id: string | null;
    ownerId: string | null;
    truckId: string | null;
    role: $Enums.OwnerRole | null;
    createdAt: Date | null;
};
export type OwnerTruckAccessCountAggregateOutputType = {
    id: number;
    ownerId: number;
    truckId: number;
    role: number;
    createdAt: number;
    _all: number;
};
export type OwnerTruckAccessMinAggregateInputType = {
    id?: true;
    ownerId?: true;
    truckId?: true;
    role?: true;
    createdAt?: true;
};
export type OwnerTruckAccessMaxAggregateInputType = {
    id?: true;
    ownerId?: true;
    truckId?: true;
    role?: true;
    createdAt?: true;
};
export type OwnerTruckAccessCountAggregateInputType = {
    id?: true;
    ownerId?: true;
    truckId?: true;
    role?: true;
    createdAt?: true;
    _all?: true;
};
export type OwnerTruckAccessAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OwnerTruckAccess to aggregate.
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OwnerTruckAccesses to fetch.
     */
    orderBy?: Prisma.OwnerTruckAccessOrderByWithRelationInput | Prisma.OwnerTruckAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.OwnerTruckAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OwnerTruckAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OwnerTruckAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned OwnerTruckAccesses
    **/
    _count?: true | OwnerTruckAccessCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: OwnerTruckAccessMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: OwnerTruckAccessMaxAggregateInputType;
};
export type GetOwnerTruckAccessAggregateType<T extends OwnerTruckAccessAggregateArgs> = {
    [P in keyof T & keyof AggregateOwnerTruckAccess]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOwnerTruckAccess[P]> : Prisma.GetScalarType<T[P], AggregateOwnerTruckAccess[P]>;
};
export type OwnerTruckAccessGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OwnerTruckAccessWhereInput;
    orderBy?: Prisma.OwnerTruckAccessOrderByWithAggregationInput | Prisma.OwnerTruckAccessOrderByWithAggregationInput[];
    by: Prisma.OwnerTruckAccessScalarFieldEnum[] | Prisma.OwnerTruckAccessScalarFieldEnum;
    having?: Prisma.OwnerTruckAccessScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OwnerTruckAccessCountAggregateInputType | true;
    _min?: OwnerTruckAccessMinAggregateInputType;
    _max?: OwnerTruckAccessMaxAggregateInputType;
};
export type OwnerTruckAccessGroupByOutputType = {
    id: string;
    ownerId: string;
    truckId: string;
    role: $Enums.OwnerRole;
    createdAt: Date;
    _count: OwnerTruckAccessCountAggregateOutputType | null;
    _min: OwnerTruckAccessMinAggregateOutputType | null;
    _max: OwnerTruckAccessMaxAggregateOutputType | null;
};
type GetOwnerTruckAccessGroupByPayload<T extends OwnerTruckAccessGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OwnerTruckAccessGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OwnerTruckAccessGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OwnerTruckAccessGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OwnerTruckAccessGroupByOutputType[P]>;
}>>;
export type OwnerTruckAccessWhereInput = {
    AND?: Prisma.OwnerTruckAccessWhereInput | Prisma.OwnerTruckAccessWhereInput[];
    OR?: Prisma.OwnerTruckAccessWhereInput[];
    NOT?: Prisma.OwnerTruckAccessWhereInput | Prisma.OwnerTruckAccessWhereInput[];
    id?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    ownerId?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    truckId?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    role?: Prisma.EnumOwnerRoleFilter<"OwnerTruckAccess"> | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFilter<"OwnerTruckAccess"> | Date | string;
    owner?: Prisma.XOR<Prisma.OwnerScalarRelationFilter, Prisma.OwnerWhereInput>;
    truck?: Prisma.XOR<Prisma.FoodTruckScalarRelationFilter, Prisma.FoodTruckWhereInput>;
};
export type OwnerTruckAccessOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    owner?: Prisma.OwnerOrderByWithRelationInput;
    truck?: Prisma.FoodTruckOrderByWithRelationInput;
};
export type OwnerTruckAccessWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    ownerId_truckId?: Prisma.OwnerTruckAccessOwnerIdTruckIdCompoundUniqueInput;
    AND?: Prisma.OwnerTruckAccessWhereInput | Prisma.OwnerTruckAccessWhereInput[];
    OR?: Prisma.OwnerTruckAccessWhereInput[];
    NOT?: Prisma.OwnerTruckAccessWhereInput | Prisma.OwnerTruckAccessWhereInput[];
    ownerId?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    truckId?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    role?: Prisma.EnumOwnerRoleFilter<"OwnerTruckAccess"> | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFilter<"OwnerTruckAccess"> | Date | string;
    owner?: Prisma.XOR<Prisma.OwnerScalarRelationFilter, Prisma.OwnerWhereInput>;
    truck?: Prisma.XOR<Prisma.FoodTruckScalarRelationFilter, Prisma.FoodTruckWhereInput>;
}, "id" | "ownerId_truckId">;
export type OwnerTruckAccessOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.OwnerTruckAccessCountOrderByAggregateInput;
    _max?: Prisma.OwnerTruckAccessMaxOrderByAggregateInput;
    _min?: Prisma.OwnerTruckAccessMinOrderByAggregateInput;
};
export type OwnerTruckAccessScalarWhereWithAggregatesInput = {
    AND?: Prisma.OwnerTruckAccessScalarWhereWithAggregatesInput | Prisma.OwnerTruckAccessScalarWhereWithAggregatesInput[];
    OR?: Prisma.OwnerTruckAccessScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OwnerTruckAccessScalarWhereWithAggregatesInput | Prisma.OwnerTruckAccessScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OwnerTruckAccess"> | string;
    ownerId?: Prisma.StringWithAggregatesFilter<"OwnerTruckAccess"> | string;
    truckId?: Prisma.StringWithAggregatesFilter<"OwnerTruckAccess"> | string;
    role?: Prisma.EnumOwnerRoleWithAggregatesFilter<"OwnerTruckAccess"> | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"OwnerTruckAccess"> | Date | string;
};
export type OwnerTruckAccessCreateInput = {
    id?: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
    owner: Prisma.OwnerCreateNestedOneWithoutTrucksInput;
    truck: Prisma.FoodTruckCreateNestedOneWithoutOwnerAccessInput;
};
export type OwnerTruckAccessUncheckedCreateInput = {
    id?: string;
    ownerId: string;
    truckId: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
};
export type OwnerTruckAccessUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.OwnerUpdateOneRequiredWithoutTrucksNestedInput;
    truck?: Prisma.FoodTruckUpdateOneRequiredWithoutOwnerAccessNestedInput;
};
export type OwnerTruckAccessUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessCreateManyInput = {
    id?: string;
    ownerId: string;
    truckId: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
};
export type OwnerTruckAccessUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessListRelationFilter = {
    every?: Prisma.OwnerTruckAccessWhereInput;
    some?: Prisma.OwnerTruckAccessWhereInput;
    none?: Prisma.OwnerTruckAccessWhereInput;
};
export type OwnerTruckAccessOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OwnerTruckAccessOwnerIdTruckIdCompoundUniqueInput = {
    ownerId: string;
    truckId: string;
};
export type OwnerTruckAccessCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OwnerTruckAccessMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OwnerTruckAccessMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type OwnerTruckAccessCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput> | Prisma.OwnerTruckAccessCreateWithoutTruckInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyTruckInputEnvelope;
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
};
export type OwnerTruckAccessUncheckedCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput> | Prisma.OwnerTruckAccessCreateWithoutTruckInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyTruckInputEnvelope;
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
};
export type OwnerTruckAccessUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput> | Prisma.OwnerTruckAccessCreateWithoutTruckInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutTruckInput | Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyTruckInputEnvelope;
    set?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    disconnect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    delete?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    update?: Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutTruckInput | Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutTruckInput | Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.OwnerTruckAccessScalarWhereInput | Prisma.OwnerTruckAccessScalarWhereInput[];
};
export type OwnerTruckAccessUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput> | Prisma.OwnerTruckAccessCreateWithoutTruckInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutTruckInput | Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyTruckInputEnvelope;
    set?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    disconnect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    delete?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    update?: Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutTruckInput | Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutTruckInput | Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.OwnerTruckAccessScalarWhereInput | Prisma.OwnerTruckAccessScalarWhereInput[];
};
export type OwnerTruckAccessCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput> | Prisma.OwnerTruckAccessCreateWithoutOwnerInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyOwnerInputEnvelope;
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
};
export type OwnerTruckAccessUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput> | Prisma.OwnerTruckAccessCreateWithoutOwnerInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyOwnerInputEnvelope;
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
};
export type OwnerTruckAccessUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput> | Prisma.OwnerTruckAccessCreateWithoutOwnerInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutOwnerInput | Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyOwnerInputEnvelope;
    set?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    disconnect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    delete?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    update?: Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutOwnerInput | Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutOwnerInput | Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.OwnerTruckAccessScalarWhereInput | Prisma.OwnerTruckAccessScalarWhereInput[];
};
export type OwnerTruckAccessUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput> | Prisma.OwnerTruckAccessCreateWithoutOwnerInput[] | Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput | Prisma.OwnerTruckAccessCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutOwnerInput | Prisma.OwnerTruckAccessUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.OwnerTruckAccessCreateManyOwnerInputEnvelope;
    set?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    disconnect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    delete?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    connect?: Prisma.OwnerTruckAccessWhereUniqueInput | Prisma.OwnerTruckAccessWhereUniqueInput[];
    update?: Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutOwnerInput | Prisma.OwnerTruckAccessUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutOwnerInput | Prisma.OwnerTruckAccessUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.OwnerTruckAccessScalarWhereInput | Prisma.OwnerTruckAccessScalarWhereInput[];
};
export type EnumOwnerRoleFieldUpdateOperationsInput = {
    set?: $Enums.OwnerRole;
};
export type OwnerTruckAccessCreateWithoutTruckInput = {
    id?: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
    owner: Prisma.OwnerCreateNestedOneWithoutTrucksInput;
};
export type OwnerTruckAccessUncheckedCreateWithoutTruckInput = {
    id?: string;
    ownerId: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
};
export type OwnerTruckAccessCreateOrConnectWithoutTruckInput = {
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput>;
};
export type OwnerTruckAccessCreateManyTruckInputEnvelope = {
    data: Prisma.OwnerTruckAccessCreateManyTruckInput | Prisma.OwnerTruckAccessCreateManyTruckInput[];
    skipDuplicates?: boolean;
};
export type OwnerTruckAccessUpsertWithWhereUniqueWithoutTruckInput = {
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.OwnerTruckAccessUpdateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedUpdateWithoutTruckInput>;
    create: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutTruckInput>;
};
export type OwnerTruckAccessUpdateWithWhereUniqueWithoutTruckInput = {
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateWithoutTruckInput, Prisma.OwnerTruckAccessUncheckedUpdateWithoutTruckInput>;
};
export type OwnerTruckAccessUpdateManyWithWhereWithoutTruckInput = {
    where: Prisma.OwnerTruckAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateManyMutationInput, Prisma.OwnerTruckAccessUncheckedUpdateManyWithoutTruckInput>;
};
export type OwnerTruckAccessScalarWhereInput = {
    AND?: Prisma.OwnerTruckAccessScalarWhereInput | Prisma.OwnerTruckAccessScalarWhereInput[];
    OR?: Prisma.OwnerTruckAccessScalarWhereInput[];
    NOT?: Prisma.OwnerTruckAccessScalarWhereInput | Prisma.OwnerTruckAccessScalarWhereInput[];
    id?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    ownerId?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    truckId?: Prisma.StringFilter<"OwnerTruckAccess"> | string;
    role?: Prisma.EnumOwnerRoleFilter<"OwnerTruckAccess"> | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFilter<"OwnerTruckAccess"> | Date | string;
};
export type OwnerTruckAccessCreateWithoutOwnerInput = {
    id?: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
    truck: Prisma.FoodTruckCreateNestedOneWithoutOwnerAccessInput;
};
export type OwnerTruckAccessUncheckedCreateWithoutOwnerInput = {
    id?: string;
    truckId: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
};
export type OwnerTruckAccessCreateOrConnectWithoutOwnerInput = {
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    create: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput>;
};
export type OwnerTruckAccessCreateManyOwnerInputEnvelope = {
    data: Prisma.OwnerTruckAccessCreateManyOwnerInput | Prisma.OwnerTruckAccessCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type OwnerTruckAccessUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    update: Prisma.XOR<Prisma.OwnerTruckAccessUpdateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.OwnerTruckAccessCreateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedCreateWithoutOwnerInput>;
};
export type OwnerTruckAccessUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateWithoutOwnerInput, Prisma.OwnerTruckAccessUncheckedUpdateWithoutOwnerInput>;
};
export type OwnerTruckAccessUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.OwnerTruckAccessScalarWhereInput;
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateManyMutationInput, Prisma.OwnerTruckAccessUncheckedUpdateManyWithoutOwnerInput>;
};
export type OwnerTruckAccessCreateManyTruckInput = {
    id?: string;
    ownerId: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
};
export type OwnerTruckAccessUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.OwnerUpdateOneRequiredWithoutTrucksNestedInput;
};
export type OwnerTruckAccessUncheckedUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessUncheckedUpdateManyWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessCreateManyOwnerInput = {
    id?: string;
    truckId: string;
    role?: $Enums.OwnerRole;
    createdAt?: Date | string;
};
export type OwnerTruckAccessUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    truck?: Prisma.FoodTruckUpdateOneRequiredWithoutOwnerAccessNestedInput;
};
export type OwnerTruckAccessUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumOwnerRoleFieldUpdateOperationsInput | $Enums.OwnerRole;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OwnerTruckAccessSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    truckId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    owner?: boolean | Prisma.OwnerDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ownerTruckAccess"]>;
export type OwnerTruckAccessSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    truckId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    owner?: boolean | Prisma.OwnerDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ownerTruckAccess"]>;
export type OwnerTruckAccessSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    ownerId?: boolean;
    truckId?: boolean;
    role?: boolean;
    createdAt?: boolean;
    owner?: boolean | Prisma.OwnerDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["ownerTruckAccess"]>;
export type OwnerTruckAccessSelectScalar = {
    id?: boolean;
    ownerId?: boolean;
    truckId?: boolean;
    role?: boolean;
    createdAt?: boolean;
};
export type OwnerTruckAccessOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "ownerId" | "truckId" | "role" | "createdAt", ExtArgs["result"]["ownerTruckAccess"]>;
export type OwnerTruckAccessInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.OwnerDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
};
export type OwnerTruckAccessIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.OwnerDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
};
export type OwnerTruckAccessIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.OwnerDefaultArgs<ExtArgs>;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
};
export type $OwnerTruckAccessPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OwnerTruckAccess";
    objects: {
        owner: Prisma.$OwnerPayload<ExtArgs>;
        truck: Prisma.$FoodTruckPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        ownerId: string;
        truckId: string;
        role: $Enums.OwnerRole;
        createdAt: Date;
    }, ExtArgs["result"]["ownerTruckAccess"]>;
    composites: {};
};
export type OwnerTruckAccessGetPayload<S extends boolean | null | undefined | OwnerTruckAccessDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload, S>;
export type OwnerTruckAccessCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OwnerTruckAccessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OwnerTruckAccessCountAggregateInputType | true;
};
export interface OwnerTruckAccessDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OwnerTruckAccess'];
        meta: {
            name: 'OwnerTruckAccess';
        };
    };
    /**
     * Find zero or one OwnerTruckAccess that matches the filter.
     * @param {OwnerTruckAccessFindUniqueArgs} args - Arguments to find a OwnerTruckAccess
     * @example
     * // Get one OwnerTruckAccess
     * const ownerTruckAccess = await prisma.ownerTruckAccess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OwnerTruckAccessFindUniqueArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one OwnerTruckAccess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OwnerTruckAccessFindUniqueOrThrowArgs} args - Arguments to find a OwnerTruckAccess
     * @example
     * // Get one OwnerTruckAccess
     * const ownerTruckAccess = await prisma.ownerTruckAccess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OwnerTruckAccessFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OwnerTruckAccess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessFindFirstArgs} args - Arguments to find a OwnerTruckAccess
     * @example
     * // Get one OwnerTruckAccess
     * const ownerTruckAccess = await prisma.ownerTruckAccess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OwnerTruckAccessFindFirstArgs>(args?: Prisma.SelectSubset<T, OwnerTruckAccessFindFirstArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first OwnerTruckAccess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessFindFirstOrThrowArgs} args - Arguments to find a OwnerTruckAccess
     * @example
     * // Get one OwnerTruckAccess
     * const ownerTruckAccess = await prisma.ownerTruckAccess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OwnerTruckAccessFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OwnerTruckAccessFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more OwnerTruckAccesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OwnerTruckAccesses
     * const ownerTruckAccesses = await prisma.ownerTruckAccess.findMany()
     *
     * // Get first 10 OwnerTruckAccesses
     * const ownerTruckAccesses = await prisma.ownerTruckAccess.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const ownerTruckAccessWithIdOnly = await prisma.ownerTruckAccess.findMany({ select: { id: true } })
     *
     */
    findMany<T extends OwnerTruckAccessFindManyArgs>(args?: Prisma.SelectSubset<T, OwnerTruckAccessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a OwnerTruckAccess.
     * @param {OwnerTruckAccessCreateArgs} args - Arguments to create a OwnerTruckAccess.
     * @example
     * // Create one OwnerTruckAccess
     * const OwnerTruckAccess = await prisma.ownerTruckAccess.create({
     *   data: {
     *     // ... data to create a OwnerTruckAccess
     *   }
     * })
     *
     */
    create<T extends OwnerTruckAccessCreateArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessCreateArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many OwnerTruckAccesses.
     * @param {OwnerTruckAccessCreateManyArgs} args - Arguments to create many OwnerTruckAccesses.
     * @example
     * // Create many OwnerTruckAccesses
     * const ownerTruckAccess = await prisma.ownerTruckAccess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends OwnerTruckAccessCreateManyArgs>(args?: Prisma.SelectSubset<T, OwnerTruckAccessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many OwnerTruckAccesses and returns the data saved in the database.
     * @param {OwnerTruckAccessCreateManyAndReturnArgs} args - Arguments to create many OwnerTruckAccesses.
     * @example
     * // Create many OwnerTruckAccesses
     * const ownerTruckAccess = await prisma.ownerTruckAccess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many OwnerTruckAccesses and only return the `id`
     * const ownerTruckAccessWithIdOnly = await prisma.ownerTruckAccess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends OwnerTruckAccessCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OwnerTruckAccessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a OwnerTruckAccess.
     * @param {OwnerTruckAccessDeleteArgs} args - Arguments to delete one OwnerTruckAccess.
     * @example
     * // Delete one OwnerTruckAccess
     * const OwnerTruckAccess = await prisma.ownerTruckAccess.delete({
     *   where: {
     *     // ... filter to delete one OwnerTruckAccess
     *   }
     * })
     *
     */
    delete<T extends OwnerTruckAccessDeleteArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessDeleteArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one OwnerTruckAccess.
     * @param {OwnerTruckAccessUpdateArgs} args - Arguments to update one OwnerTruckAccess.
     * @example
     * // Update one OwnerTruckAccess
     * const ownerTruckAccess = await prisma.ownerTruckAccess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends OwnerTruckAccessUpdateArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessUpdateArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more OwnerTruckAccesses.
     * @param {OwnerTruckAccessDeleteManyArgs} args - Arguments to filter OwnerTruckAccesses to delete.
     * @example
     * // Delete a few OwnerTruckAccesses
     * const { count } = await prisma.ownerTruckAccess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends OwnerTruckAccessDeleteManyArgs>(args?: Prisma.SelectSubset<T, OwnerTruckAccessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OwnerTruckAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OwnerTruckAccesses
     * const ownerTruckAccess = await prisma.ownerTruckAccess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends OwnerTruckAccessUpdateManyArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more OwnerTruckAccesses and returns the data updated in the database.
     * @param {OwnerTruckAccessUpdateManyAndReturnArgs} args - Arguments to update many OwnerTruckAccesses.
     * @example
     * // Update many OwnerTruckAccesses
     * const ownerTruckAccess = await prisma.ownerTruckAccess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more OwnerTruckAccesses and only return the `id`
     * const ownerTruckAccessWithIdOnly = await prisma.ownerTruckAccess.updateManyAndReturn({
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
    updateManyAndReturn<T extends OwnerTruckAccessUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one OwnerTruckAccess.
     * @param {OwnerTruckAccessUpsertArgs} args - Arguments to update or create a OwnerTruckAccess.
     * @example
     * // Update or create a OwnerTruckAccess
     * const ownerTruckAccess = await prisma.ownerTruckAccess.upsert({
     *   create: {
     *     // ... data to create a OwnerTruckAccess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OwnerTruckAccess we want to update
     *   }
     * })
     */
    upsert<T extends OwnerTruckAccessUpsertArgs>(args: Prisma.SelectSubset<T, OwnerTruckAccessUpsertArgs<ExtArgs>>): Prisma.Prisma__OwnerTruckAccessClient<runtime.Types.Result.GetResult<Prisma.$OwnerTruckAccessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of OwnerTruckAccesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessCountArgs} args - Arguments to filter OwnerTruckAccesses to count.
     * @example
     * // Count the number of OwnerTruckAccesses
     * const count = await prisma.ownerTruckAccess.count({
     *   where: {
     *     // ... the filter for the OwnerTruckAccesses we want to count
     *   }
     * })
    **/
    count<T extends OwnerTruckAccessCountArgs>(args?: Prisma.Subset<T, OwnerTruckAccessCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OwnerTruckAccessCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a OwnerTruckAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OwnerTruckAccessAggregateArgs>(args: Prisma.Subset<T, OwnerTruckAccessAggregateArgs>): Prisma.PrismaPromise<GetOwnerTruckAccessAggregateType<T>>;
    /**
     * Group by OwnerTruckAccess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerTruckAccessGroupByArgs} args - Group by arguments.
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
    groupBy<T extends OwnerTruckAccessGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OwnerTruckAccessGroupByArgs['orderBy'];
    } : {
        orderBy?: OwnerTruckAccessGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OwnerTruckAccessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerTruckAccessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the OwnerTruckAccess model
     */
    readonly fields: OwnerTruckAccessFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for OwnerTruckAccess.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__OwnerTruckAccessClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.OwnerDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OwnerDefaultArgs<ExtArgs>>): Prisma.Prisma__OwnerClient<runtime.Types.Result.GetResult<Prisma.$OwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    truck<T extends Prisma.FoodTruckDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.FoodTruckDefaultArgs<ExtArgs>>): Prisma.Prisma__FoodTruckClient<runtime.Types.Result.GetResult<Prisma.$FoodTruckPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the OwnerTruckAccess model
 */
export interface OwnerTruckAccessFieldRefs {
    readonly id: Prisma.FieldRef<"OwnerTruckAccess", 'String'>;
    readonly ownerId: Prisma.FieldRef<"OwnerTruckAccess", 'String'>;
    readonly truckId: Prisma.FieldRef<"OwnerTruckAccess", 'String'>;
    readonly role: Prisma.FieldRef<"OwnerTruckAccess", 'OwnerRole'>;
    readonly createdAt: Prisma.FieldRef<"OwnerTruckAccess", 'DateTime'>;
}
/**
 * OwnerTruckAccess findUnique
 */
export type OwnerTruckAccessFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OwnerTruckAccess to fetch.
     */
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
};
/**
 * OwnerTruckAccess findUniqueOrThrow
 */
export type OwnerTruckAccessFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OwnerTruckAccess to fetch.
     */
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
};
/**
 * OwnerTruckAccess findFirst
 */
export type OwnerTruckAccessFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OwnerTruckAccess to fetch.
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OwnerTruckAccesses to fetch.
     */
    orderBy?: Prisma.OwnerTruckAccessOrderByWithRelationInput | Prisma.OwnerTruckAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OwnerTruckAccesses.
     */
    cursor?: Prisma.OwnerTruckAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OwnerTruckAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OwnerTruckAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OwnerTruckAccesses.
     */
    distinct?: Prisma.OwnerTruckAccessScalarFieldEnum | Prisma.OwnerTruckAccessScalarFieldEnum[];
};
/**
 * OwnerTruckAccess findFirstOrThrow
 */
export type OwnerTruckAccessFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OwnerTruckAccess to fetch.
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OwnerTruckAccesses to fetch.
     */
    orderBy?: Prisma.OwnerTruckAccessOrderByWithRelationInput | Prisma.OwnerTruckAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for OwnerTruckAccesses.
     */
    cursor?: Prisma.OwnerTruckAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OwnerTruckAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OwnerTruckAccesses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of OwnerTruckAccesses.
     */
    distinct?: Prisma.OwnerTruckAccessScalarFieldEnum | Prisma.OwnerTruckAccessScalarFieldEnum[];
};
/**
 * OwnerTruckAccess findMany
 */
export type OwnerTruckAccessFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which OwnerTruckAccesses to fetch.
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of OwnerTruckAccesses to fetch.
     */
    orderBy?: Prisma.OwnerTruckAccessOrderByWithRelationInput | Prisma.OwnerTruckAccessOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing OwnerTruckAccesses.
     */
    cursor?: Prisma.OwnerTruckAccessWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` OwnerTruckAccesses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` OwnerTruckAccesses.
     */
    skip?: number;
    distinct?: Prisma.OwnerTruckAccessScalarFieldEnum | Prisma.OwnerTruckAccessScalarFieldEnum[];
};
/**
 * OwnerTruckAccess create
 */
export type OwnerTruckAccessCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a OwnerTruckAccess.
     */
    data: Prisma.XOR<Prisma.OwnerTruckAccessCreateInput, Prisma.OwnerTruckAccessUncheckedCreateInput>;
};
/**
 * OwnerTruckAccess createMany
 */
export type OwnerTruckAccessCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many OwnerTruckAccesses.
     */
    data: Prisma.OwnerTruckAccessCreateManyInput | Prisma.OwnerTruckAccessCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * OwnerTruckAccess createManyAndReturn
 */
export type OwnerTruckAccessCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnerTruckAccess
     */
    select?: Prisma.OwnerTruckAccessSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OwnerTruckAccess
     */
    omit?: Prisma.OwnerTruckAccessOmit<ExtArgs> | null;
    /**
     * The data used to create many OwnerTruckAccesses.
     */
    data: Prisma.OwnerTruckAccessCreateManyInput | Prisma.OwnerTruckAccessCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OwnerTruckAccessIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * OwnerTruckAccess update
 */
export type OwnerTruckAccessUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a OwnerTruckAccess.
     */
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateInput, Prisma.OwnerTruckAccessUncheckedUpdateInput>;
    /**
     * Choose, which OwnerTruckAccess to update.
     */
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
};
/**
 * OwnerTruckAccess updateMany
 */
export type OwnerTruckAccessUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update OwnerTruckAccesses.
     */
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateManyMutationInput, Prisma.OwnerTruckAccessUncheckedUpdateManyInput>;
    /**
     * Filter which OwnerTruckAccesses to update
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * Limit how many OwnerTruckAccesses to update.
     */
    limit?: number;
};
/**
 * OwnerTruckAccess updateManyAndReturn
 */
export type OwnerTruckAccessUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OwnerTruckAccess
     */
    select?: Prisma.OwnerTruckAccessSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the OwnerTruckAccess
     */
    omit?: Prisma.OwnerTruckAccessOmit<ExtArgs> | null;
    /**
     * The data used to update OwnerTruckAccesses.
     */
    data: Prisma.XOR<Prisma.OwnerTruckAccessUpdateManyMutationInput, Prisma.OwnerTruckAccessUncheckedUpdateManyInput>;
    /**
     * Filter which OwnerTruckAccesses to update
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * Limit how many OwnerTruckAccesses to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OwnerTruckAccessIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * OwnerTruckAccess upsert
 */
export type OwnerTruckAccessUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the OwnerTruckAccess to update in case it exists.
     */
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
    /**
     * In case the OwnerTruckAccess found by the `where` argument doesn't exist, create a new OwnerTruckAccess with this data.
     */
    create: Prisma.XOR<Prisma.OwnerTruckAccessCreateInput, Prisma.OwnerTruckAccessUncheckedCreateInput>;
    /**
     * In case the OwnerTruckAccess was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.OwnerTruckAccessUpdateInput, Prisma.OwnerTruckAccessUncheckedUpdateInput>;
};
/**
 * OwnerTruckAccess delete
 */
export type OwnerTruckAccessDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which OwnerTruckAccess to delete.
     */
    where: Prisma.OwnerTruckAccessWhereUniqueInput;
};
/**
 * OwnerTruckAccess deleteMany
 */
export type OwnerTruckAccessDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which OwnerTruckAccesses to delete
     */
    where?: Prisma.OwnerTruckAccessWhereInput;
    /**
     * Limit how many OwnerTruckAccesses to delete.
     */
    limit?: number;
};
/**
 * OwnerTruckAccess without action
 */
export type OwnerTruckAccessDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=OwnerTruckAccess.d.ts.map