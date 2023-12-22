import { ADMIN } from "../constants/Auth";
import { User } from "../models/User";

export const seedUser = async () => {
    const UserCount = await User.count();
    if (UserCount > 0) {
        console.log('The "User" table has data.');
    } else {
        await User.bulkCreate(ADMIN);
        console.log('The "User" table is empty.');
    }
}