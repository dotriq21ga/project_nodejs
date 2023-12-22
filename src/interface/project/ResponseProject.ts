export interface ICreateProjectResult {
    projectType: number;
    customerId: number;
    name: string;
    code: string;
    status: number;
    timeStart: string;
    timeEnd: string;
    note: string;
    isAllUserBelongTo: boolean;
    users: IUserProjectResult[];
}

export interface IUserProjectResult {
    userId: number;
    type: number;
}

export interface IProjectResult {
    projectType: number;
    customerName: string;
    name: string;
    code: string;
    status: number;
    timeStart: Date;
    timeEnd: Date;
    note: string;
    isAllUserBelongTo: boolean;
    pms: string[];
}