import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { Project } from './Project';
import { User } from './User';

@Table({
    timestamps: true,
    tableName: "UserProject",
})

export class UserProject extends Model {

    @ForeignKey(() => Project)
    @Column({ type: DataType.INTEGER, allowNull: false })
    public projectId!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    public userId!: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    public type!: number;

}