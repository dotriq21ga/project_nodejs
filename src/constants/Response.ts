import { IBaseResponse } from "../interface/Response";

export const BaseResponse: IBaseResponse = {
    result: null,
    success: true,
    error: null,
    unAuthorizedRequest: false,
    targetUrl: null,
    __abp: true
}