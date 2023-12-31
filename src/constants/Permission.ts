import { ErrorResponse } from "./ErrorResponse";

export const PERMISSION = {
    TabAdmin: "Admin",
    Pages_Users: "Pages.Users",
    Pages_Users_ViewList: "Pages.Users.ViewList",
    Pages_Users_Create: "Pages.Users.Create",
    Pages_Users_Edit: "Pages.Users.Edit",
    Pages_Users_Delete: "Pages.Users.Delete",
    Pages_Roles: "Pages.Roles",
    Pages_Roles_Add: "Pages.Roles.Add",
    Pages_Roles_ViewList: "Pages.Roles.ViewList",
    Pages_Roles_Edit: "Pages.Roles.Edit",
    Pages_Roles_Delete: "Pages.Roles.Delete",
    Pages_Roles_ChangePermission: "Pages.Roles.ChangePermission",
    TabProjects: "Projects",
    Pages_Projects: "Pages.Projects",
    Pages_Projects_Add: "Pages.Projects.Add",
    Pages_Projects_ViewList: "Pages.Projects.ViewList",
    Pages_Projects_Edit: "Pages.Projects.Edit",
    Pages_Projects_Delete: "Pages.Projects.Delete",
}

export const CHANGE_PERMISSION_INTERNAL_SERVER_ERROR = ErrorResponse('Change Permission failed', 'Internal Server Error');