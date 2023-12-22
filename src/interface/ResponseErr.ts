import { IBaseResponse } from "./Response";

export interface IBaseResError extends IBaseResponse {
    error: {
        code: number;
        message: string | null;
        details: string | null;
        validationErrors: any;
    };
}