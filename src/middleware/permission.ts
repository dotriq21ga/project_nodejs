import { Response, NextFunction, Request } from 'express';
import UserRepository from '../repositories/UserRepository';
import PermissionRepository from '../repositories/PermissionRepository';
import { AUTHOR_ERR } from '../constants/Role';
import { INTERNAL_SERVER_ERROR } from '../constants/ErrorResponse';
import { IUser } from '../interface/auth/ResponseAuth';

export const checkPermission = (requiredPermission: string) => {
    const _repository = UserRepository;
    const _Permission_repository = PermissionRepository;
    return async (req: Request, res: Response, next: NextFunction) => {
        const user: IUser = await _repository.findUser((req as any).userId as number);
        try {
            const permission = await _Permission_repository.findPermission(requiredPermission, user.roleId);
            if (!permission) {
                return res.status(403).json(AUTHOR_ERR);
            }
            next();
        } catch (error) {
            return res.status(500).json(INTERNAL_SERVER_ERROR);
        }
    };
};