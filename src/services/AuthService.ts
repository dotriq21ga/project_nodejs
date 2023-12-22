import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from '../constants/ErrorResponse';
import UserRepository from '../repositories/UserRepository';
import { checkString, comparePassword, hashPassword } from '../helpers/utils.Helpers';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { AUTH_INTERNAL_SERVER_ERROR, DELETE_INTERNAL_SERVER_ERROR, DELETE_SUCCES, EXISTED_USER, LOGIN_FAILED, NOT_DELETE_MYSEFT, NOT_EXISTED_USER_DELETE, NOT_EXISTED_USER_UPDATE, TOKEN_EXPIRE, TOKEN_INFOR_RESULT, USER_INFOR_RESULT } from '../constants/Auth';
import { BaseResponse } from '../constants/Response';
import { ILogin, IUpdateUser } from '../interface/auth/RequestAuth';
import { User } from '../models/User';
import { IFilter } from '../interface/RequestFilter';
import { FilterResult } from '../interface/ResponseFilter';
import { IUserInfor } from '../interface/auth/ResponseAuth';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

class AuthService {

    private _repository = UserRepository;

    public logIn = async (req: Request, res: Response) => {
        const reqLogin: ILogin = req.body;
        try {
            const user: User = await this._repository.findOneUserNameOrEmailAddress(reqLogin.userNameOrEmailAddress);
            if (!user) return res.status(404).json(LOGIN_FAILED);
            const isPasswordValid = await comparePassword(reqLogin.password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json(LOGIN_FAILED);
            }
            const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRE });
            return res.status(200).json({
                ...BaseResponse,
                result: {
                    ...TOKEN_INFOR_RESULT,
                    accessToken,
                    userId: user.id,
                },
            });
        } catch (error: any) {
            return res.status(500).json(AUTH_INTERNAL_SERVER_ERROR);
        }
    };

    public userInfor = async (req: Request, res: Response) => {
        try {
            const user: IUserInfor = await this._repository.findUserInfor((req as any).userId as number);
            return res.status(200).json({
                ...BaseResponse,
                result: {
                    ...USER_INFOR_RESULT,
                    user,
                },
            });
        } catch (error) {
            return res.status(500).json(INTERNAL_SERVER_ERROR);
        }
    }

    public getAllPagging = async (req: Request, res: Response) => {
        try {
            const reqFilter: IFilter = req.body;
            const user: IUserInfor[] = await this._repository.findUserPagging(reqFilter);
            const result: FilterResult<IUserInfor> = {
                item: user,
                totalCount: user.length
            }
            return res.status(200).json({
                ...BaseResponse,
                result: result
            });
        } catch (error) {
            return res.status(500).json(INTERNAL_SERVER_ERROR);
        }
    }

    public createUser = async (req: Request, res: Response) => {
        const reqCreateUser: User = req.body;
        const hashedPassword = await hashPassword(checkString(reqCreateUser.password));
        reqCreateUser.password = hashedPassword;
        try {
            const duplicateUser = await this._repository.findUserDuplicate(reqCreateUser.userName, reqCreateUser.emailAddress);
            if (duplicateUser) {
                return res.status(400).json(EXISTED_USER);
            }
            const userCreate: User = await this._repository.createUser(reqCreateUser);
            const user: IUserInfor = await this._repository.findUserInfor(userCreate.id);
            return res.status(200).json({
                ...BaseResponse,
                result: user
            });
        } catch (error) {
            return res.status(500).json(INTERNAL_SERVER_ERROR);
        }
    }

    public editUser = async (req: Request, res: Response) => {
        const { id, ...field_update }: IUpdateUser = req.body;
        try {
            const user: IUserInfor = await this._repository.findUserInfor(id);
            if (!user) {
                return res.status(404).json(NOT_EXISTED_USER_UPDATE);
            }
            await this._repository.updateUser(field_update, id);
            const newUser: IUserInfor = await this._repository.findUserInfor(id);
            return res.status(200).json({
                ...BaseResponse,
                result: newUser,
            });
        } catch (error) {
            return res.status(500).json(INTERNAL_SERVER_ERROR);
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.body;
        if ((req as any).userId == id) {
            return res.status(404).json(NOT_DELETE_MYSEFT);
        }

        try {
            const user: IUserInfor = await this._repository.findUserInfor(id);
            if (!user) {
                return res.status(404).json(NOT_EXISTED_USER_DELETE);
            }
            const deletedUser = await this._repository.deleteUser(id);
            if (deletedUser) {
                return res.status(200).json(DELETE_SUCCES);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json(DELETE_INTERNAL_SERVER_ERROR);
        }
    }
}

export = new AuthService();