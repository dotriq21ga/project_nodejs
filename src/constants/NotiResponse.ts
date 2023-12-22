import { IBaseResSucces } from '../interface/ResponseNoti';
import { BaseResponse } from './Response';

export const SuccesResponse = (message: string | null = null, details?: any): IBaseResSucces => {
    return {
        ...BaseResponse,
        result: {
            message,
        },
    };
};