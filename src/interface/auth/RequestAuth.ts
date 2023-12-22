export interface ILogin {
    userNameOrEmailAddress: string,
    password: string,
    rememberClient: boolean
}

export interface IUpdateUser {
    id: number;
    userName: string;
    emailAddress: string;
}