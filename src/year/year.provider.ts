import { Year } from '../../db/entitys/year';
export const YearProvider = {
    provide: 'YearRepository',
    useValue: Year,
};
