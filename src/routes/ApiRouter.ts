import { BaseRouter } from "./BaseRouter";
import bodyParser = require("body-parser");
import cors from 'cors';
import SessionRouter = require("./SessionRouter");
import TokenAuthRouter = require("./TokenAuthRouter");
import { authen } from "../middleware/auth";
import UserRouter = require("./UserRouter");
import RoleRouter = require("./RoleRouter");
import ProjectRouter = require("./ProjectRouter");

class ApiRouter extends BaseRouter {

    constructor() {
        super();
        this.configure();
        this.init();
    }

    private configure() {
        this.router.use(cors());
        this.router.use(bodyParser.json());
        this.router.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
    }

    protected init() {
        this.router.use("/TokenAuth", TokenAuthRouter);
        this.router.use("/services/app/Session", authen, SessionRouter);
        this.router.use("/services/app/User", authen, UserRouter);
        this.router.use("/services/app/Role", authen, RoleRouter);
        this.router.use("/services/app/Project", authen, ProjectRouter);
    }
}

export = new ApiRouter().router;