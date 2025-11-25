export declare const OwnerRole: {
    readonly OWNER: "OWNER";
    readonly MANAGER: "MANAGER";
};
export type OwnerRole = (typeof OwnerRole)[keyof typeof OwnerRole];
export declare const TruckStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
    readonly MOVED: "MOVED";
    readonly UNKNOWN: "UNKNOWN";
};
export type TruckStatus = (typeof TruckStatus)[keyof typeof TruckStatus];
export declare const StatusSource: {
    readonly CROWD: "CROWD";
    readonly OWNER: "OWNER";
    readonly ADMIN: "ADMIN";
    readonly AUTOMATION: "AUTOMATION";
};
export type StatusSource = (typeof StatusSource)[keyof typeof StatusSource];
//# sourceMappingURL=enums.d.ts.map