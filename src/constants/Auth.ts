import { IAuthResult, IUserInforResult } from '../interface/auth/ResponseAuth';
import { APP } from './App';
import { ErrorResponse } from './ErrorResponse';
import { SuccesResponse } from './NotiResponse';

export const TOKEN_EXPIRE = 8640000;

export const TOKEN_INFOR_RESULT: IAuthResult = {
   accessToken: null,
   encryptedAccessToken: '',
   expireInSeconds: TOKEN_EXPIRE,
   userId: null,
};

export const USER_INFOR_RESULT: IUserInforResult = {
   application: APP,
   user: null,
   tenant: null,
}

export const ADMIN = [{
   id: 1,
   userName: 'admin',
   password: '$2b$10$oWRHtDn07vyoiNFK5NwnP.P1nQcfGDWv14NZgsoWhAvD9Ktw3SwWS',
   emailAddress: 'tri.dotrong@ncc.asia',
   roleId: 1
}]

export const AUTHEN_ERR = ErrorResponse('Current user did not login to the application!');
export const INVALID_TOKEN = ErrorResponse('Your request is not valid!', 'Invalid token');
export const AUTH_INTERNAL_SERVER_ERROR = ErrorResponse('Login failed!', 'Internal Server Error');
export const LOGIN_FAILED = ErrorResponse('Login failed!', 'Invalid user name or password');
export const EXISTED_USER = ErrorResponse('userName or emailAddres is already taken.');
export const NOT_EXISTED_USER_UPDATE = ErrorResponse('Update user failed', 'Not existed user');
export const NOT_DELETE_MYSEFT = ErrorResponse('Update user failed', 'Can not delete myself');
export const NOT_EXISTED_USER_DELETE = ErrorResponse('Delete user failed', 'Not existed user');
export const DELETE_INTERNAL_SERVER_ERROR = ErrorResponse('Delete failed!', 'Internal Server Error');
export const DELETE_SUCCES = SuccesResponse('Delete successfully');
