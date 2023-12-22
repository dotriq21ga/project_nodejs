import { ErrorResponse } from "./ErrorResponse";

export const ROLES_SEED = [
    {
        id: 1,
        name: 'Admin',
        displayName: 'Administrator',
        description: 'Administrator',
        normalizedName: 'ADMIN',
    },
    {
        id: 2,
        name: 'Basic_user',
        displayName: 'Basic_User',
        description: 'Basic_User',
        normalizedName: 'BASIC_USER',
    },
];

export const AUTHOR_ERR = ErrorResponse('Current user did not have permissions to access this feature!');
export const EXISTED_ROLE = ErrorResponse('Role is already taken.');