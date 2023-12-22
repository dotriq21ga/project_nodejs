import { BaseRepository } from "./BaseRepository";
import { User } from '../config/database';
import { IFilter } from "../interface/RequestFilter";
import { Op } from "sequelize";
import { filtering, sorting } from "../helpers/utils.Helpers";

class UserRepository extends BaseRepository<User> {

    constructor() {
        super(User);
    }

    findOneUserNameOrEmailAddress(userNameOrEmailAddress: string) {
        return this.findOne({
            where: {
                [Op.or]: [
                    {
                        userName: userNameOrEmailAddress
                    },
                    {
                        emailAddress: userNameOrEmailAddress
                    }
                ]
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    findUserDuplicate(userName: string, emailAddress: string) {
        return this.findOne({
            where: {
                [Op.or]: [
                    {
                        userName: userName
                    },
                    {
                        emailAddress: emailAddress
                    }
                ]
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    }

    findUserInfor(id: number) {
        return this.findOne({ where: { id: id }, attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'roleId', 'id'] } });
    }

    findUser(id: number) {
        return this.findOne({ where: { id: id }, attributes: { exclude: ['createdAt', 'updatedAt', 'password'] } });
    }

    findUserPagging(reqFilter: IFilter) {
        const order = sorting(reqFilter.sort , reqFilter.sortDirection);
        return this.filter({
            where: {
                [Op.and]: [
                    {
                        [Op.or]: [
                            {
                                userName: {
                                    [Op.like]: `%${reqFilter?.searchText}%`
                                }
                            },
                            {
                                emailAddress: {
                                    [Op.like]: `%${reqFilter?.searchText}%`
                                }
                            }
                        ]
                    },
                    filtering(reqFilter.filterItems)
                ]
            } as any,
            offset: reqFilter.skipCount,
            limit: reqFilter?.maxResultCount,
            order: order,
            attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'roleId', 'id'] } 
        });
    }

    createUser(user: User) {
        return this.create(user);
    }

    updateUser(updateFeild: Object, id: number) {
        return this.update(updateFeild, {
            where: {
                id: id
            }
        });
    }

    deleteUser(id: number) {
        return this.delete({
            where: {
                id: id
            }
        });
    }
}

export = new UserRepository();