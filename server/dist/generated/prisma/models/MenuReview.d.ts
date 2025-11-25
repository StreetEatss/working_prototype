import type * as runtime from "@prisma/client/runtime/library";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model MenuReview
 *
 */
export type MenuReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$MenuReviewPayload>;
export type AggregateMenuReview = {
    _count: MenuReviewCountAggregateOutputType | null;
    _avg: MenuReviewAvgAggregateOutputType | null;
    _sum: MenuReviewSumAggregateOutputType | null;
    _min: MenuReviewMinAggregateOutputType | null;
    _max: MenuReviewMaxAggregateOutputType | null;
};
export type MenuReviewAvgAggregateOutputType = {
    rating: number | null;
    tasteRating: number | null;
    valueRating: number | null;
};
export type MenuReviewSumAggregateOutputType = {
    rating: number | null;
    tasteRating: number | null;
    valueRating: number | null;
};
export type MenuReviewMinAggregateOutputType = {
    id: string | null;
    menuItemId: string | null;
    rating: number | null;
    tasteRating: number | null;
    valueRating: number | null;
    comment: string | null;
    photoUrl: string | null;
    reporterName: string | null;
    createdAt: Date | null;
    locationSource: string | null;
};
export type MenuReviewMaxAggregateOutputType = {
    id: string | null;
    menuItemId: string | null;
    rating: number | null;
    tasteRating: number | null;
    valueRating: number | null;
    comment: string | null;
    photoUrl: string | null;
    reporterName: string | null;
    createdAt: Date | null;
    locationSource: string | null;
};
export type MenuReviewCountAggregateOutputType = {
    id: number;
    menuItemId: number;
    rating: number;
    tasteRating: number;
    valueRating: number;
    comment: number;
    photoUrl: number;
    reporterName: number;
    createdAt: number;
    locationSource: number;
    _all: number;
};
export type MenuReviewAvgAggregateInputType = {
    rating?: true;
    tasteRating?: true;
    valueRating?: true;
};
export type MenuReviewSumAggregateInputType = {
    rating?: true;
    tasteRating?: true;
    valueRating?: true;
};
export type MenuReviewMinAggregateInputType = {
    id?: true;
    menuItemId?: true;
    rating?: true;
    tasteRating?: true;
    valueRating?: true;
    comment?: true;
    photoUrl?: true;
    reporterName?: true;
    createdAt?: true;
    locationSource?: true;
};
export type MenuReviewMaxAggregateInputType = {
    id?: true;
    menuItemId?: true;
    rating?: true;
    tasteRating?: true;
    valueRating?: true;
    comment?: true;
    photoUrl?: true;
    reporterName?: true;
    createdAt?: true;
    locationSource?: true;
};
export type MenuReviewCountAggregateInputType = {
    id?: true;
    menuItemId?: true;
    rating?: true;
    tasteRating?: true;
    valueRating?: true;
    comment?: true;
    photoUrl?: true;
    reporterName?: true;
    createdAt?: true;
    locationSource?: true;
    _all?: true;
};
export type MenuReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MenuReview to aggregate.
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuReviews to fetch.
     */
    orderBy?: Prisma.MenuReviewOrderByWithRelationInput | Prisma.MenuReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.MenuReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuReviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuReviews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned MenuReviews
    **/
    _count?: true | MenuReviewCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: MenuReviewAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: MenuReviewSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: MenuReviewMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: MenuReviewMaxAggregateInputType;
};
export type GetMenuReviewAggregateType<T extends MenuReviewAggregateArgs> = {
    [P in keyof T & keyof AggregateMenuReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateMenuReview[P]> : Prisma.GetScalarType<T[P], AggregateMenuReview[P]>;
};
export type MenuReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuReviewWhereInput;
    orderBy?: Prisma.MenuReviewOrderByWithAggregationInput | Prisma.MenuReviewOrderByWithAggregationInput[];
    by: Prisma.MenuReviewScalarFieldEnum[] | Prisma.MenuReviewScalarFieldEnum;
    having?: Prisma.MenuReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: MenuReviewCountAggregateInputType | true;
    _avg?: MenuReviewAvgAggregateInputType;
    _sum?: MenuReviewSumAggregateInputType;
    _min?: MenuReviewMinAggregateInputType;
    _max?: MenuReviewMaxAggregateInputType;
};
export type MenuReviewGroupByOutputType = {
    id: string;
    menuItemId: string;
    rating: number;
    tasteRating: number | null;
    valueRating: number | null;
    comment: string | null;
    photoUrl: string | null;
    reporterName: string | null;
    createdAt: Date;
    locationSource: string | null;
    _count: MenuReviewCountAggregateOutputType | null;
    _avg: MenuReviewAvgAggregateOutputType | null;
    _sum: MenuReviewSumAggregateOutputType | null;
    _min: MenuReviewMinAggregateOutputType | null;
    _max: MenuReviewMaxAggregateOutputType | null;
};
type GetMenuReviewGroupByPayload<T extends MenuReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<MenuReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof MenuReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], MenuReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], MenuReviewGroupByOutputType[P]>;
}>>;
export type MenuReviewWhereInput = {
    AND?: Prisma.MenuReviewWhereInput | Prisma.MenuReviewWhereInput[];
    OR?: Prisma.MenuReviewWhereInput[];
    NOT?: Prisma.MenuReviewWhereInput | Prisma.MenuReviewWhereInput[];
    id?: Prisma.StringFilter<"MenuReview"> | string;
    menuItemId?: Prisma.StringFilter<"MenuReview"> | string;
    rating?: Prisma.IntFilter<"MenuReview"> | number;
    tasteRating?: Prisma.IntNullableFilter<"MenuReview"> | number | null;
    valueRating?: Prisma.IntNullableFilter<"MenuReview"> | number | null;
    comment?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    photoUrl?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    reporterName?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MenuReview"> | Date | string;
    locationSource?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    menuItem?: Prisma.XOR<Prisma.MenuItemScalarRelationFilter, Prisma.MenuItemWhereInput>;
};
export type MenuReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    valueRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    reporterName?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    locationSource?: Prisma.SortOrderInput | Prisma.SortOrder;
    menuItem?: Prisma.MenuItemOrderByWithRelationInput;
};
export type MenuReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.MenuReviewWhereInput | Prisma.MenuReviewWhereInput[];
    OR?: Prisma.MenuReviewWhereInput[];
    NOT?: Prisma.MenuReviewWhereInput | Prisma.MenuReviewWhereInput[];
    menuItemId?: Prisma.StringFilter<"MenuReview"> | string;
    rating?: Prisma.IntFilter<"MenuReview"> | number;
    tasteRating?: Prisma.IntNullableFilter<"MenuReview"> | number | null;
    valueRating?: Prisma.IntNullableFilter<"MenuReview"> | number | null;
    comment?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    photoUrl?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    reporterName?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MenuReview"> | Date | string;
    locationSource?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    menuItem?: Prisma.XOR<Prisma.MenuItemScalarRelationFilter, Prisma.MenuItemWhereInput>;
}, "id">;
export type MenuReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    valueRating?: Prisma.SortOrderInput | Prisma.SortOrder;
    comment?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    reporterName?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    locationSource?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.MenuReviewCountOrderByAggregateInput;
    _avg?: Prisma.MenuReviewAvgOrderByAggregateInput;
    _max?: Prisma.MenuReviewMaxOrderByAggregateInput;
    _min?: Prisma.MenuReviewMinOrderByAggregateInput;
    _sum?: Prisma.MenuReviewSumOrderByAggregateInput;
};
export type MenuReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.MenuReviewScalarWhereWithAggregatesInput | Prisma.MenuReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.MenuReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.MenuReviewScalarWhereWithAggregatesInput | Prisma.MenuReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"MenuReview"> | string;
    menuItemId?: Prisma.StringWithAggregatesFilter<"MenuReview"> | string;
    rating?: Prisma.IntWithAggregatesFilter<"MenuReview"> | number;
    tasteRating?: Prisma.IntNullableWithAggregatesFilter<"MenuReview"> | number | null;
    valueRating?: Prisma.IntNullableWithAggregatesFilter<"MenuReview"> | number | null;
    comment?: Prisma.StringNullableWithAggregatesFilter<"MenuReview"> | string | null;
    photoUrl?: Prisma.StringNullableWithAggregatesFilter<"MenuReview"> | string | null;
    reporterName?: Prisma.StringNullableWithAggregatesFilter<"MenuReview"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"MenuReview"> | Date | string;
    locationSource?: Prisma.StringNullableWithAggregatesFilter<"MenuReview"> | string | null;
};
export type MenuReviewCreateInput = {
    id?: string;
    rating: number;
    tasteRating?: number | null;
    valueRating?: number | null;
    comment?: string | null;
    photoUrl?: string | null;
    reporterName?: string | null;
    createdAt?: Date | string;
    locationSource?: string | null;
    menuItem: Prisma.MenuItemCreateNestedOneWithoutReviewsInput;
};
export type MenuReviewUncheckedCreateInput = {
    id?: string;
    menuItemId: string;
    rating: number;
    tasteRating?: number | null;
    valueRating?: number | null;
    comment?: string | null;
    photoUrl?: string | null;
    reporterName?: string | null;
    createdAt?: Date | string;
    locationSource?: string | null;
};
export type MenuReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    menuItem?: Prisma.MenuItemUpdateOneRequiredWithoutReviewsNestedInput;
};
export type MenuReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MenuReviewCreateManyInput = {
    id?: string;
    menuItemId: string;
    rating: number;
    tasteRating?: number | null;
    valueRating?: number | null;
    comment?: string | null;
    photoUrl?: string | null;
    reporterName?: string | null;
    createdAt?: Date | string;
    locationSource?: string | null;
};
export type MenuReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MenuReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    menuItemId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MenuReviewListRelationFilter = {
    every?: Prisma.MenuReviewWhereInput;
    some?: Prisma.MenuReviewWhereInput;
    none?: Prisma.MenuReviewWhereInput;
};
export type MenuReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type MenuReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrder;
    valueRating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    reporterName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    locationSource?: Prisma.SortOrder;
};
export type MenuReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrder;
    valueRating?: Prisma.SortOrder;
};
export type MenuReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrder;
    valueRating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    reporterName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    locationSource?: Prisma.SortOrder;
};
export type MenuReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    menuItemId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrder;
    valueRating?: Prisma.SortOrder;
    comment?: Prisma.SortOrder;
    photoUrl?: Prisma.SortOrder;
    reporterName?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    locationSource?: Prisma.SortOrder;
};
export type MenuReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    tasteRating?: Prisma.SortOrder;
    valueRating?: Prisma.SortOrder;
};
export type MenuReviewCreateNestedManyWithoutMenuItemInput = {
    create?: Prisma.XOR<Prisma.MenuReviewCreateWithoutMenuItemInput, Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput> | Prisma.MenuReviewCreateWithoutMenuItemInput[] | Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput | Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput[];
    createMany?: Prisma.MenuReviewCreateManyMenuItemInputEnvelope;
    connect?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
};
export type MenuReviewUncheckedCreateNestedManyWithoutMenuItemInput = {
    create?: Prisma.XOR<Prisma.MenuReviewCreateWithoutMenuItemInput, Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput> | Prisma.MenuReviewCreateWithoutMenuItemInput[] | Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput | Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput[];
    createMany?: Prisma.MenuReviewCreateManyMenuItemInputEnvelope;
    connect?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
};
export type MenuReviewUpdateManyWithoutMenuItemNestedInput = {
    create?: Prisma.XOR<Prisma.MenuReviewCreateWithoutMenuItemInput, Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput> | Prisma.MenuReviewCreateWithoutMenuItemInput[] | Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput | Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput[];
    upsert?: Prisma.MenuReviewUpsertWithWhereUniqueWithoutMenuItemInput | Prisma.MenuReviewUpsertWithWhereUniqueWithoutMenuItemInput[];
    createMany?: Prisma.MenuReviewCreateManyMenuItemInputEnvelope;
    set?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    disconnect?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    delete?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    connect?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    update?: Prisma.MenuReviewUpdateWithWhereUniqueWithoutMenuItemInput | Prisma.MenuReviewUpdateWithWhereUniqueWithoutMenuItemInput[];
    updateMany?: Prisma.MenuReviewUpdateManyWithWhereWithoutMenuItemInput | Prisma.MenuReviewUpdateManyWithWhereWithoutMenuItemInput[];
    deleteMany?: Prisma.MenuReviewScalarWhereInput | Prisma.MenuReviewScalarWhereInput[];
};
export type MenuReviewUncheckedUpdateManyWithoutMenuItemNestedInput = {
    create?: Prisma.XOR<Prisma.MenuReviewCreateWithoutMenuItemInput, Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput> | Prisma.MenuReviewCreateWithoutMenuItemInput[] | Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput[];
    connectOrCreate?: Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput | Prisma.MenuReviewCreateOrConnectWithoutMenuItemInput[];
    upsert?: Prisma.MenuReviewUpsertWithWhereUniqueWithoutMenuItemInput | Prisma.MenuReviewUpsertWithWhereUniqueWithoutMenuItemInput[];
    createMany?: Prisma.MenuReviewCreateManyMenuItemInputEnvelope;
    set?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    disconnect?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    delete?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    connect?: Prisma.MenuReviewWhereUniqueInput | Prisma.MenuReviewWhereUniqueInput[];
    update?: Prisma.MenuReviewUpdateWithWhereUniqueWithoutMenuItemInput | Prisma.MenuReviewUpdateWithWhereUniqueWithoutMenuItemInput[];
    updateMany?: Prisma.MenuReviewUpdateManyWithWhereWithoutMenuItemInput | Prisma.MenuReviewUpdateManyWithWhereWithoutMenuItemInput[];
    deleteMany?: Prisma.MenuReviewScalarWhereInput | Prisma.MenuReviewScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type MenuReviewCreateWithoutMenuItemInput = {
    id?: string;
    rating: number;
    tasteRating?: number | null;
    valueRating?: number | null;
    comment?: string | null;
    photoUrl?: string | null;
    reporterName?: string | null;
    createdAt?: Date | string;
    locationSource?: string | null;
};
export type MenuReviewUncheckedCreateWithoutMenuItemInput = {
    id?: string;
    rating: number;
    tasteRating?: number | null;
    valueRating?: number | null;
    comment?: string | null;
    photoUrl?: string | null;
    reporterName?: string | null;
    createdAt?: Date | string;
    locationSource?: string | null;
};
export type MenuReviewCreateOrConnectWithoutMenuItemInput = {
    where: Prisma.MenuReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.MenuReviewCreateWithoutMenuItemInput, Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput>;
};
export type MenuReviewCreateManyMenuItemInputEnvelope = {
    data: Prisma.MenuReviewCreateManyMenuItemInput | Prisma.MenuReviewCreateManyMenuItemInput[];
    skipDuplicates?: boolean;
};
export type MenuReviewUpsertWithWhereUniqueWithoutMenuItemInput = {
    where: Prisma.MenuReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.MenuReviewUpdateWithoutMenuItemInput, Prisma.MenuReviewUncheckedUpdateWithoutMenuItemInput>;
    create: Prisma.XOR<Prisma.MenuReviewCreateWithoutMenuItemInput, Prisma.MenuReviewUncheckedCreateWithoutMenuItemInput>;
};
export type MenuReviewUpdateWithWhereUniqueWithoutMenuItemInput = {
    where: Prisma.MenuReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.MenuReviewUpdateWithoutMenuItemInput, Prisma.MenuReviewUncheckedUpdateWithoutMenuItemInput>;
};
export type MenuReviewUpdateManyWithWhereWithoutMenuItemInput = {
    where: Prisma.MenuReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.MenuReviewUpdateManyMutationInput, Prisma.MenuReviewUncheckedUpdateManyWithoutMenuItemInput>;
};
export type MenuReviewScalarWhereInput = {
    AND?: Prisma.MenuReviewScalarWhereInput | Prisma.MenuReviewScalarWhereInput[];
    OR?: Prisma.MenuReviewScalarWhereInput[];
    NOT?: Prisma.MenuReviewScalarWhereInput | Prisma.MenuReviewScalarWhereInput[];
    id?: Prisma.StringFilter<"MenuReview"> | string;
    menuItemId?: Prisma.StringFilter<"MenuReview"> | string;
    rating?: Prisma.IntFilter<"MenuReview"> | number;
    tasteRating?: Prisma.IntNullableFilter<"MenuReview"> | number | null;
    valueRating?: Prisma.IntNullableFilter<"MenuReview"> | number | null;
    comment?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    photoUrl?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    reporterName?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"MenuReview"> | Date | string;
    locationSource?: Prisma.StringNullableFilter<"MenuReview"> | string | null;
};
export type MenuReviewCreateManyMenuItemInput = {
    id?: string;
    rating: number;
    tasteRating?: number | null;
    valueRating?: number | null;
    comment?: string | null;
    photoUrl?: string | null;
    reporterName?: string | null;
    createdAt?: Date | string;
    locationSource?: string | null;
};
export type MenuReviewUpdateWithoutMenuItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MenuReviewUncheckedUpdateWithoutMenuItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MenuReviewUncheckedUpdateManyWithoutMenuItemInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    tasteRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    valueRating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    comment?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reporterName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    locationSource?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type MenuReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    menuItemId?: boolean;
    rating?: boolean;
    tasteRating?: boolean;
    valueRating?: boolean;
    comment?: boolean;
    photoUrl?: boolean;
    reporterName?: boolean;
    createdAt?: boolean;
    locationSource?: boolean;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuReview"]>;
export type MenuReviewSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    menuItemId?: boolean;
    rating?: boolean;
    tasteRating?: boolean;
    valueRating?: boolean;
    comment?: boolean;
    photoUrl?: boolean;
    reporterName?: boolean;
    createdAt?: boolean;
    locationSource?: boolean;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuReview"]>;
export type MenuReviewSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    menuItemId?: boolean;
    rating?: boolean;
    tasteRating?: boolean;
    valueRating?: boolean;
    comment?: boolean;
    photoUrl?: boolean;
    reporterName?: boolean;
    createdAt?: boolean;
    locationSource?: boolean;
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["menuReview"]>;
export type MenuReviewSelectScalar = {
    id?: boolean;
    menuItemId?: boolean;
    rating?: boolean;
    tasteRating?: boolean;
    valueRating?: boolean;
    comment?: boolean;
    photoUrl?: boolean;
    reporterName?: boolean;
    createdAt?: boolean;
    locationSource?: boolean;
};
export type MenuReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "menuItemId" | "rating" | "tasteRating" | "valueRating" | "comment" | "photoUrl" | "reporterName" | "createdAt" | "locationSource", ExtArgs["result"]["menuReview"]>;
export type MenuReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
};
export type MenuReviewIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
};
export type MenuReviewIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    menuItem?: boolean | Prisma.MenuItemDefaultArgs<ExtArgs>;
};
export type $MenuReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "MenuReview";
    objects: {
        menuItem: Prisma.$MenuItemPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        menuItemId: string;
        rating: number;
        tasteRating: number | null;
        valueRating: number | null;
        comment: string | null;
        photoUrl: string | null;
        reporterName: string | null;
        createdAt: Date;
        locationSource: string | null;
    }, ExtArgs["result"]["menuReview"]>;
    composites: {};
};
export type MenuReviewGetPayload<S extends boolean | null | undefined | MenuReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload, S>;
export type MenuReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<MenuReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: MenuReviewCountAggregateInputType | true;
};
export interface MenuReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['MenuReview'];
        meta: {
            name: 'MenuReview';
        };
    };
    /**
     * Find zero or one MenuReview that matches the filter.
     * @param {MenuReviewFindUniqueArgs} args - Arguments to find a MenuReview
     * @example
     * // Get one MenuReview
     * const menuReview = await prisma.menuReview.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, MenuReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one MenuReview that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenuReviewFindUniqueOrThrowArgs} args - Arguments to find a MenuReview
     * @example
     * // Get one MenuReview
     * const menuReview = await prisma.menuReview.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, MenuReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MenuReview that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewFindFirstArgs} args - Arguments to find a MenuReview
     * @example
     * // Get one MenuReview
     * const menuReview = await prisma.menuReview.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, MenuReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first MenuReview that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewFindFirstOrThrowArgs} args - Arguments to find a MenuReview
     * @example
     * // Get one MenuReview
     * const menuReview = await prisma.menuReview.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, MenuReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more MenuReviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuReviews
     * const menuReviews = await prisma.menuReview.findMany()
     *
     * // Get first 10 MenuReviews
     * const menuReviews = await prisma.menuReview.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const menuReviewWithIdOnly = await prisma.menuReview.findMany({ select: { id: true } })
     *
     */
    findMany<T extends MenuReviewFindManyArgs>(args?: Prisma.SelectSubset<T, MenuReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a MenuReview.
     * @param {MenuReviewCreateArgs} args - Arguments to create a MenuReview.
     * @example
     * // Create one MenuReview
     * const MenuReview = await prisma.menuReview.create({
     *   data: {
     *     // ... data to create a MenuReview
     *   }
     * })
     *
     */
    create<T extends MenuReviewCreateArgs>(args: Prisma.SelectSubset<T, MenuReviewCreateArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many MenuReviews.
     * @param {MenuReviewCreateManyArgs} args - Arguments to create many MenuReviews.
     * @example
     * // Create many MenuReviews
     * const menuReview = await prisma.menuReview.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends MenuReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, MenuReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many MenuReviews and returns the data saved in the database.
     * @param {MenuReviewCreateManyAndReturnArgs} args - Arguments to create many MenuReviews.
     * @example
     * // Create many MenuReviews
     * const menuReview = await prisma.menuReview.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many MenuReviews and only return the `id`
     * const menuReviewWithIdOnly = await prisma.menuReview.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends MenuReviewCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, MenuReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a MenuReview.
     * @param {MenuReviewDeleteArgs} args - Arguments to delete one MenuReview.
     * @example
     * // Delete one MenuReview
     * const MenuReview = await prisma.menuReview.delete({
     *   where: {
     *     // ... filter to delete one MenuReview
     *   }
     * })
     *
     */
    delete<T extends MenuReviewDeleteArgs>(args: Prisma.SelectSubset<T, MenuReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one MenuReview.
     * @param {MenuReviewUpdateArgs} args - Arguments to update one MenuReview.
     * @example
     * // Update one MenuReview
     * const menuReview = await prisma.menuReview.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends MenuReviewUpdateArgs>(args: Prisma.SelectSubset<T, MenuReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more MenuReviews.
     * @param {MenuReviewDeleteManyArgs} args - Arguments to filter MenuReviews to delete.
     * @example
     * // Delete a few MenuReviews
     * const { count } = await prisma.menuReview.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends MenuReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, MenuReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MenuReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuReviews
     * const menuReview = await prisma.menuReview.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends MenuReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, MenuReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more MenuReviews and returns the data updated in the database.
     * @param {MenuReviewUpdateManyAndReturnArgs} args - Arguments to update many MenuReviews.
     * @example
     * // Update many MenuReviews
     * const menuReview = await prisma.menuReview.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more MenuReviews and only return the `id`
     * const menuReviewWithIdOnly = await prisma.menuReview.updateManyAndReturn({
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
    updateManyAndReturn<T extends MenuReviewUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, MenuReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one MenuReview.
     * @param {MenuReviewUpsertArgs} args - Arguments to update or create a MenuReview.
     * @example
     * // Update or create a MenuReview
     * const menuReview = await prisma.menuReview.upsert({
     *   create: {
     *     // ... data to create a MenuReview
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuReview we want to update
     *   }
     * })
     */
    upsert<T extends MenuReviewUpsertArgs>(args: Prisma.SelectSubset<T, MenuReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__MenuReviewClient<runtime.Types.Result.GetResult<Prisma.$MenuReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of MenuReviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewCountArgs} args - Arguments to filter MenuReviews to count.
     * @example
     * // Count the number of MenuReviews
     * const count = await prisma.menuReview.count({
     *   where: {
     *     // ... the filter for the MenuReviews we want to count
     *   }
     * })
    **/
    count<T extends MenuReviewCountArgs>(args?: Prisma.Subset<T, MenuReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], MenuReviewCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a MenuReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuReviewAggregateArgs>(args: Prisma.Subset<T, MenuReviewAggregateArgs>): Prisma.PrismaPromise<GetMenuReviewAggregateType<T>>;
    /**
     * Group by MenuReview.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuReviewGroupByArgs} args - Group by arguments.
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
    groupBy<T extends MenuReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: MenuReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: MenuReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, MenuReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the MenuReview model
     */
    readonly fields: MenuReviewFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for MenuReview.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__MenuReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    menuItem<T extends Prisma.MenuItemDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.MenuItemDefaultArgs<ExtArgs>>): Prisma.Prisma__MenuItemClient<runtime.Types.Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the MenuReview model
 */
export interface MenuReviewFieldRefs {
    readonly id: Prisma.FieldRef<"MenuReview", 'String'>;
    readonly menuItemId: Prisma.FieldRef<"MenuReview", 'String'>;
    readonly rating: Prisma.FieldRef<"MenuReview", 'Int'>;
    readonly tasteRating: Prisma.FieldRef<"MenuReview", 'Int'>;
    readonly valueRating: Prisma.FieldRef<"MenuReview", 'Int'>;
    readonly comment: Prisma.FieldRef<"MenuReview", 'String'>;
    readonly photoUrl: Prisma.FieldRef<"MenuReview", 'String'>;
    readonly reporterName: Prisma.FieldRef<"MenuReview", 'String'>;
    readonly createdAt: Prisma.FieldRef<"MenuReview", 'DateTime'>;
    readonly locationSource: Prisma.FieldRef<"MenuReview", 'String'>;
}
/**
 * MenuReview findUnique
 */
export type MenuReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * Filter, which MenuReview to fetch.
     */
    where: Prisma.MenuReviewWhereUniqueInput;
};
/**
 * MenuReview findUniqueOrThrow
 */
export type MenuReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * Filter, which MenuReview to fetch.
     */
    where: Prisma.MenuReviewWhereUniqueInput;
};
/**
 * MenuReview findFirst
 */
export type MenuReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * Filter, which MenuReview to fetch.
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuReviews to fetch.
     */
    orderBy?: Prisma.MenuReviewOrderByWithRelationInput | Prisma.MenuReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MenuReviews.
     */
    cursor?: Prisma.MenuReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuReviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuReviews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuReviews.
     */
    distinct?: Prisma.MenuReviewScalarFieldEnum | Prisma.MenuReviewScalarFieldEnum[];
};
/**
 * MenuReview findFirstOrThrow
 */
export type MenuReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * Filter, which MenuReview to fetch.
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuReviews to fetch.
     */
    orderBy?: Prisma.MenuReviewOrderByWithRelationInput | Prisma.MenuReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for MenuReviews.
     */
    cursor?: Prisma.MenuReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuReviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuReviews.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of MenuReviews.
     */
    distinct?: Prisma.MenuReviewScalarFieldEnum | Prisma.MenuReviewScalarFieldEnum[];
};
/**
 * MenuReview findMany
 */
export type MenuReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * Filter, which MenuReviews to fetch.
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of MenuReviews to fetch.
     */
    orderBy?: Prisma.MenuReviewOrderByWithRelationInput | Prisma.MenuReviewOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing MenuReviews.
     */
    cursor?: Prisma.MenuReviewWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` MenuReviews from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` MenuReviews.
     */
    skip?: number;
    distinct?: Prisma.MenuReviewScalarFieldEnum | Prisma.MenuReviewScalarFieldEnum[];
};
/**
 * MenuReview create
 */
export type MenuReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * The data needed to create a MenuReview.
     */
    data: Prisma.XOR<Prisma.MenuReviewCreateInput, Prisma.MenuReviewUncheckedCreateInput>;
};
/**
 * MenuReview createMany
 */
export type MenuReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuReviews.
     */
    data: Prisma.MenuReviewCreateManyInput | Prisma.MenuReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * MenuReview createManyAndReturn
 */
export type MenuReviewCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * The data used to create many MenuReviews.
     */
    data: Prisma.MenuReviewCreateManyInput | Prisma.MenuReviewCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * MenuReview update
 */
export type MenuReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * The data needed to update a MenuReview.
     */
    data: Prisma.XOR<Prisma.MenuReviewUpdateInput, Prisma.MenuReviewUncheckedUpdateInput>;
    /**
     * Choose, which MenuReview to update.
     */
    where: Prisma.MenuReviewWhereUniqueInput;
};
/**
 * MenuReview updateMany
 */
export type MenuReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuReviews.
     */
    data: Prisma.XOR<Prisma.MenuReviewUpdateManyMutationInput, Prisma.MenuReviewUncheckedUpdateManyInput>;
    /**
     * Filter which MenuReviews to update
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * Limit how many MenuReviews to update.
     */
    limit?: number;
};
/**
 * MenuReview updateManyAndReturn
 */
export type MenuReviewUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * The data used to update MenuReviews.
     */
    data: Prisma.XOR<Prisma.MenuReviewUpdateManyMutationInput, Prisma.MenuReviewUncheckedUpdateManyInput>;
    /**
     * Filter which MenuReviews to update
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * Limit how many MenuReviews to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * MenuReview upsert
 */
export type MenuReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * The filter to search for the MenuReview to update in case it exists.
     */
    where: Prisma.MenuReviewWhereUniqueInput;
    /**
     * In case the MenuReview found by the `where` argument doesn't exist, create a new MenuReview with this data.
     */
    create: Prisma.XOR<Prisma.MenuReviewCreateInput, Prisma.MenuReviewUncheckedCreateInput>;
    /**
     * In case the MenuReview was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.MenuReviewUpdateInput, Prisma.MenuReviewUncheckedUpdateInput>;
};
/**
 * MenuReview delete
 */
export type MenuReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
    /**
     * Filter which MenuReview to delete.
     */
    where: Prisma.MenuReviewWhereUniqueInput;
};
/**
 * MenuReview deleteMany
 */
export type MenuReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which MenuReviews to delete
     */
    where?: Prisma.MenuReviewWhereInput;
    /**
     * Limit how many MenuReviews to delete.
     */
    limit?: number;
};
/**
 * MenuReview without action
 */
export type MenuReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuReview
     */
    select?: Prisma.MenuReviewSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuReview
     */
    omit?: Prisma.MenuReviewOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuReviewInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=MenuReview.d.ts.map