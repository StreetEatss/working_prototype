import type { Request, Response, NextFunction } from "express";
type AuthUser = {
    id: string;
    email: string;
    name?: string;
};
export interface AuthenticatedRequest extends Request {
    user?: AuthUser | null;
}
export declare const requireAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=auth.d.ts.map