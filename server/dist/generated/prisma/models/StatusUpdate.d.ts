import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model StatusUpdate
 *
 */
export type StatusUpdateModel = runtime.Types.Result.DefaultSelection<Prisma.$StatusUpdatePayload>;
export type AggregateStatusUpdate = {
    _count: StatusUpdateCountAggregateOutputType | null;
    _avg: StatusUpdateAvgAggregateOutputType | null;
    _sum: StatusUpdateSumAggregateOutputType | null;
    _min: StatusUpdateMinAggregateOutputType | null;
    _max: StatusUpdateMaxAggregateOutputType | null;
};
export type StatusUpdateAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    reliability: number | null;
};
export type StatusUpdateSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    reliability: number | null;
};
export type StatusUpdateMinAggregateOutputType = {
    id: string | null;
    truckId: string | null;
    status: $Enums.TruckStatus | null;
    latitude: number | null;
    longitude: number | null;
    note: string | null;
    reporterName: string | null;
    reliability: number | null;
    photoUrl: string | null;
    createdAt: Date | null;
    source: $Enums.StatusSource | null;
};
export type StatusUpdateMaxAggregateOutputType = {
    id: string | null;
    truckId: string | null;
    status: $Enums.TruckStatus | null;
    latitude: number | null;
    longitude: number | null;
    note: string | null;
    reporterName: string | null;
    reliability: number | null;
    photoUrl: string | null;
    createdAt: Date | null;
    source: $Enums.StatusSource | null;
};
export type StatusUpdateCountAggregateOutputType = {
    id: number;
    truckId: number;
    status: number;
    latitude: number;
    longitude: number;
    note: number;
    reporterName: number;
    reliability: number;
    photoUrl: number;
    createdAt: number;
    source: number;
    _all: number;
};
export type StatusUpdateAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    reliability?: true;
};
export type StatusUpdateSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    reliability?: true;
};
export type StatusUpdateMinAggregateInputType = {
    id?: true;
    truckId?: true;
    status?: true;
    latitude?: true;
    longitude?: true;
    note?: true;
    reporterName?: true;
    reliability?: true;
    photoUrl?: true;
    createdAt?: true;
    source?: true;
};
export type StatusUpdateMaxAggregateInputType = {
    id?: true;
    truckId?: true;
    status?: true;
    latitude?: true;
    longitude?: true;
    note?: true;
    reporterName?: true;
    reliability?: true;
    photoUrl?: true;
    createdAt?: true;
    source?: true;
};
export type StatusUpdateCountAggregateInputType = {
    id?: true;
    truckId?: true;
    status?: true;
    latitude?: true;
    longitude?: true;
    note?: true;
    reporterName?: true;
    reliability?: true;
    photoUrl?: true;
    createdAt?: true;
    source?: true;
    _all?: true;
};
export type StatusUpdateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StatusUpdate to aggregate.
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StatusUpdates to fetch.
     */
    orderBy?: Prisma.StatusUpdateOrderByWithRelationInput | Prisma.StatusUpdateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.StatusUpdateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StatusUpdates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StatusUpdates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned StatusUpdates
    **/
    _count?: true | StatusUpdateCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: StatusUpdateAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: StatusUpdateSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: StatusUpdateMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: StatusUpdateMaxAggregateInputType;
};
export type GetStatusUpdateAggregateType<T extends StatusUpdateAggregateArgs> = {
    [P in keyof T & keyof AggregateStatusUpdate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateStatusUpdate[P]> : Prisma.GetScalarType<T[P], AggregateStatusUpdate[P]>;
};
export type StatusUpdateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.StatusUpdateWhereInput;
    orderBy?: Prisma.StatusUpdateOrderByWithAggregationInput | Prisma.StatusUpdateOrderByWithAggregationInput[];
    by: Prisma.StatusUpdateScalarFieldEnum[] | Prisma.StatusUpdateScalarFieldEnum;
    having?: Prisma.StatusUpdateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: StatusUpdateCountAggregateInputType | true;
    _avg?: StatusUpdateAvgAggregateInputType;
    _sum?: StatusUpdateSumAggregateInputType;
    _min?: StatusUpdateMinAggregateInputType;
    _max?: StatusUpdateMaxAggregateInputType;
};
export type StatusUpdateGroupByOutputType = {
    id: string;
    truckId: string;
    status: $Enums.TruckStatus;
    latitude: number | null;
    longitude: number | null;
    note: string | null;
    reporterName: string | null;
    reliability: number | null;
    photoUrl: string | null;
    createdAt: Date;
    source: $Enums.StatusSource;
    _count: StatusUpdateCountAggregateOutputType | null;
    _avg: StatusUpdateAvgAggregateOutputType | null;
    _sum: StatusUpdateSumAggregateOutputType | null;
    _min: StatusUpdateMinAggregateOutputType | null;
    _max: StatusUpdateMaxAggregateOutputType | null;
};
type GetStatusUpdateGroupByPayload<T extends StatusUpdateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<StatusUpdateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof StatusUpdateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], StatusUpdateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], StatusUpdateGroupByOutputType[P]>;
}>>;
export type StatusUpdateWhereInput = {
    AND?: Prisma.StatusUpdateWhereInput | Prisma.StatusUpdateWhereInput[];
    OR?: Prisma.StatusUpdateWhereInput[];
    NOT?: Prisma.StatusUpdateWhereInput | Prisma.StatusUpdateWhereInput[];
    id?: Prisma.StringFilter<"StatusUpdate"> | string;
    truckId?: Prisma.StringFilter<"StatusUpdate"> | string;
    status?: Prisma.EnumTruckStatusFilter<"StatusUpdate"> | $Enums.TruckStatus;
    latitude?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    note?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    reporterName?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    reliability?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    photoUrl?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StatusUpdate"> | Date | string;
    source?: Prisma.EnumStatusSourceFilter<"StatusUpdate"> | $Enums.StatusSource;
    truck?: Prisma.XOR<Prisma.FoodTruckScalarRelationFilter, Prisma.FoodTruckWhereInput>;
};
export type StatusUpdateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    reporterName?: Prisma.SortOrderInput | Prisma.SortOrder;
    reliability?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    truck?: Prisma.FoodTruckOrderByWithRelationInput;
};
export type StatusUpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.StatusUpdateWhereInput | Prisma.StatusUpdateWhereInput[];
    OR?: Prisma.StatusUpdateWhereInput[];
    NOT?: Prisma.StatusUpdateWhereInput | Prisma.StatusUpdateWhereInput[];
    truckId?: Prisma.StringFilter<"StatusUpdate"> | string;
    status?: Prisma.EnumTruckStatusFilter<"StatusUpdate"> | $Enums.TruckStatus;
    latitude?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    note?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    reporterName?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    reliability?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    photoUrl?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StatusUpdate"> | Date | string;
    source?: Prisma.EnumStatusSourceFilter<"StatusUpdate"> | $Enums.StatusSource;
    truck?: Prisma.XOR<Prisma.FoodTruckScalarRelationFilter, Prisma.FoodTruckWhereInput>;
}, "id">;
export type StatusUpdateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    note?: Prisma.SortOrderInput | Prisma.SortOrder;
    reporterName?: Prisma.SortOrderInput | Prisma.SortOrder;
    reliability?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    _count?: Prisma.StatusUpdateCountOrderByAggregateInput;
    _avg?: Prisma.StatusUpdateAvgOrderByAggregateInput;
    _max?: Prisma.StatusUpdateMaxOrderByAggregateInput;
    _min?: Prisma.StatusUpdateMinOrderByAggregateInput;
    _sum?: Prisma.StatusUpdateSumOrderByAggregateInput;
};
export type StatusUpdateScalarWhereWithAggregatesInput = {
    AND?: Prisma.StatusUpdateScalarWhereWithAggregatesInput | Prisma.StatusUpdateScalarWhereWithAggregatesInput[];
    OR?: Prisma.StatusUpdateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.StatusUpdateScalarWhereWithAggregatesInput | Prisma.StatusUpdateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"StatusUpdate"> | string;
    truckId?: Prisma.StringWithAggregatesFilter<"StatusUpdate"> | string;
    status?: Prisma.EnumTruckStatusWithAggregatesFilter<"StatusUpdate"> | $Enums.TruckStatus;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"StatusUpdate"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"StatusUpdate"> | number | null;
    note?: Prisma.StringNullableWithAggregatesFilter<"StatusUpdate"> | string | null;
    reporterName?: Prisma.StringNullableWithAggregatesFilter<"StatusUpdate"> | string | null;
    reliability?: Prisma.FloatNullableWithAggregatesFilter<"StatusUpdate"> | number | null;
    photoUrl?: Prisma.StringNullableWithAggregatesFilter<"StatusUpdate"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"StatusUpdate"> | Date | string;
    source?: Prisma.EnumStatusSourceWithAggregatesFilter<"StatusUpdate"> | $Enums.StatusSource;
};
export type StatusUpdateCreateInput = {
    id?: string;
    status: $Enums.TruckStatus;
    latitude?: number | null;
    longitude?: number | null;
    note?: string | null;
    reporterName?: string | null;
    reliability?: number | null;
    photoUrl?: string | null;
    createdAt?: Date | string;
    source?: $Enums.StatusSource;
    truck: Prisma.FoodTruckCreateNestedOneWithoutStatusUpdatesInput;
};
export type StatusUpdateUncheckedCreateInput = {
    id?: string;
    truckId: string;
    status: $Enums.TruckStatus;
    latitude?: number | null;
    longitude?: number | null;
    note?: string | null;
    reporterName?: string | null;
    reliability?: number | null;
    photoUrl?: string | null;
    createdAt?: Date | string;
    source?: $Enums.StatusSource;
};
export type StatusUpdateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
    truck?: Prisma.FoodTruckUpdateOneRequiredWithoutStatusUpdatesNestedInput;
};
export type StatusUpdateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
};
export type StatusUpdateCreateManyInput = {
    id?: string;
    truckId: string;
    status: $Enums.TruckStatus;
    latitude?: number | null;
    longitude?: number | null;
    note?: string | null;
    reporterName?: string | null;
    reliability?: number | null;
    photoUrl?: string | null;
    createdAt?: Date | string;
    source?: $Enums.StatusSource;
};
export type StatusUpdateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
};
export type StatusUpdateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    truckId?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
};
export type StatusUpdateListRelationFilter = {
    every?: Prisma.StatusUpdateWhereInput;
    some?: Prisma.StatusUpdateWhereInput;
    none?: Prisma.StatusUpdateWhereInput;
};
export type StatusUpdateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type StatusUpdateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    reporterName?: Prisma.SortOrder;
    reliability?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
};
export type StatusUpdateAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    reliability?: Prisma.SortOrder;
};
export type StatusUpdateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    reporterName?: Prisma.SortOrder;
    reliability?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
};
export type StatusUpdateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    truckId?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    reporterName?: Prisma.SortOrder;
    reliability?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
};
export type StatusUpdateSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    reliability?: Prisma.SortOrder;
};
export type StatusUpdateCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.StatusUpdateCreateWithoutTruckInput, Prisma.StatusUpdateUncheckedCreateWithoutTruckInput> | Prisma.StatusUpdateCreateWithoutTruckInput[] | Prisma.StatusUpdateUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.StatusUpdateCreateOrConnectWithoutTruckInput | Prisma.StatusUpdateCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.StatusUpdateCreateManyTruckInputEnvelope;
    connect?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
};
export type StatusUpdateUncheckedCreateNestedManyWithoutTruckInput = {
    create?: Prisma.XOR<Prisma.StatusUpdateCreateWithoutTruckInput, Prisma.StatusUpdateUncheckedCreateWithoutTruckInput> | Prisma.StatusUpdateCreateWithoutTruckInput[] | Prisma.StatusUpdateUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.StatusUpdateCreateOrConnectWithoutTruckInput | Prisma.StatusUpdateCreateOrConnectWithoutTruckInput[];
    createMany?: Prisma.StatusUpdateCreateManyTruckInputEnvelope;
    connect?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
};
export type StatusUpdateUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.StatusUpdateCreateWithoutTruckInput, Prisma.StatusUpdateUncheckedCreateWithoutTruckInput> | Prisma.StatusUpdateCreateWithoutTruckInput[] | Prisma.StatusUpdateUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.StatusUpdateCreateOrConnectWithoutTruckInput | Prisma.StatusUpdateCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.StatusUpdateUpsertWithWhereUniqueWithoutTruckInput | Prisma.StatusUpdateUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.StatusUpdateCreateManyTruckInputEnvelope;
    set?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    disconnect?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    delete?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    connect?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    update?: Prisma.StatusUpdateUpdateWithWhereUniqueWithoutTruckInput | Prisma.StatusUpdateUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.StatusUpdateUpdateManyWithWhereWithoutTruckInput | Prisma.StatusUpdateUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.StatusUpdateScalarWhereInput | Prisma.StatusUpdateScalarWhereInput[];
};
export type StatusUpdateUncheckedUpdateManyWithoutTruckNestedInput = {
    create?: Prisma.XOR<Prisma.StatusUpdateCreateWithoutTruckInput, Prisma.StatusUpdateUncheckedCreateWithoutTruckInput> | Prisma.StatusUpdateCreateWithoutTruckInput[] | Prisma.StatusUpdateUncheckedCreateWithoutTruckInput[];
    connectOrCreate?: Prisma.StatusUpdateCreateOrConnectWithoutTruckInput | Prisma.StatusUpdateCreateOrConnectWithoutTruckInput[];
    upsert?: Prisma.StatusUpdateUpsertWithWhereUniqueWithoutTruckInput | Prisma.StatusUpdateUpsertWithWhereUniqueWithoutTruckInput[];
    createMany?: Prisma.StatusUpdateCreateManyTruckInputEnvelope;
    set?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    disconnect?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    delete?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    connect?: Prisma.StatusUpdateWhereUniqueInput | Prisma.StatusUpdateWhereUniqueInput[];
    update?: Prisma.StatusUpdateUpdateWithWhereUniqueWithoutTruckInput | Prisma.StatusUpdateUpdateWithWhereUniqueWithoutTruckInput[];
    updateMany?: Prisma.StatusUpdateUpdateManyWithWhereWithoutTruckInput | Prisma.StatusUpdateUpdateManyWithWhereWithoutTruckInput[];
    deleteMany?: Prisma.StatusUpdateScalarWhereInput | Prisma.StatusUpdateScalarWhereInput[];
};
export type EnumTruckStatusFieldUpdateOperationsInput = {
    set?: $Enums.TruckStatus;
};
export type EnumStatusSourceFieldUpdateOperationsInput = {
    set?: $Enums.StatusSource;
};
export type StatusUpdateCreateWithoutTruckInput = {
    id?: string;
    status: $Enums.TruckStatus;
    latitude?: number | null;
    longitude?: number | null;
    note?: string | null;
    reporterName?: string | null;
    reliability?: number | null;
    photoUrl?: string | null;
    createdAt?: Date | string;
    source?: $Enums.StatusSource;
};
export type StatusUpdateUncheckedCreateWithoutTruckInput = {
    id?: string;
    status: $Enums.TruckStatus;
    latitude?: number | null;
    longitude?: number | null;
    note?: string | null;
    reporterName?: string | null;
    reliability?: number | null;
    photoUrl?: string | null;
    createdAt?: Date | string;
    source?: $Enums.StatusSource;
};
export type StatusUpdateCreateOrConnectWithoutTruckInput = {
    where: Prisma.StatusUpdateWhereUniqueInput;
    create: Prisma.XOR<Prisma.StatusUpdateCreateWithoutTruckInput, Prisma.StatusUpdateUncheckedCreateWithoutTruckInput>;
};
export type StatusUpdateCreateManyTruckInputEnvelope = {
    data: Prisma.StatusUpdateCreateManyTruckInput | Prisma.StatusUpdateCreateManyTruckInput[];
    skipDuplicates?: boolean;
};
export type StatusUpdateUpsertWithWhereUniqueWithoutTruckInput = {
    where: Prisma.StatusUpdateWhereUniqueInput;
    update: Prisma.XOR<Prisma.StatusUpdateUpdateWithoutTruckInput, Prisma.StatusUpdateUncheckedUpdateWithoutTruckInput>;
    create: Prisma.XOR<Prisma.StatusUpdateCreateWithoutTruckInput, Prisma.StatusUpdateUncheckedCreateWithoutTruckInput>;
};
export type StatusUpdateUpdateWithWhereUniqueWithoutTruckInput = {
    where: Prisma.StatusUpdateWhereUniqueInput;
    data: Prisma.XOR<Prisma.StatusUpdateUpdateWithoutTruckInput, Prisma.StatusUpdateUncheckedUpdateWithoutTruckInput>;
};
export type StatusUpdateUpdateManyWithWhereWithoutTruckInput = {
    where: Prisma.StatusUpdateScalarWhereInput;
    data: Prisma.XOR<Prisma.StatusUpdateUpdateManyMutationInput, Prisma.StatusUpdateUncheckedUpdateManyWithoutTruckInput>;
};
export type StatusUpdateScalarWhereInput = {
    AND?: Prisma.StatusUpdateScalarWhereInput | Prisma.StatusUpdateScalarWhereInput[];
    OR?: Prisma.StatusUpdateScalarWhereInput[];
    NOT?: Prisma.StatusUpdateScalarWhereInput | Prisma.StatusUpdateScalarWhereInput[];
    id?: Prisma.StringFilter<"StatusUpdate"> | string;
    truckId?: Prisma.StringFilter<"StatusUpdate"> | string;
    status?: Prisma.EnumTruckStatusFilter<"StatusUpdate"> | $Enums.TruckStatus;
    latitude?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    note?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    reporterName?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    reliability?: Prisma.FloatNullableFilter<"StatusUpdate"> | number | null;
    photoUrl?: Prisma.StringNullableFilter<"StatusUpdate"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"StatusUpdate"> | Date | string;
    source?: Prisma.EnumStatusSourceFilter<"StatusUpdate"> | $Enums.StatusSource;
};
export type StatusUpdateCreateManyTruckInput = {
    id?: string;
    status: $Enums.TruckStatus;
    latitude?: number | null;
    longitude?: number | null;
    note?: string | null;
    reporterName?: string | null;
    reliability?: number | null;
    photoUrl?: string | null;
    createdAt?: Date | string;
    source?: $Enums.StatusSource;
};
export type StatusUpdateUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
};
export type StatusUpdateUncheckedUpdateWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
};
export type StatusUpdateUncheckedUpdateManyWithoutTruckInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumTruckStatusFieldUpdateOperationsInput | $Enums.TruckStatus;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    note?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reliability?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    source?: Prisma.EnumStatusSourceFieldUpdateOperationsInput | $Enums.StatusSource;
};
export type StatusUpdateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    truckId?: boolean;
    status?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    note?: boolean;
    reporterName?: boolean;
    reliability?: boolean;
    photoUrl?: boolean;
    createdAt?: boolean;
    source?: boolean;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statusUpdate"]>;
export type StatusUpdateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    truckId?: boolean;
    status?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    note?: boolean;
    reporterName?: boolean;
    reliability?: boolean;
    photoUrl?: boolean;
    createdAt?: boolean;
    source?: boolean;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statusUpdate"]>;
export type StatusUpdateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    truckId?: boolean;
    status?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    note?: boolean;
    reporterName?: boolean;
    reliability?: boolean;
    photoUrl?: boolean;
    createdAt?: boolean;
    source?: boolean;
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["statusUpdate"]>;
export type StatusUpdateSelectScalar = {
    id?: boolean;
    truckId?: boolean;
    status?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    note?: boolean;
    reporterName?: boolean;
    reliability?: boolean;
    photoUrl?: boolean;
    createdAt?: boolean;
    source?: boolean;
};
export type StatusUpdateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "truckId" | "status" | "latitude" | "longitude" | "note" | "reporterName" | "reliability" | "photoUrl" | "createdAt" | "source", ExtArgs["result"]["statusUpdate"]>;
export type StatusUpdateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
};
export type StatusUpdateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
};
export type StatusUpdateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    truck?: boolean | Prisma.FoodTruckDefaultArgs<ExtArgs>;
};
export type $StatusUpdatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "StatusUpdate";
    objects: {
        truck: Prisma.$FoodTruckPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        truckId: string;
        status: $Enums.TruckStatus;
        latitude: number | null;
        longitude: number | null;
        note: string | null;
        reporterName: string | null;
        reliability: number | null;
        photoUrl: string | null;
        createdAt: Date;
        source: $Enums.StatusSource;
    }, ExtArgs["result"]["statusUpdate"]>;
    composites: {};
};
export type StatusUpdateGetPayload<S extends boolean | null | undefined | StatusUpdateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload, S>;
export type StatusUpdateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<StatusUpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: StatusUpdateCountAggregateInputType | true;
};
export interface StatusUpdateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['StatusUpdate'];
        meta: {
            name: 'StatusUpdate';
        };
    };
    /**
     * Find zero or one StatusUpdate that matches the filter.
     * @param {StatusUpdateFindUniqueArgs} args - Arguments to find a StatusUpdate
     * @example
     * // Get one StatusUpdate
     * const statusUpdate = await prisma.statusUpdate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatusUpdateFindUniqueArgs>(args: Prisma.SelectSubset<T, StatusUpdateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one StatusUpdate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StatusUpdateFindUniqueOrThrowArgs} args - Arguments to find a StatusUpdate
     * @example
     * // Get one StatusUpdate
     * const statusUpdate = await prisma.statusUpdate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatusUpdateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, StatusUpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StatusUpdate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateFindFirstArgs} args - Arguments to find a StatusUpdate
     * @example
     * // Get one StatusUpdate
     * const statusUpdate = await prisma.statusUpdate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatusUpdateFindFirstArgs>(args?: Prisma.SelectSubset<T, StatusUpdateFindFirstArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first StatusUpdate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateFindFirstOrThrowArgs} args - Arguments to find a StatusUpdate
     * @example
     * // Get one StatusUpdate
     * const statusUpdate = await prisma.statusUpdate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatusUpdateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, StatusUpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more StatusUpdates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StatusUpdates
     * const statusUpdates = await prisma.statusUpdate.findMany()
     *
     * // Get first 10 StatusUpdates
     * const statusUpdates = await prisma.statusUpdate.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const statusUpdateWithIdOnly = await prisma.statusUpdate.findMany({ select: { id: true } })
     *
     */
    findMany<T extends StatusUpdateFindManyArgs>(args?: Prisma.SelectSubset<T, StatusUpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a StatusUpdate.
     * @param {StatusUpdateCreateArgs} args - Arguments to create a StatusUpdate.
     * @example
     * // Create one StatusUpdate
     * const StatusUpdate = await prisma.statusUpdate.create({
     *   data: {
     *     // ... data to create a StatusUpdate
     *   }
     * })
     *
     */
    create<T extends StatusUpdateCreateArgs>(args: Prisma.SelectSubset<T, StatusUpdateCreateArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many StatusUpdates.
     * @param {StatusUpdateCreateManyArgs} args - Arguments to create many StatusUpdates.
     * @example
     * // Create many StatusUpdates
     * const statusUpdate = await prisma.statusUpdate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends StatusUpdateCreateManyArgs>(args?: Prisma.SelectSubset<T, StatusUpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many StatusUpdates and returns the data saved in the database.
     * @param {StatusUpdateCreateManyAndReturnArgs} args - Arguments to create many StatusUpdates.
     * @example
     * // Create many StatusUpdates
     * const statusUpdate = await prisma.statusUpdate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many StatusUpdates and only return the `id`
     * const statusUpdateWithIdOnly = await prisma.statusUpdate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends StatusUpdateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, StatusUpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a StatusUpdate.
     * @param {StatusUpdateDeleteArgs} args - Arguments to delete one StatusUpdate.
     * @example
     * // Delete one StatusUpdate
     * const StatusUpdate = await prisma.statusUpdate.delete({
     *   where: {
     *     // ... filter to delete one StatusUpdate
     *   }
     * })
     *
     */
    delete<T extends StatusUpdateDeleteArgs>(args: Prisma.SelectSubset<T, StatusUpdateDeleteArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one StatusUpdate.
     * @param {StatusUpdateUpdateArgs} args - Arguments to update one StatusUpdate.
     * @example
     * // Update one StatusUpdate
     * const statusUpdate = await prisma.statusUpdate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends StatusUpdateUpdateArgs>(args: Prisma.SelectSubset<T, StatusUpdateUpdateArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more StatusUpdates.
     * @param {StatusUpdateDeleteManyArgs} args - Arguments to filter StatusUpdates to delete.
     * @example
     * // Delete a few StatusUpdates
     * const { count } = await prisma.statusUpdate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends StatusUpdateDeleteManyArgs>(args?: Prisma.SelectSubset<T, StatusUpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StatusUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StatusUpdates
     * const statusUpdate = await prisma.statusUpdate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends StatusUpdateUpdateManyArgs>(args: Prisma.SelectSubset<T, StatusUpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more StatusUpdates and returns the data updated in the database.
     * @param {StatusUpdateUpdateManyAndReturnArgs} args - Arguments to update many StatusUpdates.
     * @example
     * // Update many StatusUpdates
     * const statusUpdate = await prisma.statusUpdate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more StatusUpdates and only return the `id`
     * const statusUpdateWithIdOnly = await prisma.statusUpdate.updateManyAndReturn({
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
    updateManyAndReturn<T extends StatusUpdateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, StatusUpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one StatusUpdate.
     * @param {StatusUpdateUpsertArgs} args - Arguments to update or create a StatusUpdate.
     * @example
     * // Update or create a StatusUpdate
     * const statusUpdate = await prisma.statusUpdate.upsert({
     *   create: {
     *     // ... data to create a StatusUpdate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StatusUpdate we want to update
     *   }
     * })
     */
    upsert<T extends StatusUpdateUpsertArgs>(args: Prisma.SelectSubset<T, StatusUpdateUpsertArgs<ExtArgs>>): Prisma.Prisma__StatusUpdateClient<runtime.Types.Result.GetResult<Prisma.$StatusUpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of StatusUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateCountArgs} args - Arguments to filter StatusUpdates to count.
     * @example
     * // Count the number of StatusUpdates
     * const count = await prisma.statusUpdate.count({
     *   where: {
     *     // ... the filter for the StatusUpdates we want to count
     *   }
     * })
    **/
    count<T extends StatusUpdateCountArgs>(args?: Prisma.Subset<T, StatusUpdateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], StatusUpdateCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a StatusUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StatusUpdateAggregateArgs>(args: Prisma.Subset<T, StatusUpdateAggregateArgs>): Prisma.PrismaPromise<GetStatusUpdateAggregateType<T>>;
    /**
     * Group by StatusUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatusUpdateGroupByArgs} args - Group by arguments.
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
    groupBy<T extends StatusUpdateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: StatusUpdateGroupByArgs['orderBy'];
    } : {
        orderBy?: StatusUpdateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, StatusUpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatusUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the StatusUpdate model
     */
    readonly fields: StatusUpdateFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for StatusUpdate.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__StatusUpdateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the StatusUpdate model
 */
export interface StatusUpdateFieldRefs {
    readonly id: Prisma.FieldRef<"StatusUpdate", 'String'>;
    readonly truckId: Prisma.FieldRef<"StatusUpdate", 'String'>;
    readonly status: Prisma.FieldRef<"StatusUpdate", 'TruckStatus'>;
    readonly latitude: Prisma.FieldRef<"StatusUpdate", 'Float'>;
    readonly longitude: Prisma.FieldRef<"StatusUpdate", 'Float'>;
    readonly note: Prisma.FieldRef<"StatusUpdate", 'String'>;
    readonly reporterName: Prisma.FieldRef<"StatusUpdate", 'String'>;
    readonly reliability: Prisma.FieldRef<"StatusUpdate", 'Float'>;
    readonly photoUrl: Prisma.FieldRef<"StatusUpdate", 'String'>;
    readonly createdAt: Prisma.FieldRef<"StatusUpdate", 'DateTime'>;
    readonly source: Prisma.FieldRef<"StatusUpdate", 'StatusSource'>;
}
/**
 * StatusUpdate findUnique
 */
export type StatusUpdateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StatusUpdate to fetch.
     */
    where: Prisma.StatusUpdateWhereUniqueInput;
};
/**
 * StatusUpdate findUniqueOrThrow
 */
export type StatusUpdateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StatusUpdate to fetch.
     */
    where: Prisma.StatusUpdateWhereUniqueInput;
};
/**
 * StatusUpdate findFirst
 */
export type StatusUpdateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StatusUpdate to fetch.
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StatusUpdates to fetch.
     */
    orderBy?: Prisma.StatusUpdateOrderByWithRelationInput | Prisma.StatusUpdateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StatusUpdates.
     */
    cursor?: Prisma.StatusUpdateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StatusUpdates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StatusUpdates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StatusUpdates.
     */
    distinct?: Prisma.StatusUpdateScalarFieldEnum | Prisma.StatusUpdateScalarFieldEnum[];
};
/**
 * StatusUpdate findFirstOrThrow
 */
export type StatusUpdateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StatusUpdate to fetch.
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StatusUpdates to fetch.
     */
    orderBy?: Prisma.StatusUpdateOrderByWithRelationInput | Prisma.StatusUpdateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for StatusUpdates.
     */
    cursor?: Prisma.StatusUpdateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StatusUpdates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StatusUpdates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of StatusUpdates.
     */
    distinct?: Prisma.StatusUpdateScalarFieldEnum | Prisma.StatusUpdateScalarFieldEnum[];
};
/**
 * StatusUpdate findMany
 */
export type StatusUpdateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which StatusUpdates to fetch.
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of StatusUpdates to fetch.
     */
    orderBy?: Prisma.StatusUpdateOrderByWithRelationInput | Prisma.StatusUpdateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing StatusUpdates.
     */
    cursor?: Prisma.StatusUpdateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` StatusUpdates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` StatusUpdates.
     */
    skip?: number;
    distinct?: Prisma.StatusUpdateScalarFieldEnum | Prisma.StatusUpdateScalarFieldEnum[];
};
/**
 * StatusUpdate create
 */
export type StatusUpdateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a StatusUpdate.
     */
    data: Prisma.XOR<Prisma.StatusUpdateCreateInput, Prisma.StatusUpdateUncheckedCreateInput>;
};
/**
 * StatusUpdate createMany
 */
export type StatusUpdateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many StatusUpdates.
     */
    data: Prisma.StatusUpdateCreateManyInput | Prisma.StatusUpdateCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * StatusUpdate createManyAndReturn
 */
export type StatusUpdateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusUpdate
     */
    select?: Prisma.StatusUpdateSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StatusUpdate
     */
    omit?: Prisma.StatusUpdateOmit<ExtArgs> | null;
    /**
     * The data used to create many StatusUpdates.
     */
    data: Prisma.StatusUpdateCreateManyInput | Prisma.StatusUpdateCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatusUpdateIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * StatusUpdate update
 */
export type StatusUpdateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a StatusUpdate.
     */
    data: Prisma.XOR<Prisma.StatusUpdateUpdateInput, Prisma.StatusUpdateUncheckedUpdateInput>;
    /**
     * Choose, which StatusUpdate to update.
     */
    where: Prisma.StatusUpdateWhereUniqueInput;
};
/**
 * StatusUpdate updateMany
 */
export type StatusUpdateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update StatusUpdates.
     */
    data: Prisma.XOR<Prisma.StatusUpdateUpdateManyMutationInput, Prisma.StatusUpdateUncheckedUpdateManyInput>;
    /**
     * Filter which StatusUpdates to update
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * Limit how many StatusUpdates to update.
     */
    limit?: number;
};
/**
 * StatusUpdate updateManyAndReturn
 */
export type StatusUpdateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StatusUpdate
     */
    select?: Prisma.StatusUpdateSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the StatusUpdate
     */
    omit?: Prisma.StatusUpdateOmit<ExtArgs> | null;
    /**
     * The data used to update StatusUpdates.
     */
    data: Prisma.XOR<Prisma.StatusUpdateUpdateManyMutationInput, Prisma.StatusUpdateUncheckedUpdateManyInput>;
    /**
     * Filter which StatusUpdates to update
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * Limit how many StatusUpdates to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.StatusUpdateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * StatusUpdate upsert
 */
export type StatusUpdateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the StatusUpdate to update in case it exists.
     */
    where: Prisma.StatusUpdateWhereUniqueInput;
    /**
     * In case the StatusUpdate found by the `where` argument doesn't exist, create a new StatusUpdate with this data.
     */
    create: Prisma.XOR<Prisma.StatusUpdateCreateInput, Prisma.StatusUpdateUncheckedCreateInput>;
    /**
     * In case the StatusUpdate was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.StatusUpdateUpdateInput, Prisma.StatusUpdateUncheckedUpdateInput>;
};
/**
 * StatusUpdate delete
 */
export type StatusUpdateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which StatusUpdate to delete.
     */
    where: Prisma.StatusUpdateWhereUniqueInput;
};
/**
 * StatusUpdate deleteMany
 */
export type StatusUpdateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which StatusUpdates to delete
     */
    where?: Prisma.StatusUpdateWhereInput;
    /**
     * Limit how many StatusUpdates to delete.
     */
    limit?: number;
};
/**
 * StatusUpdate without action
 */
export type StatusUpdateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=StatusUpdate.d.ts.map