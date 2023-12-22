import { BaseRepository } from "./BaseRepository";
import { UserProject } from "../models/UserProject";

class UserProjectRepository extends BaseRepository<UserProject> {

    constructor() {
        super(UserProject);
    }

    createUserProject(projectId: number, userId: number, type: number) {
        return this.create({ projectId: projectId, userId: userId, type: type });
    }
}

export = new UserProjectRepository();