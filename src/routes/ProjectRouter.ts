import { BaseRouter } from "./BaseRouter";
import { checkPermission } from "../middleware/permission";
import { PERMISSION } from "../constants/Permission";
import ProjectService from "../services/ProjectService";

class ProjectRouter extends BaseRouter {

    private _ProjectService = ProjectService;

    constructor() {
        super();
        this.init();
    }

    protected init() {
        this.router.post(
            "/GetAll",
            checkPermission(PERMISSION.Pages_Projects_ViewList),
            this._ProjectService.getAll
        );
        this.router.post(
            "/Create",
            checkPermission(PERMISSION.Pages_Projects_Add),
            this._ProjectService.createProject
        );
        this.router.put(
            "/Update",
            checkPermission(PERMISSION.Pages_Projects_Edit),
            this._ProjectService.editProject
        );
        this.router.delete(
            "/Delete",
            checkPermission(PERMISSION.Pages_Projects_Delete),
            this._ProjectService.deleteProject
        )
    }
}

export = new ProjectRouter().router;