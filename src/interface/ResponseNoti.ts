import { IBaseResponse } from "./Response";

export interface IBaseResSucces extends IBaseResponse {
    result: {
        message: string | null;
    };
}