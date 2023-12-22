import { BaseRepository } from "./BaseRepository";

import { Role } from "../models/Role";

class RoleRepository extends BaseRepository<Role> {

    constructor() {
        super(Role);
    }

    updateRole(field_update: object, id: number) {
        return this.update(field_update, {
            where: {
                id: id
            }
        });
    }
}

export = new RoleRepository();