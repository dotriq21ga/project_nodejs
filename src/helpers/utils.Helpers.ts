import bcrypt from 'bcrypt';
import { IFilterItem } from '../interface/RequestFilter';
import { Op } from 'sequelize';

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error;
    }
}

export async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export function checkString(value?: string): string {
    return value ? value : "";
}

export function checkArray(value: Array<any>): Array<any> {
    return value === undefined ? [] : value;
}

export function nullToEmpty(value?: number): number {
    return value ?? 0
}

export function sorting(sort?: string, sortDirection?: number): any {
    const sortOrder: string = sortDirection == 0 ? 'ASC' : 'DESC';
    const order = sort ? [[sort, sortOrder]] : [];
    return order;
}

export function filtering(filterItems: IFilterItem[]): any {
    const filters: { [key: string]: any } = {};
    filterItems.forEach((item: IFilterItem) => {
        const { propertyName, value, comparison } = item;
        switch (comparison) {
            case 0: // Equals
                filters[propertyName] = value;
                break;
            case 1: // Greater than
                filters[propertyName] = { [Op.gt]: value };
                break;
            case 2: // Less than
                filters[propertyName] = { [Op.lt]: value };
                break
        }
    });
    return filters;
}