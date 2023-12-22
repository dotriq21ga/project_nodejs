import { Request, Response } from 'express';
import { IChangeRolePermission } from '../interface/permission/RequestPermission';
import PermissionRepository from '../repositories/PermissionRepository';
import { BaseResponse } from '../constants/Response';
import { CHANGE_PERMISSION_INTERNAL_SERVER_ERROR } from '../constants/Permission';
import { IPermissionResult } from '../interface/permission/ResponsePermission';

class PermissionService {

    private permission_repository = PermissionRepository;

    public changeRolePermission = async (req: Request, res: Response) => {
        const { id, grantedPermissions }: IChangeRolePermission = req.body;
        try {
            await this.permission_repository.updateAllPermission(id);
            await Promise.all(grantedPermissions.map(async grantedPermission => {
                const permission = await this.permission_repository.findNamePermission(grantedPermission, id);
                if (permission) {
                    return await this.permission_repository.updatePermission(grantedPermission, id);
                }
                return await this.permission_repository.createPermission(grantedPermission, id);
            }));
            const result: IPermissionResult = {
                id: id,
                grantedPermissions: grantedPermissions,
            }
            return res.status(200).json({
                ...BaseResponse,
                result: result
            });
        } catch (error) {
            return res.status(500).json(CHANGE_PERMISSION_INTERNAL_SERVER_ERROR);
        }
    }
}

export = new PermissionService();