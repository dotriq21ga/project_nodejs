import { BaseRepository } from "./BaseRepository";
import { Permission } from '../config/database';

class PermissionsRepository extends BaseRepository<Permission> {

    constructor() {
        super(Permission);
    }

    findPermission(rermissionsName: string, roleId: number) {
        return this.findOne({
            where: {
                roleId: roleId,
                name: rermissionsName,
                isGranted: true
            }
        });
    }

    updateAllPermission(id: number) {
        return this.update(
            { isGranted: false },
            { where: { roleId: id } }
        );
    }

    updatePermission(permissionsName: string, roleId: number) {
        return this.update(
            { isGranted: true },
            { where: { roleId: roleId, name: permissionsName } }
        );
    }

    findNamePermission(permissionsName: string, roleId: number) {
        return this.findOne({
            where: {
                roleId: roleId,
                name: permissionsName,
            }
        });
    }

    createPermission(permissionsName: string, roleId: number) {
        return this.create({
            name: permissionsName,
            roleId: roleId,
        })
    }
    
}

export = new PermissionsRepository();