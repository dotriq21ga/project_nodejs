import { BaseRouter } from "./BaseRouter";
import AuthService from "../services/AuthService";

class TokenAuthRouter extends BaseRouter {
    private _AuthService = AuthService;
    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.router.post(
            "/Authenticate",
            this._AuthService.logIn
        );
    }
}

export = new TokenAuthRouter().router;
