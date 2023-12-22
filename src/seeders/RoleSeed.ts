import { ROLES_SEED } from "../constants/Role";
import { Role } from "../models/Role";

export const seedRole = async () => {
    const roleCount = await Role.count();
    if (roleCount > 0) {
        console.log('The "Role" table has data.');
    } else {
        await Role.bulkCreate(ROLES_SEED);
        console.log('The "Role" table is empty.');
    }
}