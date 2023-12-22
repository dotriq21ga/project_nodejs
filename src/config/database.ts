import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { UserProject } from "../models/UserProject";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { Permission } from "../models/Permission";
import { Project } from "../models/Project";
import { Customer } from "../models/Customer";
import { seedRole } from "../seeders/RoleSeed";
import { seedUser } from "../seeders/UserSeed";
import { seedPermission } from "../seeders/PermissionSeed";
import { seedCustomer } from "../seeders/Customer";

dotenv.config();

const DATABASE_TABLE_NAME = process.env.DATABASE_TABLE_NAME;
const DATABASE_USER_NAME = process.env.DATABASE_USER_NAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'postgres',
    username: DATABASE_USER_NAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_TABLE_NAME,
});

sequelize.addModels([Customer, Project, Permission, Role, User, UserProject]);

async function connect() {
    try {
        await sequelize.authenticate();
        // await sequelize.drop();
        // await sequelize.sync({
        //     alter: true,
        // })
        // await seedRole();
        // await seedUser();
        // await seedPermission();
        // await seedCustomer();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize };
export default connect;
export { Customer, Project, Permission, Role, User, UserProject };