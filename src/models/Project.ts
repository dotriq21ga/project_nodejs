import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany, Unique } from 'sequelize-typescript';
import { PROJECT_TYPE_ENUM } from '../enum';
import { Customer } from './Customer';
import { User } from './User';
import { UserProject } from './UserProject';

@Table({
    timestamps: true,
    tableName: "Project",
})

export class Project extends Model {

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    public name!: string;

    @Unique
    @Column({ type: DataType.STRING, allowNull: false })
    public code!: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    public status!: number;

    @Column({ type: DataType.DATE, allowNull: true })
    public timeStart!: Date;

    @Column({ type: DataType.DATE, allowNull: true })
    public timeEnd!: Date;

    @Column({ type: DataType.STRING, defaultValue: '' })
    public note!: string;

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: PROJECT_TYPE_ENUM.TM })
    public projectType!: PROJECT_TYPE_ENUM;

    @ForeignKey(() => Customer)
    @Column({ type: DataType.INTEGER, allowNull: false })
    public customerId!: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    public isAllUserBelongTo!: boolean;

    @BelongsTo(() => Customer)
    public customerName!: string;

    @BelongsToMany(() => User, () => UserProject)
    public pms!:string[];
    
}