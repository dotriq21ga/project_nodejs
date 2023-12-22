import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, IsEmail, Unique } from 'sequelize-typescript';
import { Role } from './Role';
import { Project } from './Project';
import { UserProject } from './UserProject';

@Table({
    timestamps: true,
    tableName: "User",
})

export class User extends Model {

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    public userName!: string;

    @Column({ type: DataType.STRING, allowNull: false })
    public password!: string;

    @Unique
    @IsEmail
    @Column({ type: DataType.STRING, allowNull: false })
    public emailAddress!: string;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER, allowNull: false })
    public roleId!: number;

    @BelongsTo(() => Role)
    public role!: Role;

    @BelongsToMany(() => Project, () => UserProject)
    public projects!: Project[];
    
}