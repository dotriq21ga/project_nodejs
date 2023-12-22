import { Table, Column, Model, DataType, HasMany, Unique } from 'sequelize-typescript';
import { Project } from './Project';

@Table({
    timestamps: true,
    tableName: "Customer",
})

export class Customer extends Model {

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Column({ type: DataType.STRING, allowNull: true })
    public address!: string;

    @HasMany(() => Project)
    projects!: Project[];
    
}