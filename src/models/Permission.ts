import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './Role';

@Table({
    timestamps: true,
    tableName: "Permission",
})

export class Permission extends Model {

    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    public isGranted!: boolean;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    public roleId!: number;

    @BelongsTo(() => Role)
    public role!: Role;

}