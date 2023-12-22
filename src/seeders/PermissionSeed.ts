import { PERMISSION } from "../constants/Permission"
import { Permission } from "../models/Permission";

export const seedPermission = async () => {
    const permissions = Object.values(PERMISSION);
    permissions.forEach(async (permission) => {
        return await Permission.create({
            name: permission,
            roleId: 1,
        })
    })
}