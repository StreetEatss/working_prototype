import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth";
export declare const listTrucks: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getTruckById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createTruck: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addStatusUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const addMenuReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateTruckHours: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=truckController.d.ts.map