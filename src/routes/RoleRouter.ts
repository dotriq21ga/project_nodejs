import { BaseRouter } from "./BaseRouter";
import PermissionService from "../services/PermissionService";
import { checkPermission } from "../middleware/permission";
import { PERMISSION } from "../constants/Permission";

class RoleRouter extends BaseRouter {
    private _PermissionService = PermissionService;

    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.router.put(
            "/ChangeRolePermission",
            checkPermission(PERMISSION.Pages_Roles_ChangePermission),
            this._PermissionService.changeRolePermission
        );
    }
}

export = new RoleRouter().router;