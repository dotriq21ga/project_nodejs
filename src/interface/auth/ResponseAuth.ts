import { IAppResult } from "../app/ResponseApp";

export interface IAuthResult {
    accessToken: string | null;
    encryptedAccessToken: string | null;
    expireInSeconds: Number;
    userId: Number | null;
}

export interface IUserInforResult {
    application: IAppResult;
    user: IUserInfor | null;
    tenant: null;
}

export interface IUserInfor {
    emailAddress: string;
    userName: string;
}

export interface IUser {
    id: number;
    roleId: number;
    emailAddress: string;
    userName: string;
}