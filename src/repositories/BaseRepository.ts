import { ModelCtor, Model } from 'sequelize-typescript';

export class BaseRepository<T extends Model>{
    protected _db: ModelCtor<T>;

    constructor(model: ModelCtor<T>) {
        this._db = model;
    }

    async filter(filterQuery: any): Promise<T[]> {
        return await this._db.findAll(filterQuery);
    }

    async findAll(condition: any) {
        return await this._db.findAll(condition);
    }

    async findOne(field: any): Promise<T | any> {
        return await this._db.findOne(field);
    }

    async update(updateFeild: Object, condition: any) {
        return await this._db.update(updateFeild, condition);
    }

    async create(models: any): Promise<T> {
        return await this._db.create(models);
    }

    async delete(condition: object): Promise<any> {
        return await this._db.destroy(condition);
    }
}