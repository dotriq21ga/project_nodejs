import { ErrorResponse } from "./ErrorResponse";
import { SuccesResponse } from "./NotiResponse";

export const PROJECT_MUST_HAVE_A_MENBER = ErrorResponse('Project must have at least one member!');
export const PROJECT_MUST_HAVE_A_PM = ErrorResponse('Project must have a PM!');
export const CREATE_PROJECT_INTERNAL_SERVER_ERROR = ErrorResponse('Create project failed', 'Internal Server Error');
export const PROJECT_EXISTS = ErrorResponse('Project already exists');
export const NOT_PROJECT_EXISTS = ErrorResponse('Project not already exists');
export const DELETE_PROJECT_INTERNAL_SERVER_ERROR = ErrorResponse('Delete project failed', 'Internal Server Error');
export const DELETE_SUCCES = SuccesResponse('Delete succesfully');
export const NOT_EXISTED_USER = ErrorResponse('Create project failed','Not existed user');