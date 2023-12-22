import { Customer } from "../models/Customer";
import { CUSTOMER_SEED } from "../constants/Customer";

export const seedCustomer = async () => {
    const CustomerCount = await Customer.count();
    if (CustomerCount > 0) {
        console.log('The "Customer" table has data.');
    } else {
        await Customer.bulkCreate(CUSTOMER_SEED);
        console.log('The "Customer" table is empty.');
    }
}