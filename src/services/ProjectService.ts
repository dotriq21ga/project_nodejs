import { Request, Response } from 'express';
import ProjectRepository from "../repositories/ProjectRepository";
import { IReqCreateProject } from '../interface/project/RequestProject';
import { CREATE_PROJECT_INTERNAL_SERVER_ERROR, DELETE_PROJECT_INTERNAL_SERVER_ERROR, DELETE_SUCCES, NOT_EXISTED_USER, NOT_PROJECT_EXISTS, PROJECT_EXISTS, PROJECT_MUST_HAVE_A_MENBER, PROJECT_MUST_HAVE_A_PM } from '../constants/Project';
import { Project } from '../models/Project';
import UserProjectRepository from '../repositories/UserProjectRepository';
import { BaseResponse } from '../constants/Response';
import { ICreateProjectResult, IProjectResult } from '../interface/project/ResponseProject';
import { INTERNAL_SERVER_ERROR } from '../constants/ErrorResponse';
import UserRepository from '../repositories/UserRepository';
import { IUser } from '../interface/auth/ResponseAuth';

class ProjectService {

    private _repository = ProjectRepository;
    private _user_project_repository = UserProjectRepository;
    private _user_repository = UserRepository;

    public getAll = async (req: Request, res: Response) => {
        try {
            const projects = await this._repository.findAllProject();
            const result: IProjectResult[] = projects.map(project => {
                const pmsNames = project.pms.map(pm => pm['userName' as any]);
                return {
                    ...project.dataValues,
                    pms: pmsNames,
                    customerName: project.customerName['name' as any]
                };
            });
            return res.status(200).json({
                ...BaseResponse,
                result: result
            });
        } catch (error) {
            return res.status(500).json(INTERNAL_SERVER_ERROR);
        }
    }

    public createProject = async (req: Request, res: Response) => {
        const { users, ...createReqProject }: IReqCreateProject = req.body;
        if (!users) {
            return res.status(200).json(PROJECT_MUST_HAVE_A_MENBER);
        }
        let userType: boolean = false;
        let isHaveUser: boolean = true;
        await Promise.all(users.map(async user => {
            if (user.type) {
                userType = true;
            }
            const checkUser: IUser = await this._user_repository.findUser(user.userId);
            if (!checkUser) {
                isHaveUser = false;
            }
        }));
        if (!userType) {
            return res.status(404).json(PROJECT_MUST_HAVE_A_PM);
        }
        if (!isHaveUser) {
            return res.status(404).json(NOT_EXISTED_USER);
        }
        try {
            const duplicate_project = await this._repository.findOneProjectName(createReqProject.name);
            if (duplicate_project) {
                return res.status(404).json(PROJECT_EXISTS);
            }
            const project: Project = await this._repository.createProject(createReqProject);
            await Promise.all(users.map(async user => {
                await this._user_project_repository.createUserProject(project.id, user.userId, user.type);
            }));
            const result: ICreateProjectResult = {
                users,
                ...createReqProject
            }
            return res.status(200).json({
                ...BaseResponse,
                result: result,
            });
        } catch (error) {
            return res.status(500).json(CREATE_PROJECT_INTERNAL_SERVER_ERROR);
        }
    }

    public editProject = async (req: Request, res: Response) => { }

    public deleteProject = async (req: Request, res: Response) => {
        const { id } = req.body;
        try {
            const project = await this._repository.findOneProject(id);
            if (!project) {
                return res.status(404).json(NOT_PROJECT_EXISTS);
            }
            await this._repository.deleteProject(id);
            return res.status(200).json(DELETE_SUCCES);
        } catch (error) {
            return res.status(500).json(DELETE_PROJECT_INTERNAL_SERVER_ERROR);
        }
    }
}

export = new ProjectService();