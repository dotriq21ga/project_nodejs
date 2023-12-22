export interface IReqCreateProject {
    projectType: number;
    customerId: number;
    name: string;
    code: string;
    status: number;
    timeStart: string;
    timeEnd: string;
    note: string;
    isAllUserBelongTo: boolean;
    users: IReqUserProject[];
}

export interface IReqUserProject {
    userId: number;
    type: number;
}