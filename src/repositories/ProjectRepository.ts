import { BaseRepository } from "./BaseRepository";
import { Project } from "../models/Project";
import { UserProject } from "../models/UserProject";
import { User } from "../models/User";
import { Customer } from "../models/Customer";
import { Sequelize } from "sequelize-typescript";

class ProjectRepository extends BaseRepository<Project> {

    constructor() {
        super(Project);
    }

    findAllProject() {
        return this.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ['userName'],
                        through: {
                            model: UserProject,
                            attributes: [],
                            where: {
                                type: 1,
                            }
                        }
                    },
                    {
                        model: Customer,
                        attributes: ['name'],
                    }
                ],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }
        )
    }

    createProject(data: any) {
        return this.create(data);
    }

    findOneProjectName(name: string) {
        return this.findOne({
            where: {
                name: name
            }
        })
    }

    findOneProject(id: number) {
        return this.findOne({
            where: {
                id: id
            }
        })
    }

    deleteProject(id: number) {
        return this.delete({
            where: {
                id: id
            }
        })
    }

}

export = new ProjectRepository();