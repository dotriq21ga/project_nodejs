import { BaseRouter } from "./BaseRouter";
import AuthService from "../services/AuthService";
import { PERMISSION } from "../constants/Permission";
import { checkPermission } from "../middleware/permission";

class UserRouter extends BaseRouter {
    private _AuthService = AuthService;
    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.router.post(
            "/GetAllPagging",
            checkPermission(PERMISSION.Pages_Users_ViewList),
            this._AuthService.getAllPagging
        );
        this.router.post(
            "/Create",
            checkPermission(PERMISSION.Pages_Users_Create),
            this._AuthService.createUser
        );
        this.router.put(
            "/Update",
            checkPermission(PERMISSION.Pages_Users_Edit),
            this._AuthService.editUser
        );
        this.router.delete(
            "/Delete",
            checkPermission(PERMISSION.Pages_Users_Delete),
            this._AuthService.deleteUser
        )
    }
}

export = new UserRouter().router;