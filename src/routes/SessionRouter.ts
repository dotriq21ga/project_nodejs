import { BaseRouter } from "./BaseRouter";
import AuthService from "../services/AuthService";

class SessionRouter extends BaseRouter {
    private _AuthService = AuthService;
    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.router.get(
            "/GetCurrentLoginInformations",
            this._AuthService.userInfor
        );
    }
}

export = new SessionRouter().router;