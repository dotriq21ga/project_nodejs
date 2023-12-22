import { Table, Column, Model, DataType, HasMany, Unique } from 'sequelize-typescript';
import { User } from './User';
import { Permission } from './Permission';

@Table({
    timestamps: true,
    tableName: "Role",
})

export class Role extends Model {

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public displayName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public description!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public normalizedName!: string;

    @HasMany(() => User)
    public users!: User[];

    @HasMany(() => Permission)
    public permissions!: Permission[];
    
}